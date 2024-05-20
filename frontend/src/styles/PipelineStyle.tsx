const fontSize = "2vw"
const backgroundColor = "#D9D9D9"
const color = "black"

export const BrCodeTextField = {
    '& .MuiFilledInput-root': {
        backgroundColor: backgroundColor,
        fontSize: fontSize,
    },
    '& .MuiInputLabel-root': {
        color: color,
        fontSize: fontSize
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: color,
    },  
}
export const ArrowButtonSize = {
    fontSize: "8vw"
}
export const PipelineButton = {
    backgroundColor: backgroundColor,
    color: color,
    fontSize: '3vw',
    '&.MuiButton-root:hover':{
        backgroundColor: "#c5c5c5"
    }
}