// Dependencies
import { IconButton } from "@mui/material"
import { useState, useEffect } from "react"
import Cookies from "js-cookie"
import { NavigateFunction, useNavigate } from "react-router-dom";
// Icons
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
// Components
import DrawerMenu from "./DrawerMenu";
// Styles
import { IconButtonSize } from "../styles/MenuStyle";
// Helpers
import { refreshToken } from "../helpers/Token";

function logout(navigate:NavigateFunction){
    Cookies.remove("token")
    navigate("/")
}

export default function MenuComponent(){
    const navigate = useNavigate()
    const [open, setOpen] = useState<boolean>(false)
    useEffect(() => {
        refreshToken(navigate)
    },[])
    return (
        <>
            {DrawerMenu(open, setOpen)}
            <div className="menu">
                <IconButton onClick={() => setOpen(true)}>   
                    <MenuIcon sx={IconButtonSize}/>
                </IconButton>
                <IconButton onClick={() => navigate("/br_code")}>
                    <AddIcon sx={IconButtonSize}/>
                </IconButton>
                <IconButton onClick= {() => logout(navigate)}>
                    <LogoutIcon sx={IconButtonSize}/>
                </IconButton>
            </div>
        </>
    )
}