import React, { useState, useEffect } from "react";
import "./styles.css";

import api from "../../services/api";
export default function Profile({ history }) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [auth_id, setAuthId] = useState("");
  async function onSubmit(e) {
    e.preventDefault();

    if (
      user.length === 0 ||
      password.length === 0 ||
      confirmPass.length === 0
    ) {
      alert("Todos os campos são obrigatórios");
      return;
    }
    if (password !== confirmPass) {
      alert("a Senha e a Confirmação devem ser iguais");
      return;
    }
    try {
      await api.put(
        "admins",
        {
          user,
          password,
        },
        {
          headers: {
            auth_id,
          },
        }
      );
      await localStorage.clear();

      alert("Dados atualizados com sucesso!");
      history.push("/");
    } catch (err) {
      alert("Erro ao atualizar Login");
    }
  }
  useEffect(() => {
    async function logged() {
      const id = await localStorage.getItem("auth_id");
      if (!id) {
        history.push("/");
      } else {
        setAuthId(id);
      }
    }
    logged();
  }, [history]);
  return (
    <div className="profile-container">
      <div className="formContainer">
        <h1>Altere seu Login</h1>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Usuário"
            value={user}
            onChange={({ target }) => setUser(target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <input
            type="password"
            placeholder="Confirmação de Senha"
            value={confirmPass}
            onChange={({ target }) => setConfirmPass(target.value)}
          />
          <button type="submit">Atualizar</button>
          <button className="logOut" onClick={() => history.push("/dashboard")}>
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}
