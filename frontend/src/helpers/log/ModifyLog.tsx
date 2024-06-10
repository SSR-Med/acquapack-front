// Dependencies
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
// Constants
import { API_URL } from "../../constants/Constants";

export async function getLog(){
    try{
        const logs = await axios.get(`${API_URL}/log`,{
            headers: {
                'Authorization': `Bearer ${Cookies.get("token")}`
            }
        })
        console.log(logs.data.message)
        return logs.data.message
    }catch(error:any){
        Swal.fire({
            icon: "error",
            title: "Error",
            text: error.response.data.message
        })
    }
}

export async function downloadLog(){
    try{
        const logs = await axios.get(`${API_URL}/log/csv`,{
            headers: {
                "Authorization" : `Bearer ${Cookies.get("token")}`
            }
        })
        const url = window.URL.createObjectURL(new Blob([logs.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'log.csv');
        document.body.appendChild(link);
        link.click();
    }catch(error:any){
        Swal.fire({
            icon: "error",
            title: "Error",
            text: error.response.data.message
        })
    }
}