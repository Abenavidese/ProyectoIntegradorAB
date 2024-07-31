/**
 * Clase que representa un usuario en el sistema.
 */
export class Usuario {
    /**
     * Identificador único del usuario. Es opcional porque puede no estar definido al momento de la creación.
     */
    usuarioId?: number;

    /**
     * Nombre de usuario utilizado para el inicio de sesión.
     */
    username: string;

    /**
     * Contraseña del usuario, utilizada para la autenticación.
     */
    password: string;

    /**
     * Correo electrónico del usuario.
     */
    email: string;

    /**
     * Rol del usuario dentro del sistema, que puede determinar sus permisos y acceso.
     */
    role: string;

    /**
     * Constructor de la clase Usuario.
     * 
     * @param usuarioId - Identificador único del usuario.
     * @param username - Nombre de usuario.
     * @param password - Contraseña del usuario.
     * @param email - Correo electrónico del usuario.
     * @param role - Rol del usuario en el sistema.
     */
    constructor(usuarioId: number, username: string, password: string, email: string, role: string){
        this.usuarioId = usuarioId;
        this.username = username;
        this.password = password;
        this.email = email;
        this.role = role;
    }
}
