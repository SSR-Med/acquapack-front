const fontSize = '2vw';

export const loginTextField = {
    '& .MuiFilledInput-root': {
        backgroundColor: 'white',
        fontSize: fontSize,
    },
    '& .MuiInputLabel-root': {
        color: 'black',
        fontSize: fontSize
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: 'black',
    },  
}
export const loginSelectField = {
    '& .MuiSelect-root': {
        backgroundColor: 'white',
        fontSize: fontSize,
    },
    '& .MuiInputLabel-root': {
        color: 'black',
        fontSize: fontSize
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: 'black',
    },
}

export const loginButton = {
    backgroundColor: "white",
    color: "black",
    fontSize: '2.5vw',
    '&.MuiButton-root:hover':{
        backgroundColor: "#c5c5c5"
    }
}