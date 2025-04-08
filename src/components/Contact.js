import React from 'react';
import { Link } from 'react-router-dom';

function Contact() {
  return (
    <div className="contact-page page">
      <Link to="/" className="nav-button back-button">Retour à l'accueil</Link>
      <h2>Contact</h2>
      <div className="contact-content">
        {/* Le formulaire de contact sera ajouté ici */}
      </div>
    </div>
  );
}

export default Contact;