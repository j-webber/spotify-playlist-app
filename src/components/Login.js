import React from "react";
import Spotify from "../utils/Spotify";

export default function Login(params) {
  function handleClick(e) {
    e.preventDefault();
    Spotify.logIn();
  }

  return <button onClick={handleClick}>Login</button>;
}
