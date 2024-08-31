import React from 'react'
import Landing from './components/Landing'
import Home from './components/Home'
import Categories from './components/Categories'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/categories" element={<Categories/>}/>
      </Routes>
    </Router>
  )
}

export default App
