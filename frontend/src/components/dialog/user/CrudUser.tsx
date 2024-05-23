// Dependencies
import { Dialog, DialogContent, DialogTitle,DialogActions,
    TextField, Button, 
    FormControl, Select, InputLabel, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
// Styles
import { crudDialogButton,crudDialogSelectField,crudDialogTextField } from "../../../styles/CrudStyle";
// Constants
import { abrev2DocumentType,documentType2Abrev, string2State,spanishRole2English } from "../../../constants/Constants";
// Helpers
import { HandleNumberChange, handlePasswordChange, HandleWordChange } from "../../../helpers/HandleTextFieldChange";
import { createUser, modifyUser, } from "../../../helpers/user/ModifyUser";

export default function crudUser(open:boolean,setOpen:React.Dispatch<React.SetStateAction<boolean>>,
    modifyRow:Record<string,any>|null, request: string
){
    // Variables
    // Title & Button
    const title = request == "POST" ? "Crear usuario": "Modificar usuario"
    // States
    const [documentType, setDocumentType] = useState<string>("")
    const [document, setDocument] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [active, setActive] = useState<string>("")
    const [role, setRole] = useState<string>("")
    // Change value of states if request is PUT
    useEffect(() => {
        if (request === "PUT"){
            if(modifyRow != null){
                // Set values
                setDocumentType(documentType2Abrev[modifyRow.document_type])
                setDocument(modifyRow.document)
                setName(modifyRow.name)
                setPassword(modifyRow.password)
                setActive(string2State[modifyRow.active])
                setRole(spanishRole2English[modifyRow.role])
            }
            else{
                setOpen(false)
                Swal.fire({
                    title: "Error",
                    text: "No se ha seleccionado un usuario",
                    icon: "error",
                    confirmButtonText: "Aceptar"
                })
            }
        }
        else{
            setDocumentType("")
            setDocument("")
            setName("")
            setPassword("")
            setActive("true")
            setRole("")
        }
    },[open])
    return (
        <Dialog
        open={open}
        onClose={() => setOpen(false)}>
            <DialogTitle>{title}</DialogTitle>
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
                value={document}
                onChange={HandleNumberChange(setDocument)}
                variant="filled" label="Documento" sx={crudDialogTextField}/>
                <TextField
                fullWidth
                value={name}
                onChange={HandleWordChange(setName)}
                variant="filled" label="Nombre" sx={crudDialogTextField}/>
                <TextField
                fullWidth
                value={password}
                onChange={handlePasswordChange(setPassword)}
                variant="filled" label="Contraseña" type="password" sx={crudDialogTextField}/>
                <FormControl fullWidth sx={crudDialogSelectField}>
                    <InputLabel>Estado</InputLabel>
                    <Select 
                     value={active}
                     label="Estado"
                     onChange={(e) => setActive(e.target.value)}>
                        <MenuItem value={"true"}>Activo</MenuItem>
                        <MenuItem value={"false"}>Inactivo</MenuItem>
                     </Select>
                </FormControl>
                <FormControl fullWidth sx={crudDialogSelectField}>
                    <InputLabel>Rol</InputLabel>
                    <Select 
                     value={role}
                     label="Rol"
                     onChange={(e) => setRole(e.target.value as string)}>
                        <MenuItem value={"superadmin"}>Superadmin</MenuItem>
                        <MenuItem value={"admin"}>Administrador</MenuItem>
                        <MenuItem value={"user"}>Usuario</MenuItem>
                     </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" sx={crudDialogButton} onClick={() => setOpen(false)}>Cancelar</Button>
                <Button variant="contained" sx={crudDialogButton}
                    onClick={() => {
                        const requestData = {
                            document_type: documentType,
                            document: parseInt(document),
                            name: name,
                            password: password,
                            active: active === "true" ? true : false,
                            role: role
                        };
                        if (modifyRow != null && request === "PUT") {
                            modifyUser({...requestData, id: modifyRow.id});
                        } else {
                            createUser(requestData);
                        }
                    }}>{title}</Button>
            </DialogActions>
        </Dialog>   
    )
}