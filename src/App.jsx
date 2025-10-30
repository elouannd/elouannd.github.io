import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import Plugins from './components/Plugins';
import Apps from './components/Apps';
import Autre from './components/Autre';
import Contact from './components/Contact';
import UnlinkedPage from './components/UnlinkedPage';
import NotFound from './components/NotFound';
import FFMPEGConverter from './components/FFMPEGConverter';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/u/:slug" element={<UnlinkedPage />} />
        <Route path="/ffmpeg" element={<FFMPEGConverter />} />

        {/* Ces routes ne seront rendues qu'en mode développement */}
        {import.meta.env.DEV && (
          <>
            <Route path="/plugins" element={<Plugins />} />
            <Route path="/apps" element={<Apps />} />
            <Route path="/autre" element={<Autre />} />
            <Route path="/contact" element={<Contact />} />
          </>
        )}

        {/* 404 fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
