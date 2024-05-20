// Dependencies
import axios from "axios";
import Cookies from "js-cookie";
// Constants
import { API_URL } from "../../constants/Constants";

export async function checkAdmin(){
    try{
        const response = await axios.get(`${API_URL}/admin/check_admin`,{
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        })
        return response.data.admin
    }catch(error){
        return false
    }
}