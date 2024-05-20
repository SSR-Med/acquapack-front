// Dependencies
import { TextField, InputAdornment} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
// Schemas
import { searcherSchema } from "../schemas/TableSchema";
// Styles
import { textFieldStyle } from "../styles/TableStyle";

export function createTextFieldWithIcon(searcherSchema: searcherSchema){
    return(
        <TextField sx={textFieldStyle}
            label="Buscar"
            value={searcherSchema.getter}
            onChange={(e) => searcherSchema.setter(e.target.value)}
            InputProps={{
                endAdornment:(
                    <InputAdornment position="end">
                        <SearchIcon/>
                    </InputAdornment>
                )
            }}
        />
    )

}