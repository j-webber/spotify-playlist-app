import React from "react";

export default function Login(params) {
  const handleClick = params.onClick;

  return <button onClick={handleClick}>Login</button>;
}
