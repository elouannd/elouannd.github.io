import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // Importer les styles globaux

function HomePage() {
  // Déterminer si on est en développement
  const isDevelopment = process.env.NODE_ENV === 'development';

  return (
    <div className="App gradient-background">
      <div className="homepage-content">
        <h1 className="main-title">Elouann</h1>
        {isDevelopment && (
          <nav>
            <Link to="/plugins" className="nav-button">PLUGINS</Link>
            <Link to="/apps" className="nav-button">APPS</Link>
            <Link to="/autre" className="nav-button">AUTRE</Link>
            <Link to="/contact" className="nav-button">CONTACT</Link>
          </nav>
        )}
        
        <div className="welcome">
          {isDevelopment 
            ? "Bienvenue sur mon portfolio. Choisissez une section."
            : "Bienvenue sur mon portfolio. Site en maintenance."}
        </div>
      </div>
    </div>
  );
}

export default HomePage;