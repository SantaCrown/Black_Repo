import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Dashboard from "../../pages/Dashboard";
import Strategies from '../../pages/Strategies';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Bots from '../../pages/bots';
import BotName from '../../pages/BotName';
import Credentials from '../../pages/Credentials';
import PpmSimple from '../../pages/ppmSimple';
import Configurations from '../../pages/Configurations';
import Signup from '../../components/Signup';
import Login from '../../components/Login';
import ProtectedRoute from '../../components/ProtectedRoute ';

function Main({ menuState }) {
  return (
    <main>
      <BrowserRouter>
        <Sidebar menuState={menuState} />
        <div className="dashboard">
          <Routes>
            {/* Public Routes */}
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />

            {/* Protected Routes */}
            <Route
              exact
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/credentials"
              element={
                <ProtectedRoute>
                  <Credentials />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/strategies"
              element={
                <ProtectedRoute>
                  <Strategies />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bots"
              element={
                <ProtectedRoute>
                  <Bots />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ppm-simple"
              element={
                <ProtectedRoute>
                  <PpmSimple />
                </ProtectedRoute>
              }
            />
            <Route
              path="/active-bots"
              element={
                <ProtectedRoute>
                  <BotName />
                </ProtectedRoute>
              }
            />
            <Route
              path="/configurations"
              element={
                <ProtectedRoute>
                  <Configurations />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </main>
  );
}

export default Main;