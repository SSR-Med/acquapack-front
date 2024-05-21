// Dependencies
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
// Constants
import { API_URL } from "../../constants/Constants";

export async function changeState(id:Number){
    try{
        await axios.patch(`${API_URL}/admin/id/${id}`,{}, {
            headers: {
                "Authorization": `Bearer ${Cookies.get("token")}`
            }
        })
        Swal.fire({
            title: '¡Exito!',
            text: 'Se ha cambiado el estado con exito',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        })
    }catch(error){
        Swal.fire({
            title: '¡Error!',
            text: 'Ha ocurrido un error al cambiar de estado ',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        })
    }
}
