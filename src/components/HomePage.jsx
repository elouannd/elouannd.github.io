import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function HomePage() {
  // En Vite, on utilise import.meta.env.DEV
  const isDevelopment = import.meta.env.DEV;

  return (
    <div className="App">
      <section className="hero">
        <div className="container">
          <div className="home-card glass">
            <h1 className="main-title">Elouann</h1>

            {isDevelopment && (
              <nav className="nav-grid">
                <Link to="/plugins" className="nav-button btn-glass">PLUGINS</Link>
                <Link to="/apps" className="nav-button btn-glass">APPS</Link>
                <Link to="/autre" className="nav-button btn-glass">AUTRE</Link>
                <Link to="/contact" className="nav-button btn-glass">CONTACT</Link>
              </nav>
            )}
          </div>
        </div>
      </section>

      <footer className="contact-banner glass">
        <p>Contact: <a href="mailto:domenech@elouann.me">domenech@elouann.me</a></p>
      </footer>
    </div>
  );
}

export default HomePage;