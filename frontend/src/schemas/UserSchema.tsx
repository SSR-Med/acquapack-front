export interface loginSchema{
    document_type: string,
    document: number,
    password: string
}
export interface searchUserSchema{
    selectValue: string,
    searchValue:string,
    rows:Array<Record<string,any>>
}