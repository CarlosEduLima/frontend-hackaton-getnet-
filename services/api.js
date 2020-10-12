import axios from "axios";

const heroku_enviroment = "https://pricebuddytcc.herokuapp.com";
const local_enviroment = "http://localhost:8080";

const test_on_local = false;

const api = axios.create({
    baseURL: test_on_local ? local_enviroment : heroku_enviroment,
});


api.setAuthToken = (token) => {
    console.log('mamaeu', token)
    api.defaults.headers.common["Authorization"] = "Bearer " + token;
};

export default api;