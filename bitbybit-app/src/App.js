import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import MainMenu from "./Components/MainMenu";
import Map from "./Components/LeafletMap";
import Crime from "./Components/Crime";
import SmallBus from "./Components/SmallBus";
import Transportation from "./Components/Transportation";
import Events from "./Components/Event";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Handle login success
  const handleLoginSuccess = (username) => {
    setLoggedIn(true);
    setCurrentUser(username);
  };

  // Handle logout
  const handleLogout = () => {
    setLoggedIn(false);
    setCurrentUser(null);
  };

  return (
    <Router>
      <Routes>

        {/* --- LOGIN PAGE --- */}
        <Route
          path="/login"
          element={
            loggedIn ? (
              <Navigate to="/main" />
            ) : (
              <Login onLoginSuccess={handleLoginSuccess} />
            )
          }
        />

        {/* --- SIGNUP PAGE --- */}
        <Route
          path="/signup"
          element={loggedIn ? <Navigate to="/main" /> : <Signup />}
        />

        {/* --- MAIN MENU --- */}
        <Route
          path="/main"
          element={
            loggedIn ? (
              <MainMenu
                currentUser={currentUser}
                onLogout={handleLogout}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* --- MAP PAGE --- */}
        <Route path="/map" element={<Map />} />

        {/* --- CRIME PAGE --- */}
        <Route
          path="/crime"
          element={
            loggedIn ? (
              <Crime
                currentUser={currentUser}
                onBack={() => window.history.back()}
                onLogout={handleLogout}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* --- SMALL BUSINESS PAGE --- */}
        <Route
          path="/business"
          element={
            loggedIn ? (
              <SmallBus
                currentUser={currentUser}
                onBack={() => window.history.back()}
                onLogout={handleLogout}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* --- TRANSPORTATION PAGE --- */}
        <Route
          path="/transport"
          element={
            loggedIn ? (
              <Transportation
                currentUser={currentUser}
                onBack={() => window.history.back()}
                onLogout={handleLogout}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* --- EVENTS PAGE --- */}
        <Route
          path="/events"
          element={
            loggedIn ? (
              <Events
                currentUser={currentUser}
                onBack={() => window.history.back()}
                onLogout={handleLogout}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* --- CATCH-ALL REDIRECT --- */}
        <Route path="*" element={<Navigate to={loggedIn ? "/main" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
