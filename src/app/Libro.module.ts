export class Libro {
    libroId?: number;
    titulo: string;
    autor: string;
    descripcion: string;
    genero: string;
    editorial: string;
    portada: string;
    disponibilidad: boolean; // Nueva propiedad para indicar si el libro está disponible
  
    constructor(
        libroId: number, 
        titulo: string, 
        autor: string, 
        descripcion: string, 
        genero: string, 
        editorial: string, 
        portada: string, 
        disponibilidad: boolean // Agrega disponibilidad al constructor
    ) {
        this.libroId = libroId;
        this.titulo = titulo;
        this.autor = autor;
        this.descripcion = descripcion;
        this.genero = genero;
        this.editorial = editorial;
        this.portada = portada;
        this.disponibilidad = disponibilidad; // Inicializa disponibilidad
    }
}
