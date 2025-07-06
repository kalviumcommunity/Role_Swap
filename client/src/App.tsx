import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import RoleSelection from './components/RoleSelection';
import Simulation from './components/Simulation';
import Results from './components/Results';
import { useApp } from './context/AppContext';

function AppRoutes() {
  const { state } = useApp();

  return (
    <Router>
      <Header />
      <Routes>
        <Route 
          path="/" 
          element={
            state.isAuthenticated ? <Navigate to="/dashboard" replace /> : <LandingPage />
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            state.isAuthenticated ? <Dashboard /> : <Navigate to="/" replace />
          } 
        />
        <Route 
          path="/roles" 
          element={
            state.isAuthenticated ? <RoleSelection /> : <Navigate to="/" replace />
          } 
        />
        <Route 
          path="/simulation/:roleId" 
          element={
            state.isAuthenticated ? <Simulation /> : <Navigate to="/" replace />
          } 
        />
        <Route 
          path="/results/:roleId" 
          element={
            state.isAuthenticated ? <Results /> : <Navigate to="/" replace />
          } 
        />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}

export default App;