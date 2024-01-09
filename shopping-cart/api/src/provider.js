import axios from "axios";

export const api = axios.create({
  baseURL: "https://crudcrud.com/api/4f389bb3bfb14928a2cd7c1853611777",
  timeout: 10000,
});
