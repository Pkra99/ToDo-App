import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'


import './App.css'

function App() {

  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
