// Css
import "/src/static/css/log/Log.css"
// Dependencies
import { IconButton } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
// Icons
import DownloadIcon from '@mui/icons-material/Download';
// Components
import MenuComponent from "../../components/MenuComponent"
// Helpers
import { userRedirect } from "../../helpers/user/CheckAdmin"
import { getLog, downloadLog } from "../../helpers/log/ModifyLog";

export default function Log(){
    // Variables
    const navigate = useNavigate()
    const [log, setLog] = useState<string>("")
    // Use effect
    useEffect(() => {
        userRedirect(navigate)
        getLog().then((data:string) => {
            setLog(data)
        })
    },[])

    return (
        <div className="log-all-container">
            <MenuComponent/>
            <main>
                <div className="log-container">
                    <IconButton sx={{margin: "1vh 1vw"}} onClick= {() => downloadLog()}>
                        <DownloadIcon/>
                    </IconButton>
                    <div className ="log-text">
                        {log}
                    </div>
                </div>
            </main>
        </div>
    )
}