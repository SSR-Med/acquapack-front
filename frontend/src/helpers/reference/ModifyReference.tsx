// Dependencies
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { GridColDef } from "@mui/x-data-grid";
// Constants
import { API_URL } from "../../constants/Constants";

export const columnsReference: GridColDef[] = [
    {
        field: "id",
        headerName: "ID",
        flex: 1
    },
    {
        field: "id_number",
        headerName: "Código de barras",
        flex: 1
    },
    {
        field: "name",
        headerName: "Nombre",
        flex: 1
    },
]

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

export async function createReference(data:Record<string,any>){
    try{
        await axios.post(`${API_URL}/reference`,data,{
            headers: {
                "Authorization": `Bearer ${Cookies.get("token")}`
            }
        })
        Swal.fire({
            title: "Exito",
            text: "Referencia creada",
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

export async function modifyReference(data:Record<string,any>){
    try{
        await axios.put(`${API_URL}/reference/id/${data.id}`,data,{
            headers: {
                "Authorization": `Bearer ${Cookies.get("token")}`
            }
        })
        Swal.fire({
            title: "Exito",
            text: "Referencia modificada",
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

export async function deleteReference(id:number){
    try{
        await axios.delete(`${API_URL}/reference/id/${id}`,{
            headers: {
                "Authorization": `Bearer ${Cookies.get("token")}`
            }
        })
        Swal.fire({
            title: "Exito",
            text: "Referencia eliminada",
            icon: "success"
        })
    }catch(error){
        Swal.fire({
            title: "Error",
            text: "No se pudo eliminar la referencia",
            icon: "error",
            confirmButtonText: "Aceptar"
        })
    }
}