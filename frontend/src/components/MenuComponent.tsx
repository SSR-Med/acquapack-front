// Dependencies
import { IconButton } from "@mui/material"
import { useState } from "react"
// Icons
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
// Components
import DrawerMenu from "./DrawerMenu";
// Styles
import { IconButtonSize } from "../styles/MenuStyle";

export default function MenuComponent(){
    const [open, setOpen] = useState<boolean>(false)
    return (
        <>
            {DrawerMenu(open, setOpen)}
            <div className="menu">
                <IconButton onClick={() => setOpen(true)}>   
                    <MenuIcon sx={IconButtonSize}/>
                </IconButton>
                <IconButton>
                    <AddIcon sx={IconButtonSize}/>
                </IconButton>
                <IconButton>
                    <LogoutIcon sx={IconButtonSize}/>
                </IconButton>
            </div>
        </>
    )
}