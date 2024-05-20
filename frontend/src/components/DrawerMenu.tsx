// Dependencies
import {Drawer, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider} from "@mui/material"
import {useState,useEffect} from "react"
import EditIcon from '@mui/icons-material/Edit';
import WarningIcon from '@mui/icons-material/Warning';
// Admin icons
import Person2Icon from '@mui/icons-material/Person2';
import LogoDevIcon from '@mui/icons-material/LogoDev';
import FireplaceIcon from '@mui/icons-material/Fireplace';
import DetailsIcon from '@mui/icons-material/Details';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
// Helpers
import { checkAdmin } from "../helpers/User/CheckAdmin";

function userMenu(){
    return <>
        <List>
            <ListItem key="Modificar registros" disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <EditIcon />
                    </ListItemIcon>
                    <ListItemText primary="Modificar registros" />
                </ListItemButton>
            </ListItem>
            <ListItem key="Crear fallos" disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <WarningIcon />
                    </ListItemIcon>
                    <ListItemText primary="Crear fallos" />
                </ListItemButton>
            </ListItem>
            <ListItem key="Modificar fallos" disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <ReportGmailerrorredIcon />
                    </ListItemIcon>
                    <ListItemText primary="Modificar fallos" />
                </ListItemButton>
            </ListItem>
        </List>
    </>
}
function adminMenu(){
    return (
    <>
        <List>
            <ListItem key="Modificar usuario" disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <Person2Icon />
                    </ListItemIcon>
                    <ListItemText primary="Modificar usuario" />
                </ListItemButton>
            </ListItem>
            <ListItem key="Log" disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <LogoDevIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Log" />
                </ListItemButton>
            </ListItem>
            <ListItem key="Modificar nombres fallos" disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <FireplaceIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Modificar nombres de fallos" />
                </ListItemButton>
            </ListItem>
            <ListItem key="Modificar maquinarias" disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <PrecisionManufacturingIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Modificar maquinarias" />
                </ListItemButton>
            </ListItem>
            <ListItem key="Modificar referencias" disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <DetailsIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Modificar referencias " />
                </ListItemButton>
            </ListItem>
        </List>
    </>
    )
}

function BoxMenu(setOpen:React.Dispatch<React.SetStateAction<boolean>>){
    const [admin,setAdmin] = useState<boolean>(false)
    useEffect(() =>{
        const getAdmin = async () => {
            const adminValue = await checkAdmin()
            setAdmin(adminValue)
        }
        getAdmin()
    }, [])
    return (
        <>
            <Box sx={{ width: "30vw" }} role="presentation" onClick={() => setOpen(true)}>
                {userMenu()}
                {admin && <Divider />}
                {admin ? adminMenu() : null}
            </Box>
        </>
    )
}
export default function DrawerMenu(open:boolean, setOpen:React.Dispatch<React.SetStateAction<boolean>>){
    return (
        <>
            <Drawer open={open} onClose={() => setOpen(false)}>
                {BoxMenu(setOpen)}
            </Drawer>
        </>
    )
}