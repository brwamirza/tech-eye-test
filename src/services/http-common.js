import axios from "axios";
export default axios.create({
  baseURL: "https://fronttask.techeyeco.com",
  headers: {
    "Content-type": "application/json"
  }
});