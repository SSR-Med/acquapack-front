export const API_URL = "http://localhost:3000/api"
export const months: Record<string,string> = {
    "1": "enero",
    "2": "febrero",
    "3": "marzo",
    "4": "abril",
    "5": "mayo",
    "6": "junio",
    "7": "julio",
    "8": "agosto",
    "9": "septiembre",
    "10": "octubre",
    "11": "noviembre",
    "12": "diciembre"
}
// User constants
// Document type
export const abrev2DocumentType: Record<string,string> = {
    "CC": "Cédula de ciudadanía",
    "CE": "Cédula de extranjería",
    "PA": "Pasaporte",
    "TI": "Tarjeta de identidad"
}
export const documentType2Abrev: Record<string,string> = {
    "Cédula de ciudadanía": "CC",
    "Cédula de extranjería": "CE",
    "Pasaporte": "PA",
    "Tarjeta de identidad": "TI"
}
// Estado
export const state2String: Record<string,string> = {
    "true": "Activo",
    "false": "Inactivo"
}
export const string2State: Record<string,string> = {
    "Activo": "true",
    "Inactivo": "false"
}
// Role
export const englishRole2Spanish: Record<string,string> = {
    "admin": "Administrador",
    "user": "Usuario",
    "superadmin": "Superadmin"
}
export const spanishRole2English: Record<string,string> = {
    "Administrador": "admin",
    "Usuario": "user",
    "Superadmin": "superadmin"
}