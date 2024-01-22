import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactStars from "react-rating-stars-component";
import './ProductDetails.css'

const ProductDetails = () => {

  const ratingChanged = (newRating) => {
    console.log(newRating);
  };



  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [comments, setComments] = useState(null)


  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseP = await axios.get(`http://localhost:4000/products/getOneProduct/${id}`);
        const responseC = await axios.get(`http://localhost:4000/commentaire/getPrCommentaire/${id}`);

        setProduct(responseP.data.payload);
        setComments(responseC.data.payload);

      } catch (error) {
        console.error('Error fetching data:', error);
        if (error.response) {
          console.error('Server responded with:', error.response.data);
        }
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    // Log the updated comments value
    console.log(comments);
  }, [comments]); // Add a new useEffect to log when comments is updated



  return (
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom: 100 }}>
      {product ? (
        <div className='PD'>
          <div className="d-flex justify-content-center container mt-5">
            <div className="card p-3 bg-white" style={{ width: 444, marginBottom: 100 }}>
              <i className="fa fa-apple" />
              <div className="about-product text-center mt-2">
                <img src={product.image} width={300} />
                <div>
                  <h4>{product?.nom}</h4>
                  <h6 className="mt-0 text-black-50">{product?.description}</h6>
                </div>
              </div>
              <div className="stats mt-2">
                <div className="d-flex justify-content-between p-price">
                  <span>prix</span>
                  <span>{product?.prix} DT</span>
                </div>
                <div className="d-flex justify-content-between p-price">
                  <span>Stock</span>
                  <span>{product?.stock}</span>
                </div>
                <div className="d-flex justify-content-between p-price">
                  <span>Catégorie</span>
                  <span>{product?.categorie}</span>
                </div>
                <div className="d-flex justify-content-between p-price">
                  <span>Rate</span>
                  <ReactStars
                    count={5}
                    onChange={ratingChanged}
                    size={24}
                    activeColor="#ffd700"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      ) : (
        <h1>Loading...</h1>
      )}
      <div className='comments' style={{ width: '50%' }}>
        <div className="container mt-5">
          <div className="row  d-flex justify-content-center">
            <div className="col-md-8">
              <div className="headings d-flex justify-content-between align-items-center mb-3">
                <h5>Unread comments({comments && Array.isArray(comments) && comments.length > 0 ? comments.length : "0"})</h5>
                <div className="buttons">
                  <span className="badge bg-white d-flex flex-row align-items-center">
                    <span className="text-primary">Comments "ON"</span>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckChecked"
                        defaultChecked=""
                      />
                    </div>
                  </span>
                </div>
              </div>{comments && Array.isArray(comments) && comments.length > 0 ? comments.map((comment) => (
                <div className="card p-3" style={{ width: '100%', marginTop: 10 }}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="user d-flex flex-row align-items-center">
                      <img
                        src="https://i.imgur.com/hczKIze.jpg"
                        width={30}
                        className="user-img rounded-circle mr-2"
                      />
                      <span>
                        <small className="font-weight-bold text-primary">
                          {comment.user_id}
                        </small>{" "}
                        <small className="font-weight-bold">
                          {comment.commentaire}
                        </small>
                      </span>
                    </div>
                    <small>{comment.date}</small>
                  </div>
                  <div className="action d-flex justify-content-between mt-2 align-items-center">
                    <div className="reply px-4">
                      <small>Remove</small>
                      <span className="dots" />
                      <small>Reply</small>
                      <span className="dots" />
                      <small>Translate</small>
                    </div>
                    <div className="icons align-items-center">
                      <i className="fa fa-star text-warning" />
                      <i className="fa fa-check-circle-o check-icon text-primary" />
                      <i className="fa fa-user-plus text-muted" />
                    </div>
                  </div>
                </div>
              )) : (<h1 style={{ marginTop: 50 }}>No comments</h1>)}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;
