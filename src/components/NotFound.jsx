import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="page">
      <Link to="/" className="nav-button back-button">Retour à l'accueil</Link>
      <h2>404 — Page non trouvée</h2>
      <p>La page demandée est introuvable.</p>
    </div>
  )
}