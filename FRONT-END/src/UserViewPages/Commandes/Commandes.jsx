import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import CommandeDetails from './commandeDetails';
import Navbar from '../../components/Navbar/Navbar';
import './Commandes.css';

const Commandes = () => {
  const [show, setShow] = useState(false);
  const [commandes, setCommandes] = useState(null);
  const [commandeDetails, setCommandeDetails] = useState(null);

  const handleClose = () => show && setShow(false);
  const handleShow = (commande) => {
    setCommandeDetails(commande);
    setShow(true);
  };

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/commande/getUserCommandes/${id}`);
        setCommandes(response.data.payload);
      } catch (error) {
        console.error('Error fetching data:', error);
        if (error.response) {
          console.error('Server responded with:', error.response.data);
        }
      }
    };

    fetchData();
  }, [id]);

  return (
    <div>
      <Navbar />
      <div className='commandes' style={{ marginBottom: 50 }}>
        <h1 style={{ marginTop: 50 }}>Mes Commandes</h1>
        <div className="container mt-5">
          <div className="d-flex justify-content-center row">
            <div className="col-md-10">
              <div className="rounded">
                <div className="table-responsive table-borderless">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Commandes ID</th>
                        <th> NB Products</th>
                        <th>Status</th>
                        <th>Total</th>
                        <th>Created On</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody className="table-body">
                      {commandes && Array.isArray(commandes) && commandes.length > 0 ? commandes.map((commande) => (
                        <tr className="cell-1" key={commande._id}>
                          <td>{commande._id}</td>
                          <td>{commande.products.length}</td>
                          <td>
                            <span className={`badge ${commande.etat === "Done" ? 'badge-success' : 'badge-danger'}`}>
                              {commande.etat === "Done" ? "Done" : "Canceled"}
                            </span>
                          </td>
                          <td>{commande.prixTotale} DT</td>
                          <td>{commande.date}</td>
                          <td>
                            <i className="fa fa-ellipsis-h text-black-50" onClick={() => handleShow(commande)} />
                          </td>
                        </tr>
                      )) : (<h1 style={{ marginTop: 50 }}>No Commandes</h1>)}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title style={{ marginLeft: 120 }}>Commandes Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {commandeDetails && <CommandeDetails commande={commandeDetails} />}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Commandes;
