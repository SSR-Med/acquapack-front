// Dependencies
import { Dialog, DialogContent, DialogTitle,DialogActions,
    TextField, Button, 
    FormControl, Select, InputLabel, MenuItem } from "@mui/material";
import { LocalizationProvider, DatePicker, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import "dayjs/locale/es";
import { useState, useEffect } from "react";
import dayjs, {Dayjs} from "dayjs";
import Swal from "sweetalert2";
// Styles
import { crudDialogButton,crudDialogSelectField,crudDialogTextField } from "../../../styles/CrudStyle";
// Constants
import { abrev2DocumentType,documentType2Abrev } from "../../../constants/Constants";
// Helpers
import { HandleNumberChange} from "../../../helpers/HandleTextFieldChange";
import { getMachineNames } from "../../../helpers/bug/ModifyMachine";
import { getBugNames } from "../../../helpers/bug/ModifyBug";
import { modifyAlert } from "../../../helpers/bug/ModifyAlert";

export default function crudAlert(open:boolean,setOpen:React.Dispatch<React.SetStateAction<boolean>>,
    alert:Record<string,any>|null
){
    // Variables
    const [documentType, setDocumentType] = useState<string>("")
    const [document, setDocument] = useState<string>("")
    const [date, setDate] = useState<Dayjs|null>(dayjs())
    const [time, setTime] = useState<Dayjs|null>(dayjs())
    const [machine, setMachine] = useState<string>("")
    const [bug, setBug] = useState<string>("")
    // Set machine names and bug names
    const [machineName, setMachineName] = useState<Set<string>>(new Set())
    const [bugName, setBugName] = useState<Set<string>>(new Set())
    // Set variables at start
    useEffect(() => {
        if(open === true){
            if (alert != null){
                // User data
                setDocumentType(documentType2Abrev[alert.document_type])
                setDocument(alert.document)
                // Date and time
                setDate(dayjs(alert.date))
                setTime(dayjs(alert.date))
                // Machine and bug
                setMachine(alert.machine)
                setBug(alert.bug)
                // Machine names and bug names
                getMachineNames().then((machines: Set<string> | undefined) => {
                    if (machines) {
                        setMachineName(machines);
                    }
                });
                getBugNames().then((bugs: Set<string> | undefined) => {
                    if (bugs) {
                        setBugName(bugs);
                    }
                });
            }
            else{
                setOpen(false)
                Swal.fire({
                    title: "Error",
                    text: "No se ha seleccionado una alarma",
                    icon: "error",
                    confirmButtonText: "Aceptar"
                })
            }
        }
        
    },[open])
    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Modificar alarma</DialogTitle>
            <DialogContent>
                <FormControl fullWidth sx={crudDialogSelectField}>
                    <InputLabel>Tipo de documento</InputLabel>
                    <Select 
                     value={documentType}
                     label="Tipo de documento"
                     onChange={(e) => setDocumentType(e.target.value as string)}>
                        {
                            Object.entries(abrev2DocumentType).map(([key, value]) => (
                                <MenuItem key={key} value={key}>{value}</MenuItem>
                            ))
                        }
                     </Select>
                </FormControl>
                <TextField
                    fullWidth
                    variant="filled"
                    sx = {crudDialogTextField}
                    label="Documento"
                    value={document}
                    onChange={HandleNumberChange(setDocument)}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                    <DatePicker
                        sx = {{...crudDialogSelectField,width:"100%"}}
                        label="Fecha"
                        value={date}
                        onChange={(value) => setDate(value)}
                    />
                    <TimePicker
                        sx = {{...crudDialogSelectField,width:"100%"}}
                        label="Hora"
                        value={time}
                        onChange={(value) => setTime(value)}
                    >
                    </TimePicker>
                </LocalizationProvider>
                <FormControl fullWidth sx={crudDialogSelectField}>
                    <InputLabel>Máquina</InputLabel>
                    <Select 
                     value={machine}
                     label="Máquina"
                     onChange={(e) => setMachine(e.target.value as string)}>
                        {[...machineName].map((machineName: string) => (
                                    <MenuItem key={machineName} value={machineName}>{machineName}</MenuItem>
                        ))}
                     </Select>
                </FormControl>
                <FormControl fullWidth sx={crudDialogSelectField}>
                    <InputLabel>Fallo</InputLabel>
                    <Select 
                     value={bug}
                     label="Fallo"
                     onChange={(e) => setBug(e.target.value as string)}>
                        {[...bugName].map((bugName: string) => (
                                    <MenuItem key={bugName} value={bugName}>{bugName}</MenuItem>
                        ))}
                     </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button
                    sx={crudDialogButton}
                    onClick={() => setOpen(false)}
                >
                    Cancelar
                </Button>
                <Button
                    sx = {crudDialogButton}
                    onClick={() =>{
                        modifyAlert({
                            document_type:documentType,
                            document:document,
                            date:date,
                            machine:machine,
                            bug:bug,
                            id:alert?.id
                        })
                    }}
                >
                    Modificar
                </Button>
            </DialogActions>
        </Dialog>
    )
}