// Dependencies
import { Dialog, DialogContent, DialogTitle,DialogActions,
    TextField, Button, 
    FormControl, Select, InputLabel, MenuItem } from "@mui/material";
import { useState } from "react";
// Styles
import { crudDialogButton,crudDialogSelectField,crudDialogTextField } from "../../../styles/CrudStyle";
// Constants
import { abrev2DocumentType } from "../../../constants/Constants";
// Helpers
import { HandleNumberChange, handlePasswordChange } from "../../../helpers/HandleNumberChange";
import { createUser } from "../../../helpers/user/ModifyUser";

export default function crudUser(open:boolean,setOpen:React.Dispatch<React.SetStateAction<boolean>>,
    modifyRow?:Record<string,any>
){
    // Variables
    // Title & Button
    const title = typeof modifyRow === 'undefined'? "Crear usuario": "Modificar usuario"
    // States
    const [documentType, setDocumentType] = useState<string>("")
    const [document, setDocument] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [active, setActive] = useState<string>("")
    const [role, setRole] = useState<string>("")
    return (
        <Dialog
        open={open}
        onClose= {() => setOpen(false)}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <FormControl fullWidth sx={crudDialogSelectField}>
                    <InputLabel>Tipo de documento</InputLabel>
                    <Select 
                     value = {documentType}
                     label = "Tipo de documento"
                     onChange = {(e) => setDocumentType(e.target.value as string)}>
                        {
                            Object.keys(abrev2DocumentType).map((key) => {
                                return <MenuItem value={key}>{abrev2DocumentType[key]}</MenuItem>
                            })
                        }
                     </Select>
                </FormControl>
                <TextField 
                fullWidth
                value = {document}
                onChange={HandleNumberChange(setDocument)}
                variant="filled" label="Documento" sx={crudDialogTextField}/>
                <TextField
                fullWidth
                value= {name}
                onChange={(e) => setName(e.target.value)}
                variant="filled" label="Nombre" sx={crudDialogTextField}/>
                <TextField
                fullWidth
                value = {password}
                onChange={handlePasswordChange(setPassword)}
                variant="filled" label="Contraseña" type="password" sx={crudDialogTextField}/>
                <FormControl fullWidth sx={crudDialogSelectField}>
                    <InputLabel>Estado</InputLabel>
                    <Select 
                     value = {active}
                     label = "Estado"
                     onChange = {(e) => setActive(e.target.value)}>
                        <MenuItem value={"true"}>Activo</MenuItem>
                        <MenuItem value={"false"}>Inactivo</MenuItem>
                     </Select>
                </FormControl>
                <FormControl fullWidth sx={crudDialogSelectField}>
                    <InputLabel>Rol</InputLabel>
                    <Select 
                     value = {role}
                     label = "Rol"
                     onChange = {(e) => setRole(e.target.value as string)}>
                        <MenuItem value={"superadmin"}>Superadmin</MenuItem>
                        <MenuItem value={"admin"}>Administrador</MenuItem>
                        <MenuItem value={"user"}>Usuario</MenuItem>
                     </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" sx={crudDialogButton} onClick={() => setOpen(false)}>Cancelar</Button>
                <Button variant="contained" sx={crudDialogButton}
                onClick = {() => createUser({
                    document_type: documentType,
                    document: parseInt(document),
                    name: name,
                    password: password,
                    active: active === "true" ? true: false,
                    role: role
                })}>{title}</Button>
            </DialogActions>
        </Dialog>   
    )
}