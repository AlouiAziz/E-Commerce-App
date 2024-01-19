import React, { useEffect, useState } from 'react'
import '../../UserViewPages/Cart/Cart.css'
import { useDispatch, useSelector } from "react-redux"
import { removeItem, updateQuantity } from '../../redux/cartSlice'
import { Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


const CartItem = ({ data }) => {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const user = useSelector(state => state.auth.user)

    const cart = useSelector(state => state.cart)
    const list = cart.list

    const [quantity, setQuantity] = useState(data?.quantity)
    const [totalPrice, setTotalPrice] = useState(+data?.prix * +data?.quantity)

    // const handleChange = (e) => {
    //     const value = parseInt(e.target.value) > 0 ? parseInt(e.target.value) : 1
    //     setQuantity(value)
    // }
    {/* <input className="d-block" type="number" id='quan' value={quantity} onChange={handleChange} /> */ }

    const handleRemove = () => {
        dispatch(removeItem({ _id: data?._id }))
    }

    function calculerTotalProduits(tab) {
        // Vérifier si le tableau de produits est vide
        if (tab.length === 0) {
            return 0;
        }

        // Utiliser la fonction map pour calculer le total de chaque produit
        const totauxProduits = tab.map(product => product.prix * product.quantity);

        // Utiliser la fonction reduce pour additionner tous les totaux
        const total = totauxProduits.reduce((acc, curr) => acc + curr, 0);

        return total;
    }

    useEffect(() => {
        setTotalPrice(data?.prix * quantity)
        calculerTotalProduits(list)
        dispatch(updateQuantity({ _id: data?._id, quantity }))
    }, [quantity, data?.prix, data?._id, dispatch])


    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mt-3 p-2 items rounded" key={data.id}>
                <div className="d-flex flex-row">
                    <img className="rounded" src={data.image} width={40} />
                    <div className="ml-2" style={{ width: '170px' }}>
                        <span className="font-weight-bold d-block">{data.nom}</span>
                        <span className="spec">{data.description}</span>
                    </div>
                </div>


                <div className="d-flex align-items-center justify-content-center">

                    <button type="button" className="btn btn-danger btn-circle" onClick={() => { if (quantity > 1) { setQuantity(pre => pre - 1) } }}>- </button>
                    <h3 style={{ marginLeft: 20 }}>{quantity}</h3>
                    <button style={{ marginLeft: 20 }} type="button" className="btn btn-success btn-circle" onClick={() => setQuantity(pre => pre + 1)}>+</button>

                </div>

                <span className="d-block ml-5 font-weight-bold" style={{ fontWeight: 'bold' }}>{data?.prix} DT</span>


                <div className="d-flex flex-row align-items-center">


                    <h2 className="d-block ml-5 font-weight-bold">{totalPrice} DT</h2>


                </div>

                <a variant="danger" style={{ cursor: 'pointer' }} onClick={handleRemove}><img height={30} width={30} src='https://cdn-icons-png.flaticon.com/512/6861/6861362.png' /></a>

            </div>


            <div style={{ position: 'absolute', marginLeft: '45%', marginTop: 30 }}>
                <h1>{list[list.length - 1]?._id == data?._id && `${calculerTotalProduits(list)} DT`}</h1>
            </div>


            <div style={{ position: 'absolute', marginLeft: '30%', marginTop: 100, paddingBottom: 50 }}>
                {
                    list[list.length - 1]?._id == data?._id &&

                    <>
                        <Button variant="danger" onClick={async () => {
                            const products = list.map((product) => ({
                                product_id: product._id,
                                quantite: product.quantity,
                                prixUnitaire: product.prix,
                            }));
                            const commandeCanceled = { "user_id": user?._id, "products": products, "prixTotale": calculerTotalProduits(list), "etat": "Canceled" }
                            try {
                                const response = await axios.post('http://localhost:4000/commande/addCommande', commandeCanceled);
                            } catch (error) {
                                console.error('Erreur lors de la création de la commande', error);
                            }
                            // setList([])
                            toast.error('Commande Canceled')
                            navigate('/ProductsList')

                        }}>Ignore Commande</Button>

                        <Button variant='success' style={{ marginLeft: 20 }} onClick={async () => {
                            const products = list.map((product) => ({
                                product_id: product._id,
                                quantite: product.quantity,
                                prixUnitaire: product.prix,
                            }));
                            const commandeDone = { "user_id": user?._id, "products": products, "prixTotale": calculerTotalProduits(list), "etat": "Done" }
                            try {
                                const response = await axios.post('http://localhost:4000/commande/addCommande', commandeDone);
                            } catch (error) {
                                console.error('Erreur lors de la création de la commande', error);
                            }
                            toast.success('Passer au Paiement')
                            navigate('/Paiement')


                        }}>Passer Commande</Button>
                    </>
                }
            </div>

        </div>
    )
}

export default CartItem










