import React, { useEffect, useState } from "react";
import Login from "./Login";
import Spotify from "../utils/Spotify";
import Search from "./Search";

function App() {
  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    setLoggedIn(() => Spotify.hasAccessToken());
  }, []);

  if (!loggedIn) return <Login />;

  return (
    <div className="App">
      <h1>Logged In!</h1>
      <Search />
    </div>
  );
}

export default App;
