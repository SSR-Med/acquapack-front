// Schemas
import { searchUserSchema } from "../../schemas/UserSchema";
// Helpers
import { deleteBlankSpaces, capitalizeFirstLetter } from "../FormatString";

function searchByDocument(rows:Array<Record<string,any>>,document:string){
    if (document === "") return rows
    return rows.filter((row) => row.document === document)
}

function searchByName(rows:Array<Record<string,any>>,name:string){
    if (name === "") return rows
    return rows.filter((row) => row.name.includes(deleteBlankSpaces(name)));
}

function searchByRole(rows:Array<Record<string,any>>,role:string){
    if (role === "") return rows
    return rows.filter((row) => row.role.includes(capitalizeFirstLetter(deleteBlankSpaces(role))));
}

export default function filterUser(searchUserSchema: searchUserSchema){
    switch(searchUserSchema.selectValue){
        case "document":
            return searchByDocument(searchUserSchema.rows,searchUserSchema.searchValue)
        case "name":
            return searchByName(searchUserSchema.rows,searchUserSchema.searchValue)
        case "role":
            return searchByRole(searchUserSchema.rows,searchUserSchema.searchValue)
        default:
            return searchUserSchema.rows
    }
}