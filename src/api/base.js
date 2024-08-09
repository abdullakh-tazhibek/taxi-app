import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3000/api/v1/",
});

{
  /* 
  baseURL: "http://192.168.8.1/",
  baseURL: "http://localhost:3000/api/v1/",
   */
}
