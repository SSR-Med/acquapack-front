// Dependencies
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
// Constants
import { API_URL, abrev2DocumentType, state2String, englishRole2Spanish } from "../../constants/Constants";

async function getUsers(){
    const users = axios.get(`${API_URL}/admin`,{
        headers: {
            Authorization: `Bearer ${Cookies.get("token")}`
        }
    })
    return users
}

export async function getAndTransformUsers(){
    const users = await getUsers()
    const usersData = users.data.map((user: any) => {
        return {
            ...user,
            role: englishRole2Spanish[user.role.toString()],
            active: state2String[user.active.toString()],
            document_type: abrev2DocumentType[user.document_type]
        }
    })
    return usersData
}

export async function createUser(data: Record<string,any>){
    try{
        await axios.post(`${API_URL}/admin`,data,{
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        })
        Swal.fire({
            title: "Usuario creado",
            icon: "success",
            text: "El usuario ha sido creado exitosamente"
        })
    }
    catch(error:any){
        Swal.fire({
            title: "Error",
            icon: "error",
            text: error.response.data.message
        })
    }
}

export async function modifyUser(data: Record<string,any>){
    try{
        await axios.put(`${API_URL}/admin/id/${data.id}`,data,{
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        })
        Swal.fire({
            title: "Usuario modificado",
            icon: "success",
            text: "El usuario ha sido modificado exitosamente"
        })
    }
    catch(error:any){
        Swal.fire({
            title: "Error",
            icon: "error",
            text: error.response.data.message
        })
    }
}