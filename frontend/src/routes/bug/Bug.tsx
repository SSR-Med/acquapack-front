// Dependencies
import {useState, useEffect} from "react"
import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
// Components
import MenuComponent from "../../components/MenuComponent"
import { dataTable } from "../../components/TableComponent"
// Styles
import { crudButtonStyle } from "../../styles/TableStyle"
// Helpers
import { searchValues } from "../../components/TableComponent"
import { getBugs, deleteBug, columnsBug } from "../../helpers/bug/ModifyBug"
import { userRedirect } from "../../helpers/user/CheckAdmin"
import filterSearch from "../../helpers/search/SearchFilter"
import crudBug from "../../components/dialog/bug/crudBug"

export default function Bug(){
    // Variables
    const navigate = useNavigate()
    const [searchValue, setSearchValue] = useState<string>("")
    const [selectValue, setSelectValue] = useState<string>("")
    const [selectedRow, setSelectedRow] = useState<Record<string,any> | null>(null)
    const [rows, setRows] = useState<Array<Record<string,any>>>([])
    const [open,setOpen] = useState<boolean>(false)
    const [request, setRequest] = useState<string>("POST")
    // Select values map
    const mapSelectValuesSearch: Record<string,string> = {
        "name": "string"
    }
    useEffect(()=>{
        userRedirect(navigate)
        getBugs().then((data) => {
            setRows(filterSearch(
                data,
                mapSelectValuesSearch[selectValue],
                selectValue,
                searchValue
            ))
        })
    })
    return (
        <div className="table-all-container">
            {crudBug(open,setOpen,selectedRow,request)}
            <MenuComponent/>
            <main>
                <div className="table-container">
                    <h1>Configuración de fallos</h1>
                        <Button variant="contained" sx={crudButtonStyle} onClick={
                            () => {
                                setOpen(true)
                                setRequest("POST")
                            }
                        }>Crear</Button>
                        {searchValues({
                            selectMap: {
                                "name": "Nombre"
                            },
                            searchState: {
                                getter: searchValue,
                                setter: setSearchValue
                            },
                            selectState: {
                                getter: selectValue,
                                setter: setSelectValue
                            }
                        })}
                        {dataTable({
                            rows: rows,
                            columns: columnsBug,
                            setSelectedRowSchema: setSelectedRow,
                        })}
                        <div className="table-modify">
                            <Button variant="contained" 
                            onClick = {() => {
                                setOpen(true)
                                setRequest("PUT")
                            }}
                            sx={crudButtonStyle}>Modificar</Button>
                            <Button variant="contained"sx={crudButtonStyle}
                            onClick={()=>{
                                if(selectedRow != null){
                                    deleteBug(selectedRow.id)
                                }
                            }}>Eliminar</Button>
                        </div>
                </div>
            </main>
        </div>
    )
}