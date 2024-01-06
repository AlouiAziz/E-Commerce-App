import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import './productsList.css'; // Import your CSS file
import useProducts from './useProducts';

const ProductsList = () => {
    const { getAllProducts, getOneProduct, isLoading, products, error } = useProducts();

    // State for pagination
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 4;

    // Calculate the index of the first and last items to display on the current page
    const indexOfLastProduct = (currentPage + 1) * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    // Function to handle page change
    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    return (
        <main>
            <div className="container-fluid bg-trasparent my-4 p-3" style={{ position: "relative" }}>
                <div className="row row-cols-1 row-cols-xs-2 row-cols-sm-2 row-cols-lg-4 g-3">
                    {currentProducts.map((product) => (
                        <div className="col" key={product._id}>
                            <div className="card h-100 shadow-sm">
                                <img src={product.image} className="card-img-top" alt="..." />
                                <div className="label-top shadow-sm">{product.stock}</div>
                                <div className="card-body">
                                    <div className="clearfix mb-3">
                                        <span className="float-start badge rounded-pill bg-primary">
                                            {product.nom}
                                        </span>
                                        <span className="float-start badge rounded-pill bg-success float-end">
                                            {product.prix}
                                        </span>
                                    </div>
                                    <h5 className="card-title">{product.description}</h5>
                                    <div className="text-center my-4">
                                        <a href="#" className="btn btn-warning">
                                            Check offer
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
    );
};

export default ProductsList;
