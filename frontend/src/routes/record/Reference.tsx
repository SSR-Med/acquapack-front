// Dependencies
import { useState, useEffect } from "react"
import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
// Components
import MenuComponent from "../../components/MenuComponent"
import { dataTable } from "../../components/TableComponent"
// Styles
import { crudButtonStyle } from "../../styles/TableStyle"
// Helpers
import { searchValues } from "../../components/TableComponent"
import { columnsReference, getReferences, deleteReference } from "../../helpers/reference/ModifyReference"
import { userRedirect } from "../../helpers/user/CheckAdmin"
import filterSearch from "../../helpers/search/SearchFilter"

export default function ModifyReference(){
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
        "id_number": "number",
        "name": "string"
    }
    useEffect(()=>{
        userRedirect(navigate)
        getReferences().then((data) => {
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
            <MenuComponent/>
            <main>
                <div className="table-container">
                    <h1>Configuración de referencias</h1>
                        <Button variant="contained" sx={crudButtonStyle} onClick={
                            () => {
                                setOpen(true)
                                setRequest("POST")
                            }
                        }>Crear</Button>
                        {searchValues({
                            selectMap: {
                                "id_number": "Código de barras",
                                "name": "Referencia"
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
                            columns: columnsReference,
                            setSelectedRowSchema: setSelectedRow,
                        })}
                        <div className="table-modify">
                            <Button variant="contained" 
                            onClick = {() => setOpen(true)}
                            sx={crudButtonStyle}>Modificar</Button>
                            <Button variant="contained"sx={crudButtonStyle}
                            onClick={()=>{
                                if(selectedRow != null){
                                    deleteReference(selectedRow.id)
                                }
                            }}>Eliminar</Button>
                        </div>
                </div>
            </main>
        </div>
    )
}