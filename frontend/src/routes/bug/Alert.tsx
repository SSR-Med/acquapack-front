// Css 
import "/src/static/css/bug/Alert.css"
// Dependencies
import {Button,
    FormControl, Select, InputLabel, MenuItem } from "@mui/material"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import "dayjs/locale/es";
import { useState, useEffect } from "react";
import dayjs, {Dayjs} from "dayjs";
import { LocalizationProvider, DatePicker, TimePicker } from "@mui/x-date-pickers";
// Helpers
import { getDate } from "../../helpers/pipeline/GetDate";
import { getBugNames } from "../../helpers/bug/ModifyBug";
import { getMachineNames } from "../../helpers/bug/ModifyMachine";
import { createAlert } from "../../helpers/bug/ModifyAlert";
// Components
import MenuComponent from "../../components/MenuComponent";
// Styles
import { selectFieldAlert, buttonAlert } from "../../styles/AlertStyle";


export default function Alert(){
    // Values
    const [date, setDate] = useState<Dayjs|null>(dayjs())
    const [time, setTime] = useState<Dayjs|null>(dayjs())
    const [bug,setBug] = useState<string>("")
    const [machine,setMachine] = useState<string>("")
    // Machines and bugs
    const [bugName, setBugName] = useState<Set<string>>(new Set())
    const [machineName, setMachineName] = useState<Set<string>>(new Set())
    // Set date at start
    useEffect(() => {
        getDate().then((date) => {
            setDate(dayjs(date))
            setTime(dayjs(date))
        });
        // Bug names
        getBugNames().then((bugs: Set<string> | undefined) => {
            if (bugs) {
                setBugName(bugs);
            }
        });
        getMachineNames().then((machines: Set<string> | undefined) => {
            if (machines) {
                setMachineName(machines);
            }
        })
    },[])
    return(
        <div className="alert-container">
            <MenuComponent/>
            <main>
                <div className="alert-element">
                    <div className="alert-inside">
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                            <DatePicker
                                sx = {selectFieldAlert}
                                label="Fecha"
                                value={date}
                                onChange={(value) => setDate(value)}
                            />
                            <TimePicker
                                sx = {selectFieldAlert}
                                label="Hora"
                                value={time}
                                onChange={(value) => setTime(value)}
                            />
                        </LocalizationProvider>
                        <FormControl fullWidth>
                            <InputLabel>Máquina</InputLabel>
                            <Select
                                sx = {selectFieldAlert}
                                value={machine}
                                onChange={(event) => setMachine(event.target.value as string)}
                            >
                                {[...machineName].map((machineName: string) => (
                                    <MenuItem key={machineName} value={machineName}>{machineName}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel >Fallo</InputLabel>
                            <Select
                                sx = {selectFieldAlert}
                                value={bug}
                                onChange={(event) => setBug(event.target.value as string)}
                            >
                                {[...bugName].map((bugName: string) => (
                                    <MenuItem key={bugName} value={bugName}>{bugName}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <div className="alert-button">
                            <Button sx={buttonAlert} variant="contained" onClick={
                                async () => {
                                    createAlert({
                                        bug: bug,
                                        machine:machine,
                                        date: date?.format("YYYY-MM-DD")+" "+time?.format("HH:mm:ss"),
                                    })
                                }
                            }>Enviar</Button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )

}