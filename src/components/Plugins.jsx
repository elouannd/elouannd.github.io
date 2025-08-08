import React from 'react';
import { Link } from 'react-router-dom';
import { FaApple, FaWindows } from 'react-icons/fa'; // Importez les icônes
import './Plugins.css';

// Données d'exemple pour les plugins
const pluginsData = [
  {
    id: 1,
    name: 'Ryan Gosling Reverb',
    version: '2.0',
    logo: 'https://files.catbox.moe/44zloc.png', // Remplacez par le chemin réel
    description: 'Un reverb simple au allures du beau Ryan', // Ajout d'une description
    os: ['mac',],
    formats: ['VST3', 'AU', 'Standalone'],
    downloadLink: 'https://github.com/elouannd/ElouReverb/releases/download/Latest/RyanGoslingReverbV2.2.zip' // Remplacez par le lien réel
  },
  {
    id: 2,
    name: 'ElouReverb',
    version: '3.0',
    logo: 'https://files.catbox.moe/qcw9x3.png', // Remplacez par le chemin réel
    description: 'Un reberb cheap et simple', // Ajout d'une description
    os: ['mac', ],
    formats: ['VST3','AU' , 'Standalone'],
    downloadLink: 'https://github.com/elouannd/ElouReverb/releases/download/Latest/ElouReverbV3.zip' // Remplacez par le lien réel
  },
  // Ajoutez d'autres plugins ici
];

// Fonction pour mapper les OS aux icônes
const OsiCons = ({ osList }) => (
  <div className="plugin-os-icons">
    {osList.map(os => {
      if (os === 'mac') return <FaApple key="mac" title="macOS" />;
      if (os === 'win') return <FaWindows key="win" title="Windows" />;
      return null; // Ou une icône par défaut si nécessaire
    })}
  </div>
);


function Plugins() {
  return (
    <div className="plugins-page page">
      <Link to="/" className="nav-button back-button">Retour à l'accueil</Link>

      {/* Bandeau d'information AAX */}
      <div className="info-banner aax-notice">
        Les plugins au format AAX ne sont pas encore disponibles.
      </div>

      <h2>Découvrez Mes Plugins</h2> {/* Titre plus engageant */}
      <div className="plugins-grid">
        {pluginsData.map(plugin => (
          <div key={plugin.id} className="plugin-card">
            <img src={plugin.logo} alt={`${plugin.name} logo`} className="plugin-logo" />
            <h3 className="plugin-name">{plugin.name}</h3>
            <p className="plugin-version">v{plugin.version}</p>
            <p className="plugin-description">{plugin.description}</p> {/* Affichage de la description */}
            <div className="plugin-meta">
                <OsiCons osList={plugin.os} /> {/* Utilisation du composant d'icônes OS */}
                <span className="plugin-formats">
                 {plugin.formats.join(' / ')}
                </span>
            </div>
            <a href={plugin.downloadLink} download className="download-button">
              Télécharger
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Plugins;