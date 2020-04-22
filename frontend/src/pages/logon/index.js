import React from "react";

import Logo from "../assets/logo.svg";
import "./styles.css";
export default function Logon({ history }) {
  function onSubmit(e) {
    e.preventDefault();
    history.push("/dashboard");
  }
  return (
    <div className="container">
      <img src={Logo} height="250" alt="logo" />

      <div className="formFields" onSubmit={onSubmit}>
        <h1>Faça Login</h1>
        <form mehtod="post">
          <input type="text" placeholder="Usuário" />
          <input type="password" placeholder="Senha" />
          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}
