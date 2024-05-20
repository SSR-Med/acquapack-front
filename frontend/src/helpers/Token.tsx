// Dependencies
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { NavigateFunction } from "react-router-dom";
// Constants
import { API_URL } from "../constants/Constants";

export async function refreshToken(navigate:NavigateFunction){
    try{
        const response = await axios.get(`${API_URL}/token`,{
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        })
        Cookies.set("token", response.data.token)
    }catch(error){
        Cookies.remove("token")
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Sesión expirada"
        })
        navigate("/")
    }
}