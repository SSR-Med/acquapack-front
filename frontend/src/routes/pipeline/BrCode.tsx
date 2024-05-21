// Css
import "/src/static/css/pipeline/BrCode.css"
// Dependencies
import { TextField , IconButton} from "@mui/material"
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { useState } from "react"
import { useNavigate } from "react-router-dom";
// Components
import MenuComponent from "../../components/MenuComponent"
// Styles
import { BrCodeTextField, ArrowButtonSize } from "../../styles/PipelineStyle"
// Helpers
import { HandleNumberChange } from "../../helpers/HandleTextFieldChange"
import { sendPipelineInfo } from "../../helpers/pipeline/BrCode";

export default function BrCode(){
    // Values
    const navigate = useNavigate()
    const [brCode, setBrCode] = useState<string>("")
    // Only numbers in textfields
    return (
        <>
            <div className = "brcode-all-container">
                <MenuComponent/>
                <div className="brcode-container">
                    <div className="brcode-element-container">
                        <TextField value={brCode} onChange={HandleNumberChange(setBrCode)} variant="filled" label="Referencia" sx={BrCodeTextField}/>
                        <div className="brcode-button">
                            <IconButton onClick={
                                () => sendPipelineInfo(brCode, navigate)
                            } sx={ArrowButtonSize}>
                                <ArrowCircleRightIcon sx={ArrowButtonSize}/>
                            </IconButton>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}