// Dependencies
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);
// Constants
import { API_URL, abrev2DocumentType } from "../../constants/Constants";

export const columnsRecord: GridColDef[] = [
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
        field: "reference",
        headerName: "Referencia",
        flex: 1
    },
    {
        field: "date",
        headerName: "Fecha",
        flex: 1
    },
    {
        field: "weight",
        headerName: "Peso",
        flex: 1
    },
    {
        field: "large",
        headerName: "Largo",
        flex: 1
    }
]


async function getRecords(){
    const records = await axios.get(`${API_URL}/record`,{
        headers: {
            Authorization: `Bearer ${Cookies.get("token")}`
        }
    })
    return records
}

export async function getAndTransformRecords(){
    const records = await getRecords()
    let colombiaDate;
    const recordsData = records.data.map((record: any) => {
        colombiaDate = dayjs.utc(record.date).tz("America/Bogota")
        return {
            ...record,
            document_type: abrev2DocumentType[record.document_type],
            date: colombiaDate.format()
        }
    })
    return recordsData
}
export async function deleteRecord(id: number){ 
    try{
        const response = await axios.delete(`${API_URL}/record/id/${id}`,{
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        })
        Swal.fire({
            title: "Éxito",
            text: "Registro eliminado",
            icon: "success"
        })
    }
    catch(error){
        Swal.fire({
            title: "Error",
            text: "No se pudo eliminar el registro",
            icon: "error"
        })
    }
}