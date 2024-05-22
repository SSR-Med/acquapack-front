// Dependencies
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
// Constants
import { API_URL } from "../../constants/Constants";

export async function getReferences(){
    try{
        const response = await axios.get(`${API_URL}/reference/`,{
            headers: {
                "Authorization": `Bearer ${Cookies.get("token")}`
            }
        })
        return response.data
    }
    catch(error){
        Swal.fire({
            title: "Error",
            text: "No se pudieron obtener las referencias",
            icon: "error",
            confirmButtonText: "Aceptar"
        })
    }
}

export async function getReferencesNames(){
    try{
        const references = await getReferences()
        const names: Set<string> = new Set(references.map((reference:Record<string,any>) => reference.name))
        return names
    }catch(error){
        Swal.fire({
            title: "Error",
            text: "No se pudieron obtener las referencias",
            icon: "error",
            confirmButtonText: "Aceptar"
        })
    }
}