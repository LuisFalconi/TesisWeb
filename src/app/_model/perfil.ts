import { Observable } from 'rxjs';
import { GeoPoint } from '@google-cloud/firestore';
export class Perfil{
    id?: string;
    nombreRestaurante: string;
    tipoRestaurante: string;
    capacidadRestaurante?: number;
    direccionRestaurante?: string;
    horaApertura?: string; 
    horaCierre?: string;
    userUID?: string; // id del usuario logueado (el que actualiza el perfil) 
    imagenRes?: any;
    fileRef?: string;
    resVerificado?: string;
    coordenadas ?: string;
}