// Css
import "/src/static/css/pipeline/PipelineInfo.css"
// Dependencies
import {IconButton, Button, TextField} from "@mui/material"
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { useState } from "react"
// Components
import MenuComponent from "../../components/MenuComponent"
// Helpers
import { HandleDecimalChange } from "../../helpers/HandleNumberChange";
// Styles
import { ArrowButtonSize, BrCodeTextField, PipelineButton} from "../../styles/PipelineStyle";

export default function PipelineInfo(){
    // Values
    const [date, setDate] = useState<string>("")
    const [weight, setWeight] = useState<string>("")
    const [lenght, setLenght] = useState<string>("")
    return (
    <>
        <div className="pipeline-info-container">
            <MenuComponent/>
            <div className="pipeline-info-element-container">
                <div className="pipeline-info-element">
                    <div className="pipeline-info-inside">
                        <div className ="pipeline-info-icon-button">
                            <IconButton>
                                <ArrowCircleLeftIcon sx={ArrowButtonSize}/>
                            </IconButton>
                        </div>
                        <TextField value={date} onChange={event => setDate(event.target.value as string)} variant="filled" label="Fecha" sx={BrCodeTextField}/>
                        <TextField value={weight} onChange={HandleDecimalChange(setWeight)} variant="filled" label="Peso" sx={BrCodeTextField}/>
                        <TextField value={lenght} onChange={HandleDecimalChange(setLenght)} variant="filled" label="Largo" sx={BrCodeTextField}/>
                        <div className="pipeline-button">
                            <Button variant="contained" sx={PipelineButton}>Enviar</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}