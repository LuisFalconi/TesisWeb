import { Observable } from 'rxjs';
export class Perfil{
    id?: string;
    nombreRestaurante: string;
    tipoRestaurante: string;
    capacidadRestaurante?: number;
    direccionRestaurante?: string;
    horarioRestaurante?: string;
    userUID?: string; // id del usuario logueado (el que actualiza el perfil) 
    imagenRes?: any;
    fileRef?: string;
    resVerificado?: string;
}