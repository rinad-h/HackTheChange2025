import React, { useState } from "react";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import MainMenu from "./Components/MainMenu";
import Map from "./Components/LeafletMap";
import ForumPage from "./Pages/ForumPage"

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const path = window.location.pathname;

  if (loggedIn) {
    return (
    
    <MainMenu onLogout={() => setLoggedIn(false)} />
  );
  }
   if (path === "/map") {
    return <Map />;
  }

  if (path === "/signup") {
    return <Signup />;
  }
  if(path == "/forum"){
    return <ForumPage />;

  }

  return <Login onLoginSuccess={() => setLoggedIn(true)} />;
}

export default App;
