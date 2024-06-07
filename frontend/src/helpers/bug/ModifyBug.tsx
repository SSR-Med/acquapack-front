// Dependencies
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { GridColDef } from "@mui/x-data-grid";
// Constants
import { API_URL } from "../../constants/Constants";

export const columnsBug: GridColDef[] = [
    {
        field: "id",
        headerName: "ID",
        flex: 1
    },
    {
        field: "name",
        headerName: "Nombre",
        flex: 1
    }
]

export async function getBugs(){
    try{
        const response = await axios.get(`${API_URL}/bug/`,{
            headers: {
                "Authorization": `Bearer ${Cookies.get("token")}`
            }
        })
        return response.data
    }
    catch(error){
        Swal.fire({
            title: "Error",
            text: "No se pudieron obtener los fallos",
            icon: "error",
            confirmButtonText: "Aceptar"
        })
    }
}

export async function deleteBug(id:number){
    try{
        await axios.delete(`${API_URL}/bug/${id}`,{
            headers: {
                "Authorization": `Bearer ${Cookies.get("token")}`
            }
        })
        Swal.fire({
            title: "Éxito",
            text: "Fallo eliminado",
            icon: "success",
            confirmButtonText: "Aceptar"
        })
    }
    catch(error:any){
        Swal.fire({
            title: "Error",
            text: error.response.data.message,
            icon: "error",
            confirmButtonText: "Aceptar"
        })
    }
}

export async function createBug(data:Record<string,any>){
    try{
        await axios.post(`${API_URL}/bug/`,data,{
            headers: {
                "Authorization": `Bearer ${Cookies.get("token")}`
            }
        })
        Swal.fire({
            title: "Éxito",
            text: "Fallo creado",
            icon: "success"
        
        })
    }catch(error:any){
        Swal.fire({
            title: "Error",
            text: error.response.data.message,
            icon: "error",
            confirmButtonText: "Aceptar"
        })
    }
}

export async function modifyBug(data:Record<string,any>){
    try{
        await axios.put(`${API_URL}/bug/${data.id}`,data,{
            headers: {
                "Authorization": `Bearer ${Cookies.get("token")}`
            }
        })
        Swal.fire({
            title: "Éxito",
            text: "Fallo modificado",
            icon: "success"
        })
    }catch(error:any){
        Swal.fire({
            title: "Error",
            text: error.response.data.message,
            icon: "error",
            confirmButtonText: "Aceptar"
        })
    }
}