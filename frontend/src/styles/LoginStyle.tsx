const fontSize = '2vw';
const backgroundColor = 'white'
const color = "black"

export const loginTextField = {
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
export const loginSelectField = {
    '& .MuiSelect-root': {
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

export const loginButton = {
    backgroundColor: backgroundColor,
    color: color,
    fontSize: '2.5vw',
    '&.MuiButton-root:hover':{
        backgroundColor: "#c5c5c5"
    }
}