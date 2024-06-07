// Dependencies
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { GridColDef } from "@mui/x-data-grid";
// Constants
import { API_URL } from "../../constants/Constants";

export const columnsMachine: GridColDef[] = [
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

export async function getMachines(){
    try{
        const response = await axios.get(`${API_URL}/machine/`,{
            headers: {
                "Authorization": `Bearer ${Cookies.get("token")}`
            }
        })
        return response.data
    }
    catch(error){
        Swal.fire({
            title: "Error",
            text: "No se pudieron obtener las máquinas",
            icon: "error",
            confirmButtonText: "Aceptar"
        })
    }
}

export async function deleteMachine(id:number){
    try{
        await axios.delete(`${API_URL}/machine/${id}`,{
            headers: {
                "Authorization": `Bearer ${Cookies.get("token")}`
            }
        })
        Swal.fire({
            title: "Éxito",
            text: "Máquina eliminada",
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

export async function createMachine(data:Record<string,any>){
    try{
        await axios.post(`${API_URL}/machine/`,data,{
            headers: {
                "Authorization": `Bearer ${Cookies.get("token")}`
            }
        })
        Swal.fire({
            title: "Éxito",
            text: "Máquina creada",
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

export async function modifyMachine(data:Record<string,any>){
    try{
        await axios.put(`${API_URL}/machine/${data.id}`,data,{
            headers: {
                "Authorization": `Bearer ${Cookies.get("token")}`
            }
        })
        Swal.fire({
            title: "Éxito",
            text: "Máquina modificado",
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