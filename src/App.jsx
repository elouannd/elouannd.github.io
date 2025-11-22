import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import AboutPage from './components/AboutPage'
import AppsPage from './components/AppsPage'
import ContactPage from './components/ContactPage'
import EqEarTrainer from './components/apps/EqEarTrainer'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/apps" element={<AppsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/eq-trainer" element={<EqEarTrainer />} />
        {/* Future app routes will go here */}
        <Route path="/app1" element={<div className="min-h-screen flex items-center justify-center text-white text-2xl">App 1 Coming Soon</div>} />
        <Route path="/experiment-z" element={<div className="min-h-screen flex items-center justify-center text-white text-2xl">Experiment Z Coming Soon</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
