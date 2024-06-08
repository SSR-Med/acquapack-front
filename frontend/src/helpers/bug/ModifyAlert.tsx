// Dependencies
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
// Constants
import { API_URL, abrev2DocumentType } from "../../constants/Constants";

export const columnsAlert: GridColDef[] = [
    {
        field: "id",
        headerName: "ID",
        flex: 1
    },
    {
        field: "document_type",
        headerName: "Tipo Documento",
        flex: 1
    },
    {
        field: "document",
        headerName: "Documento",
        flex: 1
    },
    {
        field: "name",
        headerName: "Nombre",
        flex: 1
    },
    {
        field: "bug",
        headerName: "Fallo",
        flex: 1
    },
    {
        field: "machine",
        headerName: "Máquina",
        flex: 1
    },
    {
        field: "date",
        headerName: "Fecha",
        flex: 1
    }
]

async function getAlerts(){
    try{
        const alerts = await axios.get(`${API_URL}/alert/`,{
            headers: {
                "Authorization": `Bearer ${Cookies.get("token")}`
            }
        })
        return alerts
    }catch(error){
        throw new Error("No se pudieron obtener las alarmas")
    }
}

export async function getAndTransformAlerts(){
    try{
        const alerts = await getAlerts()
        let colombianDate;
        const transformedAlerts = alerts.data.map((alert:any) => {
            colombianDate = dayjs.utc(alert.date).tz("America/Bogota")
            return {
                ...alert,
                document_type: abrev2DocumentType[alert.document_type],
                date: colombianDate.format()
            }
        })
        return transformedAlerts
    }catch(error:any){
        Swal.fire({
            title: "Error",
            text: error.response.data.message,
            icon: "error",
            confirmButtonText: "Aceptar"
        })
    }
}

export async function modifyAlert(row:Record<string,any>){
    try{
        await axios.put(`${API_URL}/alert/${row.id}`,row,{
            headers: {
                "Authorization": `Bearer ${Cookies.get("token")}`
            }
        })
        Swal.fire({
            title: "Éxito",
            text: "Alarma modificada",
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

export async function deleteAlert(id:number){
    try{
        await axios.delete(`${API_URL}/alert/${id}`,{
            headers: {
                "Authorization": `Bearer ${Cookies.get("token")}`
            }
        })
        Swal.fire({
            title: "Éxito",
            text: "Alarma eliminada",
            icon: "success",
            confirmButtonText: "Aceptar"
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

export async function createAlert(data:Record<string,any>){
    try{
        await axios.post(`${API_URL}/alert/`,data,{
            headers:{
                "Authorization": `Bearer ${Cookies.get("token")}`
            }
        })
        Swal.fire({
            title: "Éxito",
            text: "Alarma creada",
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