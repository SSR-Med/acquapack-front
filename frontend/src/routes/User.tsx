// Dependencies
import { useState, useEffect } from "react"
import { GridColDef } from "@mui/x-data-grid"
// Components
import MenuComponent from "../components/MenuComponent"
import { createButton, searchValues, dataTable } from "../components/TableComponent"
// Helpers
import { getAndTransformUsers } from "../helpers/User/ModifyUser"
// Css
import "../static/css/table/Table.css"

export default function ModifyUser(){
    const [selectValue, setSelectValue] = useState<string>("")
    const [searchValue, setSearchValue] = useState<string>("")
    const [selectedRow, setSelectedRow] = useState<Record<string,any> | null>(null)
    const [rows, setRows] = useState<Array<Record<string,any>>>([])
    // Rows and columns
    // Rows
    useEffect(() =>{
        getAndTransformUsers().then((data) => {
            setRows(data)
        })
    },[])
    const columns: GridColDef[] = [{
        field: "id",
        headerName: "ID",
        flex: 1
    },
    {
        field: "document_type",
        headerName: "Tipo Documento",
        flex: 1
    },
    {
        field: "document",
        headerName: "Documento",
        flex: 1
    },
    {
        field: "name",
        headerName: "Nombre",
        flex: 1
    },
    {
        field: "password",
        headerName: "Contraseña",
        flex: 1
    },
    {
        field: "active",
        headerName: "Estado",
        flex: 1
    },
    {
        field: "role",
        headerName: "Rol",
        flex: 1
    }
    ] 
    return (
        <>
            <div className="table-all-container">
                <MenuComponent/>
                <main>
                    <div className="table-container">
                        <h1>Configuración de usuarios</h1>
                        {createButton()}
                        {searchValues({
                            selectMap: {
                                "name": "Nombre",
                                "email": "Correo",
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
                            columns: columns,
                            setSelectedRowSchema: setSelectedRow
                        })}
                    </div>
                </main>
            </div>
        </>
    )
}