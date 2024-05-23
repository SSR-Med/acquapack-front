// Dependencies
// import axios from "axios";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);
// Constants
import { months } from "../../constants/Constants";

export async function getDate(){
    /*
    const response = await axios.get("http://worldtimeapi.org/api/timezone/America/Bogota")
    const date = new Date(response.data.unixtime * 1000)
    */
    return new Date();
}

export async function formatDate2Csv(csvName:string){
    let date = await getDate()
    const colombianDate = dayjs.utc(date).tz("America/Bogota")
    return `${colombianDate.format("YYYY-MM-DD")}_${csvName}`
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