import React, { useState, useEffect } from "react";

import Logo from "../assets/logo.svg";
import "./styles.css";
import api from "../../services/api";
export default function Logon({ history }) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmit(e) {
    e.preventDefault();

    try {
      const response = await api.post("sessions", { user, password });
      if (response.data) {
        const { _id: id } = response.data;
        localStorage.setItem("auth_id", id);
        history.push("/dashboard");
      }
    } catch (err) {
      alert("Usuário ou senha inválidos");
    }
  }

  useEffect(() => {
    async function logged() {
      const auth_id = await localStorage.getItem("auth_id");
      if (auth_id) {
        history.push("/dashboard");
      }
    }
    logged();
  }, [history]);

  return (
    <div className="container">
      <img src={Logo} height="250" alt="logo" />

      <div className="formFields" onSubmit={onSubmit}>
        <h1>Faça Login</h1>
        <form mehtod="post">
          <input
            type="text"
            placeholder="Usuário"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}
