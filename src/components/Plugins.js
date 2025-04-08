import React from 'react';
import { Link } from 'react-router-dom';

function Plugins() {
  return (
    <div className="plugins-page page">
      <Link to="/" className="nav-button back-button">Retour à l'accueil</Link>
      <h2>Mes Plugins</h2>
      <div className="plugins-grid">
        {/* Les plugins seront ajoutés ici */}
      </div>
    </div>
  );
}

export default Plugins;