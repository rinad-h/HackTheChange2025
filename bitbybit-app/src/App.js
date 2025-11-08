import React, { useState } from "react";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import MainMenu from "./Components/MainMenu";
import Map from "./Components/LeafletMap";
import Crime from "./Components/Crime";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [route, setRoute] = useState(null); // 'main', 'crime', etc.
  const path = window.location.pathname;

  // Map standalone route (keeps existing behavior)
  if (!loggedIn && path === "/map") {
    return <Map />;
  }

  if (!loggedIn && path === "/signup") {
    return <Signup />;
  }

  if (!loggedIn) {
    return (
      <Login
        onLoginSuccess={() => {
          setLoggedIn(true);
          setRoute("main");
        }}
      />
    );
  }

  // loggedIn views
  if (route === "crime") {
    return <Crime onBack={() => setRoute("main")} onLogout={() => { setLoggedIn(false); setRoute(null); }} />;
  }

  // default to MainMenu
  return <MainMenu onLogout={() => { setLoggedIn(false); setRoute(null); }} onNavigate={(r) => setRoute(r)} />;
}

export default App;
