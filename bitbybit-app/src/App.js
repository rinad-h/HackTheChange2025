import React, { useState } from "react";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import MainMenu from "./Components/MainMenu";
import Map from "./Components/LeafletMap";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const path = window.location.pathname;

  if (loggedIn) {
    return <MainMenu onLogout={() => setLoggedIn(false)} />;
  }
   if (path === "/map") {
    return <LeafletMap />;
  }

  if (path === "/signup") {
    return <Signup />;
  }

  return <Login onLoginSuccess={() => setLoggedIn(true)} />;
}

export default App;
