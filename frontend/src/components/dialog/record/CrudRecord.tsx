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
import { HandleDecimalChange, HandleNumberChange} from "../../../helpers/HandleTextFieldChange";
import { getReferencesNames } from "../../../helpers/reference/ModifyReference";
import { getDate } from "../../../helpers/pipeline/GetDate";
import { modifyPutRecord } from "../../../helpers/record/ModifyRecord";

export default function crudRecord(open:boolean,setOpen:React.Dispatch<React.SetStateAction<boolean>>,
    record:Record<string,any>|null
){
    // Variables
    const [documentType, setDocumentType] = useState<string>("")
    const [document, setDocument] = useState<string>("")
    const [reference, setReference] = useState<string>("")
    const [date, setDate] = useState<Dayjs|null>(dayjs())
    const [time, setTime] = useState<Dayjs|null>(dayjs())
    const [weight, setWeight] = useState<string>("")
    const [large, setLarge] = useState<string>("")
    // Set reference names at start for the select
    const [referenceNames, setReferenceNames] = useState<Set<string>>(new Set())
    // Set max date
    const [maxDate, setMaxDate] = useState<Dayjs>(dayjs())
    // Set variables at start
    useEffect(() => {
        if(open === true){
            if (record != null){
                // User data
                setDocumentType(documentType2Abrev[record.document_type])
                setDocument(record.document)
                // Reference
                setReference(record.reference)
                // Date and time
                setDate(dayjs(record.date))
                setTime(dayjs(record.date))
                // Weight and large
                setWeight(record.weight)
                setLarge(record.large)
                // Set references names for the select value
                getReferencesNames().then((references: Set<string> | undefined) => {
                    if (references) {
                        setReferenceNames(new Set([...references, record.reference]));
                    }
                });
                // Set max date for the date selector
                getDate().then((date) => {
                    setMaxDate(dayjs(date))
                });
            }
            else{
                setOpen(false)
                Swal.fire({
                    title: "Error",
                    text: "No se ha seleccionado un registro",
                    icon: "error",
                    confirmButtonText: "Aceptar"
                })
            }
        }
        
    },[open])
    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Modificar registro</DialogTitle>
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
                <FormControl fullWidth sx={crudDialogSelectField}>
                    <InputLabel>Referencia</InputLabel>
                    <Select 
                     value={reference}
                     label="Referencia"
                     onChange={(e) => setReference(e.target.value as string)}>
                        {
                            Array.from(referenceNames).map((reference) => (
                                <MenuItem key={reference} value={reference}>{reference}</MenuItem>
                            ))
                        }
                     </Select>
                </FormControl>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                    <DatePicker
                        sx = {{...crudDialogSelectField,width:"100%"}}
                        label="Fecha"
                        value={date}
                        onChange={(value) => setDate(value)}
                        maxDate={maxDate}
                    />
                    <TimePicker
                        sx = {{...crudDialogSelectField,width:"100%"}}
                        label="Hora"
                        value={time}
                        onChange={(value) => setTime(value)}
                    >

                    </TimePicker>
                </LocalizationProvider>
                <TextField
                    fullWidth
                    variant="filled"
                    sx = {crudDialogTextField}
                    label="Peso"
                    value={weight}
                    onChange={HandleDecimalChange(setWeight)}
                />
                <TextField
                    fullWidth
                    variant="filled"
                    sx = {crudDialogTextField}
                    label="Largo"
                    value={large}
                    onChange={HandleDecimalChange(setLarge)}
                />

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
                        modifyPutRecord({
                            id: record?.id,
                            document_type: documentType,
                            document: Number(document),
                            reference: reference,
                            date: date?.format("YYYY-MM-DD")+" "+time?.format("HH:mm:ss"),
                            weight: parseFloat(weight),
                            large: parseFloat(large)
                        })
                    }}
                >
                    Modificar
                </Button>
            </DialogActions>
        </Dialog>
    )
}