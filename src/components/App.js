import React, { useEffect, useState } from "react";
import Login from "./Login";
import Spotify from "../utils/Spotify";
import Search from "./Search";

function App() {
  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    setLoggedIn(() => Spotify.hasAccessToken());
  }, []);

  function handleClick(e) {
    e.preventDefault();
    Spotify.logIn();
  }

  if (!loggedIn) return <Login onClick={handleClick} />;

  return (
    <div className="App">
      <h1>Logged In!</h1>
      <Search />
    </div>
  );
}

export default App;
