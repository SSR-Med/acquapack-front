// Dependencies
import {Drawer, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider} from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import WarningIcon from '@mui/icons-material/Warning';
// Admin icons
import Person2Icon from '@mui/icons-material/Person2';
import LogoDevIcon from '@mui/icons-material/LogoDev';
import FireplaceIcon from '@mui/icons-material/Fireplace';
import DetailsIcon from '@mui/icons-material/Details';

function userMenu(){
    return <>
        <List>
            <ListItem key="Registro" disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <EditIcon />
                    </ListItemIcon>
                    <ListItemText primary="Registro" />
                </ListItemButton>
            </ListItem>
            <ListItem key="Fallo" disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <WarningIcon />
                    </ListItemIcon>
                    <ListItemText primary="Fallo" />
                </ListItemButton>
            </ListItem>
        </List>
    </>
}
function adminMenu(){
    return (
    <>
        <List>
            <ListItem key="Usuario" disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <Person2Icon />
                    </ListItemIcon>
                    <ListItemText primary="Usuario" />
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
            <ListItem key="Modificar fallo" disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <FireplaceIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Modificar fallo" />
                </ListItemButton>
            </ListItem>
            <ListItem key="Modificar referencia" disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <DetailsIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Modificar referencia " />
                </ListItemButton>
            </ListItem>
        </List>
    </>
    )
}

function BoxMenu(setOpen:React.Dispatch<React.SetStateAction<boolean>>){
    return (
        <>
            <Box sx={{ width: 250 }} role="presentation" onClick={() => setOpen(true)}>
                {userMenu()}
                <Divider />
                {adminMenu()}
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