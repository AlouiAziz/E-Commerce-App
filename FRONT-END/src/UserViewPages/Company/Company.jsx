import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import './Company.css'
import image from '../../Assests/images/logo-color.png'

const Company = () => {
    return (
        <div>
            <Navbar />
            <div className='company'>
                <div className="container mt-5">
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-7">
                            <div className="card p-3 py-4">
                                <div className="text-center">
                                    <img
                                        src={image}
                                        width={100}
                                        className="rounded-circle"
                                    />
                                </div>
                                <div className="text-center mt-3">
                                    <span className="bg-secondary p-1 px-4 rounded text-white">Pro</span>
                                    <h5 className="mt-2 mb-0">Smart Tech Hub</h5>
                                    <div className="px-4 mt-1">
                                        <p className="fonts">
                                            Bienvenue chez Smart Tech Hub, votre destination ultime pour tous vos besoins en matériel informatique de pointe. Notre boutique est l'endroit idéal où la technologie rencontre l'innovation, offrant une vaste gamme de produits de qualité pour satisfaire les passionnés de l'informatique, les professionnels exigeants et les entreprises en quête de performances exceptionnelles.

                                            Découvrez un univers de possibilités avec notre sélection soigneusement choisie de composants informatiques de premier ordre. Des processeurs ultraperformants aux cartes graphiques révolutionnaires, en passant par les cartes mères de dernière génération, nous vous offrons l'accès à des technologies de pointe pour optimiser votre expérience informatique.

                                            Que vous soyez un gamer passionné, un créatif à la recherche de puissance de traitement, ou un professionnel souhaitant améliorer l'efficacité de votre infrastructure, notre équipe dévouée est là pour vous guider. Nous croyons en la personnalisation et nous sommes prêts à vous conseiller pour créer la configuration informatique parfaite répondant à vos besoins spécifiques.

                                            En plus de notre gamme exceptionnelle de composants, nous proposons également une sélection complète d'accessoires, de périphériques et d'équipements connexes. Que ce soit des claviers ergonomiques, des souris de jeu avancées, des écrans haute résolution ou des solutions de stockage de pointe, nous avons tout ce qu'il vous faut pour compléter votre installation informatique.

                                            La satisfaction de nos clients est notre priorité absolue. 
                                        </p>
                                    </div>
                                    <ul className="social-list">
                                        <li>
                                            <i className="fa fa-facebook" />
                                        </li>
                                        <li>
                                            <i className="fa fa-dribbble" />
                                        </li>
                                        <li>
                                            <i className="fa fa-instagram" />
                                        </li>
                                        <li>
                                            <i className="fa fa-linkedin" />
                                        </li>
                                        <li>
                                            <i className="fa fa-google" />
                                        </li>
                                    </ul>
                                    <div className="buttons">
                                        <button className="btn btn-outline-primary px-4">Message</button>
                                        <button className="btn btn-primary px-4 ms-3">Contact</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Company