// Dependencies
import Cookies from "js-cookie"
import Swal from "sweetalert2"
import axios from "axios"
import { NavigateFunction } from "react-router-dom"
// Schemas
import { loginSchema } from "../../schemas/UserSchema"
// Constants
import { API_URL } from "../../constants/Constants"

export async function loginCookie(loginSchema: loginSchema,navigate:NavigateFunction){
    try{
        const response = await axios.post(`${API_URL}/login`, loginSchema)
        Cookies.set("token", response.data.token)
        navigate("/br_code")
    }catch(error:any){
        Swal.fire({
            icon: "error",
            title: "Error",
            text: error.response.data.message
        })
    }
}