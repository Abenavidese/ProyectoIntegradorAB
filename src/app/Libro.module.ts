export class Libro {
    libroId?: number;
    titulo: string;
    autor: string;
    descripcion: string;
    genero: string;
    editorial: string;
    portada: string;
  
    constructor(libroId: number, titulo: string, autor: string, descripcion: string, genero: string, editorial: string, portada: string) {
        this.libroId = libroId;
        this.titulo = titulo;
        this.autor = autor;
        this.descripcion = descripcion;
        this.genero = genero;
        this.editorial = editorial;
        this.portada = portada;
    }
}
