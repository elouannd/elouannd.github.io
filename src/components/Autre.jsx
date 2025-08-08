import React from 'react';
import { Link } from 'react-router-dom';

function Autre() {
  return (
    <div className="autre-page page">
      <Link to="/" className="nav-button back-button">Retour à l'accueil</Link>
      <h2>Autres Projets</h2>
      <div className="autre-content">
        {/* Le contenu sera ajouté ici */}
      </div>
    </div>
  );
}

export default Autre;