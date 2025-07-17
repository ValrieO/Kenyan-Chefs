import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Header } from './components/common/Header'
import { Footer } from './components/common/Footer'
import { LandingPage } from './pages/home/LandingPage'
import { RecipesPage } from './pages/recipes/RecipesPage'
import { ChefsPage } from './pages/chefs/ChefsPage'
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'
import { LoginPage } from './pages/auth/LoginPage'
import { SignupPage } from './pages/auth/SignupPage'

function App() {
  return (
    <div className="App min-h-screen bg-gray-50">
      <Header />
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/recipes" element={<RecipesPage />} />
          <Route path="/chefs" element={<ChefsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App