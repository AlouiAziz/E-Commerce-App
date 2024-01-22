import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import './productsList.css'; // Import your CSS file
import useProducts from './useProducts';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addToCart } from '../../redux/cartSlice'
import { toast } from 'react-toastify';
import { Form, Button } from 'react-bootstrap';
import Navbar from '../../components/Navbar/Navbar';
import axios from 'axios';



const ProductsList = () => {

    const {
        getAllProducts,
        getOneProduct,
        isLoading,
        products,
        error,
    } = useProducts();

    const { list } = useSelector(state => state.cart)

    const user = useSelector(state => state.auth.user)


    const [filter, setFilter] = useState('')

    // State for pagination
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 4;

    // Calculate the index of the first and last items to display on the current page
    const indexOfLastProduct = (currentPage + 1) * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = products.filter(product => product.nom.toLowerCase().includes(filter.toLowerCase().trim())).slice(indexOfFirstProduct, indexOfLastProduct);

    // Function to handle page change
    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    const navigate = useNavigate();

    const dispatch = useDispatch()

    const handleAddToCart = (product) => {
        if (product.stock > 0) {
            dispatch(addToCart({
                ...product,
                quantity: 1
            }))
            toast.success("Product added Successfully")
        }
        else { toast.error("Stock en Rupture") }

    }


    const [comments, setComments] = useState({});

    const handleCommentReset = () => {
        setComments('');
    };

    const handleCommentChange = (event, productId) => {
        const { value } = event.target;
        setComments((prevComments) => ({
            ...prevComments,
            [productId]: value,
        }));
    };

    const handleCommentSubmit = async (event, product_id, user_id) => {
        event.preventDefault();
        const data = { commentaire: comments[product_id], user_id: user_id, product_id: product_id }
        try {
            await axios.post('http://localhost:4000/commentaire/addCommentaire', data)
            setComments('');
        } catch (error) {
            console.log('Error sending comment', error)
        }
    }

    return (
        <div>
            <Navbar />
            <main>
                <div class="classeHautDroite">
                    <Form
                        className="d-flex"
                        style={{ marginRight: 20 }}
                    >
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            onChange={(e) => { setFilter(e.target.value) }}
                            style={{ width: 200 }}
                        />
                        <Button type="submit" variant="outline-success">
                            Search
                        </Button>
                    </Form>
                    <ul class="list-group list-group-horizontal" >
                        <li className="list-group-item" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/Cart')}>
                            <img src='https://cdn-icons-png.flaticon.com/512/126/126083.png' height={24} width={24} style={{ marginRight: '8px' }} />
                            <p>{list?.length}</p>
                        </li>
                    </ul>
                </div>
                <div className="container-fluid bg-trasparent my-4 p-3" style={{ position: "relative", top: 60 }}>
                    <div className="row row-cols-1 row-cols-xs-2 row-cols-sm-2 row-cols-lg-4 g-3">
                        {currentProducts.map((product) => (
                            <div className="col" key={product._id} >
                                <div className="card h-100 shadow-sm">
                                    <img src={product.image} className="card-img-top" alt="..." onClick={() => { const id = product._id; navigate(`/ProductsList/${id}`) }} />
                                    <div className="label-top shadow-sm">{product.stock}</div>
                                    <div className="card-body">
                                        <div className="clearfix mb-3" onClick={() => { const id = product._id; navigate(`/ProductsList/${id}`) }}>
                                            <span className="float-start badge rounded-pill bg-primary">
                                                {product.nom}
                                            </span>
                                            <span className="float-start badge rounded-pill bg-success float-end" onClick={() => { const id = product._id; navigate(`/ProductsList/${id}`) }}>
                                                {product.prix} DT
                                            </span>
                                        </div>
                                        <h5 className="card-title" onClick={() => { const id = product._id; navigate(`/ProductsList/${id}`) }}>{product.description}</h5>

                                        <form onSubmit={(event) => handleCommentSubmit(event, product._id, user._id)}>
                                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                                <textarea className='comment'
                                                    id={`comment-${product._id}`}
                                                    name="comment"
                                                    placeholder='add Comment'
                                                    value={comments[product._id] || ''}
                                                    onChange={(event) => handleCommentChange(event, product._id)}
                                                />
                                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginLeft: 10 }}>
                                                    <Button variant='danger' type='reset' onClick={handleCommentReset}>Cancel</Button>
                                                    <Button variant='success' style={{ marginTop: 10 }} type='submit'>Send</Button>
                                                </div>
                                            </div>
                                        </form>

                                        <div className="text-center my-4">
                                            <a href="#" className="btn btn-warning" onClick={() => { handleAddToCart(product) }}>
                                                ADD TO CART
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div style={{ marginTop: 30, marginBottom: 30 }}>
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel="➡️" // Custom arrow for next
                            previousLabel="⬅️" // Custom arrow for previous
                            onPageChange={handlePageChange}
                            pageRangeDisplayed={5}
                            pageCount={Math.ceil(products.length / itemsPerPage)}
                            containerClassName="pagination justify-content-center" // Center the pagination
                            activeClassName="active"
                            pageClassName="page-item"
                            previousClassName="page-item"
                            nextClassName="page-item"
                            pageLinkClassName="page-link"
                            previousLinkClassName="page-link"
                            nextLinkClassName="page-link"
                        />
                    </div>
                </div>
            </main>
        </div>
    )
}
export default ProductsList
