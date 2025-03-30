import React, { use, useEffect } from 'react';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import MainLayout from './layout/MainLayout';




const App: React.FC = () =>{
    return (
      <Routes>
      <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/" />} />
      </Route>
      </Routes>
    );
  }
  
  export default App;