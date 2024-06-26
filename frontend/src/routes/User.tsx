// Dependencies
import { useState, useEffect } from "react"
import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
// Components
import MenuComponent from "../components/MenuComponent"
import { searchValues, dataTable } from "../components/TableComponent"
import crudUser from "../components/dialog/user/CrudUser"
// Helpers
import { getAndTransformUsers, columnsUser } from "../helpers/user/ModifyUser"
import { changeState } from "../helpers/user/ChangeState"
import filterSearch from "../helpers/search/SearchFilter"
import { userRedirect } from "../helpers/user/CheckAdmin"
// Styles
import { crudButtonStyle } from "../styles/TableStyle"
// Css
import "../static/css/table/Table.css"

export default function ModifyUser(){
    // Variables 
    const navigate = useNavigate()
    // States
    const [selectValue, setSelectValue] = useState<string>("")
    const [searchValue, setSearchValue] = useState<string>("")
    const [selectedRow, setSelectedRow] = useState<Record<string,any> | null>(null)
    const [rows, setRows] = useState<Array<Record<string,any>>>([])
    // State for crud
    const [open, setOpen] = useState<boolean>(false)
    // Request state for crud
    const [request, setRequest] = useState<string>("POST")
    // Select values map
    const mapSelectValuesSearch: Record<string,string> = {
        "document": "number",
        "name": "string",
        "role": "string"
    }
    // Rows and columns
    // Rows
    useEffect(() =>{
        userRedirect(navigate)
        getAndTransformUsers().then((data:Array<Record<string,any>>) => {
            setRows(filterSearch(
                data,
                mapSelectValuesSearch[selectValue],
                selectValue,
                searchValue))
        })
    },[rows])
    return (
        <>
            <div className="table-all-container">
                {crudUser(open,setOpen,selectedRow,request)}
                <MenuComponent/>
                <main>
                    <div className="table-container">
                        <h1>Configuración de usuarios</h1>
                        <Button variant="contained" sx={crudButtonStyle} onClick={
                            () => {
                                setOpen(true)
                                setRequest("POST")
                            }
                        }>Crear</Button>
                        {searchValues({
                            selectMap: {
                                "document": "Documento",
                                "name": "Nombre",
                                "role": "Rol"
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
                            columns: columnsUser,
                            setSelectedRowSchema: setSelectedRow
                        })}
                        <div className="table-modify">
                            <Button variant="contained" sx={crudButtonStyle}
                            onClick = {() => {
                                setRequest("PUT")
                                setOpen(true)
                            }}
                            >Modificar</Button>
                            <Button variant="contained" sx={crudButtonStyle} onClick={
                                () => {
                                    if(selectedRow != null){
                                    changeState(selectedRow.id)
                                }}
                                }>Activar/Desactivar</Button>   
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}