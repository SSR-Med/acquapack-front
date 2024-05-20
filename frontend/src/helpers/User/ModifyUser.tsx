// Dependencies
import axios from "axios";
import Cookies from "js-cookie";
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