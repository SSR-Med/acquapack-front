// Css
import "/src/static/css/pipeline/PipelineInfo.css"
// Dependencies
import {IconButton, Button, TextField} from "@mui/material"
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
// Components
import MenuComponent from "../../components/MenuComponent"
// Helpers
import { HandleDecimalChange } from "../../helpers/HandleNumberChange";
import { getDate, transformDate } from "../../helpers/pipeline/GetDate";
import { createPipelineRecord } from "../../helpers/pipeline/CreatePipeline";
// Styles
import { ArrowButtonSize, BrCodeTextField, PipelineButton} from "../../styles/PipelineStyle";

export default function PipelineInfo(){
    // Values
    const [reference, setReference] = useState<string>("")
    const [date, setDate] = useState<string>("")
    const [weight, setWeight] = useState<string>("")
    const [lenght, setLenght] = useState<string>("")
    const navigate = useNavigate()
    const location = useLocation()
    useEffect(() =>{
        // Set reference
        setReference(new URLSearchParams(location.search).get('reference') as string)
        // Set date
        const setDateAsync = async () => {
            const transformedDate = await transformDate();
            setDate(transformedDate);
        };
        setDateAsync();
    },[])
    return (
    <>
        <div className="pipeline-info-container">
            <MenuComponent/>
            <div className="pipeline-info-element-container">
                <div className="pipeline-info-element">
                    <div className="pipeline-info-inside">
                        <div className ="pipeline-info-icon-button">
                            <IconButton onClick = {() => navigate("/brcode")}>
                                <ArrowCircleLeftIcon sx={ArrowButtonSize}/>
                            </IconButton>
                        </div>
                        <TextField disabled value={reference} onChange={event => setReference(event.target.value as string)} variant="filled" label="Referencia" sx={BrCodeTextField}/>
                        <TextField disabled value={date} onChange={event => setDate(event.target.value as string)} variant="filled" label="Fecha" sx={BrCodeTextField}/>
                        <TextField value={weight} onChange={HandleDecimalChange(setWeight)} variant="filled" label="Peso" sx={BrCodeTextField}/>
                        <TextField value={lenght} onChange={HandleDecimalChange(setLenght)} variant="filled" label="Largo" sx={BrCodeTextField}/>
                        <div className="pipeline-button">
                            <Button onClick={async () => {
                                const currentDate = await getDate();
                                createPipelineRecord({
                                    reference: reference,
                                    date: currentDate,
                                    weight: parseFloat(weight),
                                    large: parseFloat(lenght)
                                }, navigate);
                            }} variant="contained" sx={PipelineButton}>Enviar</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}