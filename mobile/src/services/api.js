import axios from "axios";

const api = axios.create({
  baseURL: "https://batata-e-cia.herokuapp.com/",
});

export default api;
