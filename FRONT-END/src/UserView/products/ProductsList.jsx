import React from 'react'
import './productsList.css'
import useProducts from './useProducts'

const ProductsList = () => {


    const { getAllProducts, getOneProduct, isLoading, products, error } = useProducts()

    return (
        <main>
            {" "}
            <div
                className="container-fluid bg-trasparent my-4 p-3"
                style={{ position: "relative" }}
            >
                {" "}
                <div className="row row-cols-1 row-cols-xs-2 row-cols-sm-2 row-cols-lg-4 g-3">
                    {" "}
                    {products.map((product) => (
                        <div className="col" key={product._id}>
                            {" "}
                            <div className="card h-100 shadow-sm">
                                {" "}
                                <img
                                    src={product.image}
                                    className="card-img-top"
                                    alt="..."
                                />{" "}
                                <div className="label-top shadow-sm">{product.stock}</div>{" "}
                                <div className="card-body">
                                    {" "}
                                    <div className="clearfix mb-3">
                                        {" "}
                                        <span className="float-start badge rounded-pill bg-primary">
                                            {product.nom}
                                        </span>{" "}
                                        <span className="float-start badge rounded-pill bg-success float-end">
                                            {product.prix}
                                        </span>{" "}
                                    </div>{" "}
                                    <h5 className="card-title">
                                        {product.description}
                                    </h5>{" "}
                                    <div className="text-center my-4">
                                        {" "}
                                        <a href="#" className="btn btn-warning">
                                            Check offer
                                        </a>{" "}
                                    </div>{" "}
                                </div>{" "}
                            </div>{" "}
                        </div>
                    ))}
                </div>{" "}
            </div>{" "}
        </main>

    )
}

export default ProductsList