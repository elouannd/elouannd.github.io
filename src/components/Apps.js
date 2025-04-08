import React from 'react';
import { Link } from 'react-router-dom';

function Apps() {
  return (
    <div className="apps-page page">
      <Link to="/" className="nav-button back-button">Retour à l'accueil</Link>
      <h2>Mes Applications</h2>
      <div className="apps-grid">
        {/* Les applications seront ajoutées ici */}
      </div>
    </div>
  );
}

export default Apps;