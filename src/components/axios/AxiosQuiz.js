import Axios from "axios";

export default Axios.create({
    baseURL: 'https://react-testas.firebaseio.com/'
})