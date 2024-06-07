import { Dialog, DialogContent, DialogTitle,DialogActions,
    TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
// Styles
import { crudDialogButton,crudDialogTextField } from "../../../styles/CrudStyle";
// Helpers
import { createBug, modifyBug } from "../../../helpers/bug/ModifyBug";

export default function crudBug(open:boolean,setOpen:React.Dispatch<React.SetStateAction<boolean>>,
    modifyRow: Record<string,any>|null, request: string
){
    // Variables
    const title = request == "POST" ? "Crear fallo": "Modificar fallos"
    // State
    const [name, setName] = useState<string>("")
    // Change value of states if request is PUT
    useEffect(() => {
        if (request === "PUT"){
            if(modifyRow != null){
                setName(modifyRow.name)
            }
            else{
                setOpen(false)
                Swal.fire({
                    title: "Error",
                    text: "No se ha seleccionado un fallo",
                    icon: "error",
                    confirmButtonText: "Aceptar"
                })
            }
        }
        else{
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
                        name: name
                    }
                    if (request === "POST"){
                        createBug(requestData)
                    }
                    else{
                        modifyBug({
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