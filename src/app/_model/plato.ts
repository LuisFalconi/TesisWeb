import { Observable } from 'rxjs';
export class Plato {
    id: string;
    platoDesayuno: string;
    detalleDesayuno: string;
    precioDesayuno: number;
    entradaAlmuerzo: string;
    jugoAlmuerzo: string;
    segundoAlmuerzo: string;
    precioAlmuerzo: number;
    //platoEspecial: string; // imagenes
    imgPlato?: any;
    fileRef?: string;
    userUID: string; // id del usuario logueado (el que crea el plato, es decir el ID del Restaurante)
}
