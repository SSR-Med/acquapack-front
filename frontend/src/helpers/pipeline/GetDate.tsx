// Dependencies
import axios from "axios";
// Constants
import { months } from "../../constants/Constants";

export async function getDate(){
    const response = await axios.get("http://worldtimeapi.org/api/timezone/America/Bogota")
    const date = new Date(response.data.unixtime * 1000)
    return date;
}


export async function transformDate(){
    const dateRecord = await getDate()
    const formatMonth = months[(dateRecord.getMonth()+1).toString()]
    const hours = dateRecord.getHours().toString().padStart(2, '0');
    const minutes = dateRecord.getMinutes().toString().padStart(2, '0');
    const seconds = dateRecord.getSeconds().toString().padStart(2, '0');
    const time = `${hours}:${minutes}:${seconds}`;
    return `${dateRecord.getDate()} de ${formatMonth} del ${dateRecord.getFullYear()}. Hora: ${time}`
}