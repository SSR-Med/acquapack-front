// Dependencies
import {FormControl, InputLabel, MenuItem, Select} from '@mui/material';
import dayjs from 'dayjs';
// Styles
import { selectFieldStyle } from '../../../styles/TableStyle';
// Helpers
import { getDate } from '../../../helpers/pipeline/GetDate';

export function selectTime(selectDate:string, setSelectDate:React.Dispatch<React.SetStateAction<string>>){
    return (
    <FormControl sx={{...selectFieldStyle,marginBottom:"2vh"}}>
        <InputLabel>Filtrar por fecha...</InputLabel>
        <Select
            value={selectDate}
            onChange={(e) => setSelectDate(e.target.value)}
        >
            <MenuItem value="all">Todo</MenuItem>
            <MenuItem value="today">Hoy</MenuItem>
            <MenuItem value="week">Esta semana</MenuItem>
            <MenuItem value="month">Este mes</MenuItem>
            <MenuItem value="year">Este año</MenuItem>
            <MenuItem value="day">Horario diurno</MenuItem>
            <MenuItem value="evening">Horario nocturno</MenuItem>
        </Select>
    </FormControl>)
}

function dayRows(otherDate:Date){
    return dayjs(otherDate).hour() >= 6 && dayjs(otherDate).hour() < 18
}

function eveningRows(otherDate:Date){
    return dayjs(otherDate).hour() >= 18 || dayjs(otherDate).hour() < 6
}

export async function filterRowsByTime(rows:Array<Record<string,any>>,selectDate:string){
    const todayDate = await getDate()
    switch (selectDate){
        case "all":
            return rows
        case "today":
            return rows.filter((row) => {
                const dateRecord = new Date(row.date)
                return dayjs(dateRecord).isSame(todayDate,'day')
            })
        case "week":
            return rows.filter((row) => {
                const dateRecord = new Date(row.date)
                return dayjs(dateRecord).isSame(todayDate,'week')
            })
        case "month":
            return rows.filter((row) => {
                const dateRecord = new Date(row.date)
                return dayjs(dateRecord).isSame(todayDate,'month')
            })
        case "year":
            return rows.filter((row) => {
                const dateRecord = new Date(row.date)
                return dayjs(dateRecord).isSame(todayDate,'year')
            })
        case "day":
            return rows.filter((row) => {
                const dateRecord = new Date(row.date)
                return dayRows(dateRecord)
            })
        case "evening":
            return rows.filter((row) => {
                const dateRecord = new Date(row.date)
                return eveningRows(dateRecord)
            })
        default:
            return rows
        
    }
}