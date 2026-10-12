import { useState } from 'react'

import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home.jsx"

import Layout from "./components/Layout.jsx"




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />} >
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
