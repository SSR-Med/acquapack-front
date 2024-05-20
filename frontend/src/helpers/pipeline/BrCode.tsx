// Dependencies
import axios from "axios";
import Swal from "sweetalert2";
import { NavigateFunction } from "react-router-dom";
import Cookies from "js-cookie";
// Constants
import { API_URL } from "../../constants/Constants";

async function searhBrCode(brCode:string){
    try{
        const response = await axios.get(`${API_URL}/reference/id_number/${brCode}`,{
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        })
        return response.data.name
    }
    catch(error){
        throw new Error("Error al buscar la referencia")
    }
}

export async function sendPipelineInfo(brCode:string,navigate: NavigateFunction){
    try{
        const name = await searhBrCode(brCode)
        navigate({
            pathname: "/pipelineinfo",
            search: `?reference=${name}`
        })
    }
    catch{
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al buscar la referencia"
        })
    }
}