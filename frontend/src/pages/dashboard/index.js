import React from "react";

import "./styles.css";
export default function Dashboard() {
  return (
    <div className="dashboard">
      <div className="addForm">
        <form method="post">
          <input type="text" placeholder="Link da imagem" />
          <input type="text" placeholder="Título" />
          <textarea placeholder="Descrição"></textarea>
          <input type="text" placeholder="Preço" />
          <button>Adicionar ao Cardápio</button>
        </form>
      </div>
      <div className="itensList">
        <ul>
          <li>
            <div className="cardItem">
              <img
                src="https://img.cybercook.com.br/receitas/845/coxinha-de-soja-1-623x350.jpeg"
                alt="item"
              />
              <p>
                <strong>Título exemplo</strong>
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam
              </p>
              <span>
                <strong>R$ 12,40</strong>
              </span>
            </div>
          </li>
          <li>
            <div className="cardItem">
              <img
                src="https://img.cybercook.com.br/receitas/845/coxinha-de-soja-1-623x350.jpeg"
                alt="item"
              />
              <p>
                <strong>Título exemplo</strong>
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam
              </p>
              <span>
                <strong>R$ 12,40</strong>
              </span>
            </div>
          </li>
          <li>
            <div className="cardItem">
              <img
                src="https://img.cybercook.com.br/receitas/845/coxinha-de-soja-1-623x350.jpeg"
                alt="item"
              />
              <p>
                <strong>Título exemplo</strong>
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam
              </p>
              <span>
                <strong>R$ 12,40</strong>
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
