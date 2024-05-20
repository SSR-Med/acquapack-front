// Css
import "/src/static/css/login/Login.css"
// Dependencies
import { TextField, Button,
    FormControl, InputLabel, Select, MenuItem
 } from "@mui/material"
import { useState } from "react"
// Styles
import { loginTextField, loginSelectField, loginButton } from "../../styles/LoginStyle"
// Helpers
import { HandleNumberChange, handlePasswordChange } from "../../helpers/HandleNumberChange"
import { loginCookie } from "../../helpers/Login/HandleLogin"
import { useNavigate } from "react-router-dom"

export default function Login(){
    // Variables
    const navigate = useNavigate()
    // Selects
    const [shift, setShift] = useState<string>("")
    const [documentType, setDocumentType] = useState<string>("")
    // Values
    const [document, setDocument] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    return (
        <>
            <div className= "login-all-container">
                <div className="login-container">
                    <div className="login-element-container">
                        <FormControl fullWidth sx={loginSelectField}>
                            <InputLabel>Tipo de documento</InputLabel>
                            <Select 
                             style = {{backgroundColor: "white"}}
                             value = {documentType}
                             label = "Tipo de documento"
                             onChange = {(e) => setDocumentType(e.target.value as string)}
                            >
                                <MenuItem value="CC">Cédula de ciudadanía</MenuItem>
                                <MenuItem value="CE">Cédula de extranjería</MenuItem>
                                <MenuItem value="TI">Tarjeta de identidad</MenuItem>
                                <MenuItem value="PP">Pasaporte</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField value={document} onChange={HandleNumberChange(setDocument)} variant="filled" label="Documento" sx={loginTextField}/>
                        <TextField value={password} onChange={handlePasswordChange(setPassword)} variant="filled" label="Contraseña" type="password" sx={loginTextField}/>
                        <FormControl fullWidth sx={loginSelectField}>
                            <InputLabel>Turno</InputLabel>
                            <Select 
                             style = {{backgroundColor: "white"}}
                             value = {shift}
                             label = "Turno"
                             onChange = {(e) => setShift(e.target.value as string)}
                            >
                                <MenuItem value="diurno">Diurno</MenuItem>
                                <MenuItem value="nocturno">Nocturno</MenuItem>
                            </Select>
                        </FormControl>
                        <div className="login-button">
                            <Button onClick={
                                () => loginCookie({
                                    document_type: documentType,
                                    document: parseInt(document),
                                    password: password
                                },navigate)
                            } variant="contained" sx={loginButton}>Enviar</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}