import React from 'react'

const commandeDetails = ({ commande }) => {
    return (
        <div  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ margin: "5px" }}>
                <h6>Commande ID : {commande._id}</h6>
            </div>
            <br />
            <h5>Products</h5>
            <div style={{ margin: "5px" }}>
                {commande.products.map((product) => (<h6>{product._id} : {product.prixUnitaire} * {product.quantite} = {product.prixUnitaire * product.quantite} DT</h6>))}
            </div>
            <br />
            <div style={{ margin: "5px" }}>
                <h6>Totale : {commande.prixTotale} DT</h6>
            </div>
            <br />
            <div style={{ margin: "5px" }}>
                <h6>Date : {commande.date}</h6>
            </div>
            <br />
            <div style={{ margin: "5px" }}>
                <h6>Status : {commande.etat === "Done" ? "Done" : "Canceled"}</h6>
            </div>
        </div>
    )
}

export default commandeDetails