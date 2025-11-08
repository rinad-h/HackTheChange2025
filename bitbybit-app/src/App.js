import React from "react";
import Login from "./Components/Login";
import Signup from "./Components/Signup";

function App() {
  const path = window.location.pathname;

  if (path === "/signup") {
    return <Signup />;
  }

  return <Login />;
}

export default App;
