import { Dialog, DialogContent, DialogTitle,DialogActions,
    TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
// Styles
import { crudDialogButton,crudDialogTextField } from "../../../styles/CrudStyle";
// Helpers
import { HandleNumberChange } from "../../../helpers/HandleTextFieldChange";
import { createReference, modifyReference } from "../../../helpers/reference/ModifyReference";

export default function crudReference(open:boolean,setOpen:React.Dispatch<React.SetStateAction<boolean>>,
    modifyRow: Record<string,any>|null, request: string
){
    // Variables
    const title = request == "POST" ? "Crear referencia": "Modificar referencia"
    // States
    const [idNumber, setIdNumber] = useState<string>("")
    const [name, setName] = useState<string>("")
    // Change value of states if request is PUT
    useEffect(() => {
        if (request === "PUT"){
            if(modifyRow != null){
                setIdNumber(modifyRow.id_number)
                setName(modifyRow.name)
            }
            else{
                setOpen(false)
                Swal.fire({
                    title: "Error",
                    text: "No se ha seleccionado una referencia",
                    icon: "error",
                    confirmButtonText: "Aceptar"
                })
            }
        }
        else{
            setIdNumber("")
            setName("")
        }
    },[open])
    return(
        <Dialog
        open={open}
        onClose={() => setOpen(false)}
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <TextField
                fullWidth
                label="Código de barras"
                variant="outlined"
                value={idNumber}
                onChange={HandleNumberChange(setIdNumber)}
                sx={crudDialogTextField}
                />
                <TextField
                fullWidth
                label="Nombre"
                variant="outlined"
                value={name}
                onChange={e => setName(e.target.value)}
                sx={crudDialogTextField}
                />
            </DialogContent>
            <DialogActions>
                <Button
                variant="contained"
                sx={crudDialogButton}
                onClick={() => {
                    const requestData = {
                        id_number: Number(idNumber),
                        name: name
                    }
                    if (request === "POST"){
                        createReference(requestData)
                    }
                    else{
                        modifyReference({
                            ...requestData,
                            id: modifyRow?.id
                    })
                    }
                }}
                >
                    {request === "POST" ? "Crear": "Modificar"}
                </Button>
                <Button
                variant="contained"
                sx={crudDialogButton}
                onClick={() => setOpen(false)}
                >
                    Cancelar
                </Button>
            </DialogActions>
        </Dialog>
    )
}