// Dependencies
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { NavigateFunction } from "react-router-dom";
// Constants
import { API_URL } from "../../constants/Constants";
// Schemas
import { PipelineSchema } from "../../schemas/PipelineSchema";

export async function createPipelineRecord(PipelineSchema: PipelineSchema,navigate:NavigateFunction){
    try{
        await axios.post(`${API_URL}/record`, PipelineSchema, {
            headers: {
                "Authorization": `Bearer ${Cookies.get("token")}`
            }
        })
        Swal.fire({
            icon: 'success',
            title: '¡Registro creado!',
            didClose: () => {
                navigate("/brcode")
            }
        })
    }catch(error){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al crear el registro de la tubería',
        })
    }
}