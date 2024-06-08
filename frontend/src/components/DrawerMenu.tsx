// Dependencies
import {Drawer, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider} from "@mui/material"
import {useState,useEffect} from "react"
import { useNavigate, NavigateFunction } from "react-router-dom";
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
import { checkAdmin } from "../helpers/user/CheckAdmin";


function userMenu(navigate:NavigateFunction){
    return <>
        <List>
            <ListItem key="Modificar registros" disablePadding>
                <ListItemButton onClick = {() => navigate("/record")}>
                    <ListItemIcon>
                        <EditIcon />
                    </ListItemIcon>
                    <ListItemText primary="Modificar registros" />
                </ListItemButton>
            </ListItem>
            <ListItem key="Crear alarmas" disablePadding>
                <ListItemButton onClick = {() => navigate("/alert")}>
                    <ListItemIcon>
                        <WarningIcon />
                    </ListItemIcon>
                    <ListItemText primary="Crear alarmas" />
                </ListItemButton>
            </ListItem>
            <ListItem key="Modificar alarmas" disablePadding>
                <ListItemButton onClick= {()=> navigate("/alert_table")}>
                    <ListItemIcon>
                        <ReportGmailerrorredIcon />
                    </ListItemIcon>
                    <ListItemText primary="Modificar alarmas" />
                </ListItemButton>
            </ListItem>
        </List>
    </>
}
function adminMenu(navigate:NavigateFunction){
    return (
    <>
        <List>
            <ListItem key="Modificar usuario" disablePadding>
                <ListItemButton onClick={()=> navigate("/user")}>
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
            <ListItem key="Modificar fallos" disablePadding>
                <ListItemButton onClick= {() => navigate("/bug")}>
                    <ListItemIcon>
                        <FireplaceIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Modificar fallos" />
                </ListItemButton>
            </ListItem>
            <ListItem key="Modificar maquinas" disablePadding>
                <ListItemButton onClick= {() => navigate("/machine")}>
                    <ListItemIcon>
                        <PrecisionManufacturingIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Modificar maquinas" />
                </ListItemButton>
            </ListItem>
            <ListItem key="Modificar referencias" disablePadding>
                <ListItemButton onClick= {() => navigate("/reference")}>
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
    const navigate = useNavigate()
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
                {userMenu(navigate)}
                {admin && <Divider />}
                {admin ? adminMenu(navigate) : null}
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