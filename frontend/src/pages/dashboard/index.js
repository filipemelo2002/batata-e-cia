import React, { useState, useEffect, useMemo } from "react";

import api from "../../services/api";

import { FaEdit, FaTrash } from "react-icons/fa";
import "./styles.css";
export default function Dashboard({ history }) {
  const [auth_id, setAuthId] = useState("");
  const [img_url, setImgUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [itens, setItens] = useState([]);
  const [stagedChange, setStagedChange] = useState({});
  const [editBtn, setEditBtn] = useState("none");
  const display = useMemo(() => (editBtn === "none" ? "block" : "none"), [
    editBtn,
  ]);

  async function onSubmit(e) {
    e.preventDefault();
    if (
      img_url.length === 0 ||
      title.length === 0 ||
      description.length === 0 ||
      price.length === 0
    ) {
      alert("Todos os campos são obrigatórios");
      return;
    }

    try {
      const response = await api.post(
        "menu/item",
        {
          img_url,
          title,
          description,
          price,
        },
        {
          headers: {
            auth_id,
          },
        }
      );
      setItens([...itens, response.data]);
      setImgUrl("");
      setTitle("");
      setDescription("");
      setPrice("");
    } catch (err) {
      alert("Erro ao salvar dados");
    }
  }

  async function editClick(item, index) {
    window.scrollTo(0, 0);
    const { img_url, title, description, price, _id } = item;
    setEditBtn("block");

    setImgUrl(img_url);
    setTitle(title);
    setDescription(description);
    setPrice(price);

    setStagedChange({ id: _id, index });
  }

  async function logOut() {
    await localStorage.clear();
    history.push("/");
  }
  async function submitEdited(e) {
    e.preventDefault();
    if (
      img_url.length === 0 ||
      title.length === 0 ||
      description.length === 0 ||
      price.length === 0
    ) {
      alert("Todos os campos são obrigatórios");
      return;
    }

    try {
      await api.put(
        `menu/item/${stagedChange.id}`,
        {
          img_url,
          title,
          description,
          price,
        },
        {
          headers: {
            auth_id,
          },
        }
      );

      const draft = itens;
      draft[stagedChange.index] = {
        img_url,
        title,
        description,
        price,
        _id: stagedChange.id,
      };
      setItens(draft);
      setImgUrl("");
      setTitle("");
      setDescription("");
      setPrice("");
    } catch (err) {
      alert("Erro ao atualizar dados");
    }
    setEditBtn("none");
  }

  async function submitDeleted(item) {
    const draft = itens.filter((i) => i._id !== item._id);

    try {
      await api.delete(`menu/item/${item._id}`, {
        headers: {
          auth_id,
        },
      });
      setItens(draft);
    } catch (err) {
      console.log("Erro ao deletar dado");
    }
  }
  useEffect(() => {
    async function logged() {
      const id = await localStorage.getItem("auth_id");
      if (!id) {
        history.push("/");
      } else {
        setAuthId(id);
        const menu = await api.get("menu/item");
        setItens(menu.data);
      }
    }
    logged();
  }, [history]);
  return (
    <div className="dashboard">
      <div className="addForm">
        <form>
          <input
            type="text"
            placeholder="Link da imagem"
            value={img_url}
            onChange={(e) => setImgUrl(e.target.value)}
          />
          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <input
            type="text"
            placeholder="Preço"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <button onClick={onSubmit} style={{ display }}>
            Adicionar ao Cardápio
          </button>
          <button onClick={submitEdited} style={{ display: editBtn }}>
            Salvar alterações
          </button>
          <button onClick={() => logOut()} className="logOut">
            Sair
          </button>
        </form>
      </div>
      <div className="itensList">
        <ul>
          {itens.map((item, index) => (
            <li key={item._id}>
              <div className="cardItem">
                <img src={item.img_url} alt="item" />
                <p>
                  <strong>{item.title}</strong>
                </p>
                <p>{item.description}</p>
                <span>
                  <strong>
                    {Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(item.price)}
                  </strong>
                </span>
                <section>
                  <button onClick={() => editClick(item, index)}>
                    <FaEdit color="#3d3d3d" size={24} />
                  </button>
                  <button onClick={() => submitDeleted(item)}>
                    <FaTrash color="#3d3d3d" size={24} />
                  </button>
                </section>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
