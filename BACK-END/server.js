// Create Server and connexion with Data Base 
const express = require("express");
const mongosse = require('mongoose');
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoute = require('./routes/auth.js')
const productsRoute = require('./routes/product.js')
const userRoute = require('./routes/user.js')
const categorieRoute = require('./routes/categorie.js')
const commentaireRoute = require('./routes/commentaire.js')
const commandeRoute = require('./routes/commande.js')
// const detailsCommandeRoute = require('./routes/detailsCommande.js')
// const panierRoute = require('./routes/panier.js')
const cookieParser = require('cookie-parser')


dotenv.config();
const app = express();
const server = process.env.SERVER;
const PORT = process.env.PORT || 4000
const DB = process.env.DB


app.use(bodyParser.json())
app.use(cors());
app.use(cookieParser())

// connexion to our DB , MongoDB
mongosse.connect(`${server}/${DB}`)
    .then(() => console.log("DB CONNECTED DONE"))
    .catch((err) => console.error("DB not connected", err))

app.use('/auth', authRoute)
app.use('/products', productsRoute)
app.use('/user', userRoute)
app.use('/categorie', categorieRoute)
app.use('/commentaire', commentaireRoute)
app.use('/commande', commandeRoute)
// app.use('/detailsCommande', detailsCommandeRoute)
// app.use('/panier', panierRoute)

// STARTED SERVER
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})

