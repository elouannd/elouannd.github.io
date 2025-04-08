import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
// Import conditionnels pour éviter qu'ils soient inclus en production
const Plugins = process.env.NODE_ENV === 'development' ? require('./components/Plugins').default : () => null;
const Apps = process.env.NODE_ENV === 'development' ? require('./components/Apps').default : () => null;
const Autre = process.env.NODE_ENV === 'development' ? require('./components/Autre').default : () => null;
const Contact = process.env.NODE_ENV === 'development' ? require('./components/Contact').default : () => null;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Ces routes ne seront rendues qu'en mode développement */}
        {process.env.NODE_ENV === 'development' && (
          <>
            <Route path="/plugins" element={<Plugins />} />
            <Route path="/apps" element={<Apps />} />
            <Route path="/autre" element={<Autre />} />
            <Route path="/contact" element={<Contact />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
