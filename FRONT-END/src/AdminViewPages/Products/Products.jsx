// Ce code est à optimiser pour mettre chaque modal dans un fichier.jsx

import React from 'react'
import './Products.css'
import useProducts from './useProducts'
import { Modal } from 'react-bootstrap'
import { Button } from 'react-bootstrap';
import { useState } from 'react'
import myPhoto from '../../Assests/images/photo carte étudiant.jpg'
import { useLocation, useNavigate } from 'react-router-dom';



const Products = () => {

    const { getAllProducts, getOneProduct, deleteProduct, isLoading, productSelected, products, error, handleClose, handleShow, show, newProduct, setNewProduct, addProduct, updateProduct } = useProducts()

    // Modal Add Product :

    const [showAdd, setShowAdd] = useState(false);
    const handleCloseAdd = () => showAdd && setShowAdd(false)
    const handleShowAdd = () => !showAdd && setShowAdd(true);

    // Modal Update Product :

    const [showUp, setShowUp] = useState(false);
    const handleCloseUp = () => showUp && setShowUp(false)
    const handleShowUp = () => !showUp && setShowUp(true);

    const [productUpdated, setProductUpdated] = useState({ nom: "", description: "", categorie: "658c66922b3a6f1c54058fbf", prix: "", stock: "", image: "" })

    const navigate = useNavigate()
    const location = useLocation();
    const currentPathname = location.pathname;

    const [filter, setFilter] = useState('')

    return (
        <div>

            {/* modal for get one Product */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>View Product</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ margin: "5px" }}>
                        <h6>{productSelected?.nom}</h6>
                    </div>
                    <br />
                    <div style={{ margin: "5px" }}>
                        <h6>{productSelected?.categorie}</h6>
                    </div>
                    <br />
                    <div style={{ margin: "5px" }}>
                        {/* Display image using an <img> tag */}
                        <img src={productSelected?.image} alt="Product Image" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                    </div>
                    <br />
                    <div style={{ margin: "5px" }}>
                        <h6>{productSelected?.description}</h6>
                    </div>
                    <br />
                    <div style={{ margin: "5px" }}>
                        <h6>{productSelected?.prix}</h6>
                    </div>
                    <br />
                    <div style={{ margin: "5px" }}>
                        <h6>{productSelected?.stock}</h6>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>


            {/* modal for Adding Product */}
            <Modal show={showAdd} onHide={handleCloseAdd}>
                <Modal.Header closeButton>
                    <Modal.Title>ADD NEW PRODUCT</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ margin: "5px" }}>
                        <h6 style={{ width: "150px" }}> Nom  :  </h6>
                        <input style={{ width: "250px" }} type="text" onChange={(e) => setNewProduct({ ...newProduct, nom: e.target.value })} />
                    </div>
                    <br />
                    <div style={{ margin: "5px" }}>
                        <h6 style={{ width: "150px" }}> Description :  </h6>
                        <input type="text" style={{ width: "250px" }} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} />
                    </div>
                    {/* <div style={{ margin: "5px" }}>
                        <h6> Categorie :  </h6>
                        <input type="text" onChange={(e) => setNewProduct({ ...newProduct, categorie: e.target.value })} />
                    </div> */}
                    <div style={{ margin: "5px" }}>
                        <h6 style={{ width: "150px" }}> Prix :  </h6>
                        <input type="text" style={{ width: "250px" }} onChange={(e) => setNewProduct({ ...newProduct, prix: e.target.value })} />
                    </div>
                    <div style={{ margin: "5px" }}>
                        <h6 style={{ width: "150px" }}> Stock :  </h6>
                        <input type="number" style={{ width: "250px" }} min={0} onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })} />
                    </div>
                    <div style={{ margin: "5px" }}>
                        <h6 style={{ width: "150px" }}> image (Link) :  </h6>
                        <input type="text" style={{ width: "250px" }} onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAdd}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => { addProduct(); handleCloseAdd() }}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>


            {/* modal for Update Product */}
            <Modal show={showUp} onHide={handleCloseUp}>
                <Modal.Header closeButton>
                    <Modal.Title>UPDATE PRODUCT</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ margin: "5px" }}>
                        <h6 style={{ width: "150px" }}> Nom  :  </h6>
                        <input style={{ width: "250px" }} type="text" name="nom" value={productUpdated.nom} onChange={(e) => setProductUpdated({ ...productUpdated, nom: e.target.value })} />
                    </div>
                    <br />
                    <div style={{ margin: "5px" }}>
                        <h6 style={{ width: "150px" }}> Description :  </h6>
                        <input type="text" style={{ width: "250px" }} name="description" value={productUpdated.description} onChange={(e) => setProductUpdated({ ...productUpdated, description: e.target.value })} />
                    </div>
                    <div style={{ margin: "5px" }}>
                        <h6 style={{ width: "150px" }}> Prix :  </h6>
                        <input type="text" style={{ width: "250px" }} name="prix" value={productUpdated.prix} onChange={(e) => setProductUpdated({ ...productUpdated, prix: e.target.value })} />
                    </div>
                    <div style={{ margin: "5px" }}>
                        <h6 style={{ width: "150px" }}> Stock :  </h6>
                        <input type="number" style={{ width: "250px" }} name="stock" value={productUpdated.stock} min={0} onChange={(e) => setProductUpdated({ ...productUpdated, stock: e.target.value })} />
                    </div>
                    <div style={{ margin: "5px" }}>
                        <h6 style={{ width: "150px" }}> image (Link) :  </h6>
                        <input type="text" style={{ width: "250px" }} name="image" value={productUpdated.image} onChange={(e) => setProductUpdated({ ...productUpdated, image: e.target.value })} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseUp}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => { updateProduct(productUpdated._id, productUpdated); handleCloseUp() }}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>





            <div className="app-container">
                <div className="sidebar">
                    <div className="sidebar-header">
                    </div>
                    <ul className="sidebar-list">
                        <li className={`sidebar-list-item ${currentPathname === '/AdminView/Users' ? "active" : ""}`}>
                            <a style={{ cursor: "pointer" }} onClick={() => navigate('/AdminView/Users')}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={18}
                                    height={18}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-home"
                                >
                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                    <polyline points="9 22 9 12 15 12 15 22" />
                                </svg>
                                <span>Users</span>
                            </a>
                        </li>
                        <li className={`sidebar-list-item ${currentPathname === '/AdminView/Products' ? "active" : ""}`}>
                            <a style={{ cursor: "pointer" }} onClick={() => navigate('/AdminView/Products')}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={18}
                                    height={18}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-shopping-bag"
                                >
                                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                                    <line x1={3} y1={6} x2={21} y2={6} />
                                    <path d="M16 10a4 4 0 0 1-8 0" />
                                </svg>
                                <span>Products</span>
                            </a>
                        </li>
                        <li className={`sidebar-list-item ${currentPathname === '/AdminView/Commandes' ? "active" : ""}`}>
                            <a style={{ cursor: "pointer" }} onClick={() => navigate('/AdminView/Commandes')}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={18}
                                    height={18}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-shopping-bag"
                                >
                                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                                    <line x1={3} y1={6} x2={21} y2={6} />
                                    <path d="M16 10a4 4 0 0 1-8 0" />
                                </svg>
                                <span>Commandes</span>
                            </a>
                        </li>
                        <li className={`sidebar-list-item ${currentPathname === '/AdminView/DetailsCommandes' ? "active" : ""}`}>
                            <a style={{ cursor: "pointer" }} onClick={() => navigate('/AdminView/DetailsCommandes')}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={18}
                                    height={18}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-shopping-bag"
                                >
                                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                                    <line x1={3} y1={6} x2={21} y2={6} />
                                    <path d="M16 10a4 4 0 0 1-8 0" />
                                </svg>
                                <span>Details Commande</span>
                            </a>
                        </li>
                        <li className={`sidebar-list-item ${currentPathname === '/AdminView/Paniers' ? "active" : ""}`}>
                            <a style={{ cursor: "pointer" }} onClick={() => navigate('/AdminView/Paniers')}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={18}
                                    height={18}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-shopping-bag"
                                >
                                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                                    <line x1={3} y1={6} x2={21} y2={6} />
                                    <path d="M16 10a4 4 0 0 1-8 0" />
                                </svg>
                                <span>Paniers</span>
                            </a>
                        </li>
                        <li className={`sidebar-list-item ${currentPathname === '/AdminView/Categories' ? "active" : ""}`}>
                            <a style={{ cursor: "pointer" }} onClick={() => navigate('/AdminView/Categories')}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={18}
                                    height={18}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-shopping-bag"
                                >
                                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                                    <line x1={3} y1={6} x2={21} y2={6} />
                                    <path d="M16 10a4 4 0 0 1-8 0" />
                                </svg>
                                <span>Categories</span>
                            </a>
                        </li>
                        <li className={`sidebar-list-item ${currentPathname === '/AdminView/Comments' ? "active" : ""}`}>
                            <a style={{ cursor: "pointer" }} onClick={() => navigate('/AdminView/Comments')}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={18}
                                    height={18}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-shopping-bag"
                                >
                                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                                    <line x1={3} y1={6} x2={21} y2={6} />
                                    <path d="M16 10a4 4 0 0 1-8 0" />
                                </svg>
                                <span>Comments</span>
                            </a>
                        </li>
                    </ul>
                    <div className="account-info">
                        <div className="account-info-picture">
                            <img
                                src={myPhoto}
                                alt="Account"
                            />
                        </div>
                        <div className="account-info-name">Aloui Aziz</div>
                        <button className="account-info-more">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-more-horizontal"
                            >
                                <circle cx={12} cy={12} r={1} />
                                <circle cx={19} cy={12} r={1} />
                                <circle cx={5} cy={12} r={1} />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="app-content">
                    <div className="app-content-header">
                        <h1 className="app-content-headerText">Products</h1>
                        <button className="app-content-headerButton" onClick={handleShowAdd}>Add Product</button>
                    </div>
                    <div className="app-content-actions">
                        <input className="search-bar" placeholder="Search..." type="search" onChange={(e) => { setFilter(e.target.value) }} />
                        <div className="app-content-actions-wrapper">
                            <div className="filter-button-wrapper">
                                <button className="action-button filter jsFilter">
                                    <span>Filter</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={16}
                                        height={16}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="feather feather-filter"
                                    >
                                        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="products-area-wrapper tableView">
                        <div className="products-header">
                            <div className="product-cell image">
                                Items
                                <button className="sort-button">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={16}
                                        height={16}
                                        viewBox="0 0 512 512"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <div className="product-cell category">
                                Category
                                <button className="sort-button">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={16}
                                        height={16}
                                        viewBox="0 0 512 512"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <div className="product-cell status-cell">
                                Status
                                <button className="sort-button">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={16}
                                        height={16}
                                        viewBox="0 0 512 512"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <div className="product-cell stock">
                                Stock
                                <button className="sort-button">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={16}
                                        height={16}
                                        viewBox="0 0 512 512"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <div className="product-cell price">
                                Price
                                <button className="sort-button">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={16}
                                        height={16}
                                        viewBox="0 0 512 512"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <div className="product-cell price">
                                Details
                                <button className="sort-button">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={16}
                                        height={16}
                                        viewBox="0 0 512 512"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        {products.filter(product => product.nom.toLowerCase().includes(filter.toLowerCase().trim())).map((product) => (
                            <div className="products-row" key={product._id}>
                                <button className="cell-more-button">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={18}
                                        height={18}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="feather feather-more-vertical"
                                    >
                                        <circle cx={12} cy={12} r={1} />
                                        <circle cx={12} cy={5} r={1} />
                                        <circle cx={12} cy={19} r={1} />
                                    </svg>
                                </button>
                                <div className="product-cell image">
                                    <img
                                        src={product.image}
                                        alt="product"
                                    />
                                    <span>{product.nom}</span>
                                </div>
                                <div className="product-cell category">
                                    {/* <span className="cell-h6">Category:</span>*/}{product.categorie}
                                </div>
                                <div className="product-cell status-cell">
                                    {/* <span className="cell-h6">Status:</span> */}
                                    <span className={product.stock > 0 ? "status active" : "status disabled"}>{product.stock > 0 ? "active" : "disabled"}</span>
                                </div>
                                <div className="product-cell stock">
                                    {/* <span className="cell-h6">Stock:</span> */}{product.stock}
                                </div>
                                <div className="product-cell price">
                                    {/* <span className="cell-h6">Price:</span> */} {product.prix}
                                </div>
                                <div className="product-cell price">
                                    {/* <span className="cell-h6">Details</span> */}
                                    <button className="sort-button" onClick={() => { handleShowUp(); setProductUpdated(product) }}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={16}
                                            height={16}
                                            viewBox="0 0 512 512"
                                        >
                                            <path
                                                fill="currentColor"
                                                d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z"
                                            />
                                        </svg>
                                    </button>
                                    <button className="sort-button" onClick={() => { const id = product._id; getOneProduct(id); handleShow() }}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={16}
                                            height={16}
                                            viewBox="0 0 512 512"
                                        >
                                            <path
                                                fill="currentColor"
                                                d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"
                                            />
                                        </svg>
                                    </button>
                                    <button className="sort-button" onClick={() => { const id = product._id; deleteProduct(id) }}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={16}
                                            height={16}
                                            viewBox="0 0 512 512"
                                        >
                                            <path
                                                fill="currentColor"
                                                d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Products
