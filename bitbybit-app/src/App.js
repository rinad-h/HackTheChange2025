import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import MainMenu from "./Components/MainMenu";
import Map from "./Components/LeafletMap";
import Crime from "./Components/Crime";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            loggedIn ? <Navigate to="/main" /> : <Login onLoginSuccess={() => setLoggedIn(true)} />
          }
        />
        <Route
          path="/signup"
          element={loggedIn ? <Navigate to="/main" /> : <Signup />}
        />
        <Route path="/map" element={<Map />} />

        <Route
          path="/main"
          element={
            loggedIn ? (
              <MainMenu
                onLogout={() => setLoggedIn(false)}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/crime"
          element={
            loggedIn ? (
              <Crime
                onBack={() => window.history.back()}
                onLogout={() => setLoggedIn(false)}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route path="*" element={<Navigate to={loggedIn ? "/main" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
