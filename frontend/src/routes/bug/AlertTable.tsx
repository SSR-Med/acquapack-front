// Dependencies
import { useState, useEffect } from "react"
import { Button } from "@mui/material"
// Components
import MenuComponent from "../../components/MenuComponent"
import { searchValues } from "../../components/TableComponent"
import { dataTable } from "../../components/TableComponent"
import { selectTime } from "../../components/dialog/record/TimeRecord"
import crudAlert from "../../components/dialog/bug/crudAlert"
// Helpers
import filterSearch from "../../helpers/search/SearchFilter"
import { getAndTransformAlerts, deleteAlert, columnsAlert } from "../../helpers/bug/ModifyAlert"
import { filterRowsByTime } from "../../components/dialog/record/TimeRecord"
// Style
import { crudButtonStyle } from "../../styles/TableStyle"


export default function AlertTable(){
    // Variables
    const [searchValue, setSearchValue] = useState<string>("")
    const [selectValue, setSelectValue] = useState<string>("")
    const [selectedRow, setSelectedRow] = useState<Record<string,any> | null>(null)
    const [rows, setRows] = useState<Array<Record<string,any>>>([])
    const [selectDate, setSelectDate] = useState<string>("")
    const [open,setOpen] = useState<boolean>(false)
    // Select values map
    const mapSelectValuesSearch: Record<string,string> = {
        "document": "number",
        "name": "string",
        "reference": "string"
    }
    // useEffect
    useEffect(() =>{
        getAndTransformAlerts().then((data: Array<Record<string, any>>) => {
            filterRowsByTime(filterSearch(data, mapSelectValuesSearch[selectValue], selectValue, searchValue), selectDate)
              .then((resolvedData) => {
                setRows(resolvedData);
              });
          })
    },[rows])
    return (
        <>
            <div className="table-all-container">
                <MenuComponent/>
                {crudAlert(open,setOpen,selectedRow)}
                <main>
                    <div className="table-container">
                        <h1>Configuración de alarmas</h1>
                        {selectTime(selectDate,setSelectDate)}
                        {searchValues({
                            selectMap: {
                                "document": "Documento",
                                "name": "Nombre",
                                "reference": "Referencia"
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
                            columns: columnsAlert,
                            setSelectedRowSchema: setSelectedRow
                        })}
                        <div className="table-modify">
                            <Button variant="contained" 
                            onClick = {() => setOpen(true)}
                            sx={crudButtonStyle}>Modificar</Button>
                            <Button variant="contained" onClick={() => {
                                if(selectedRow != null){
                                    deleteAlert(selectedRow.id)
                                }
                                }} sx={crudButtonStyle}>Eliminar</Button>  
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}