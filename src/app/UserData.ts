/**
 * Interfaz que representa los datos de usuario autenticado.
 */
export interface UserData {
  /**
   * Token de autenticación del usuario, utilizado para la autorización en el sistema.
   */
  token: string;

  /**
   * Lista de roles que tiene el usuario, que determinan sus permisos y accesos dentro del sistema.
   */
  roles: string[];
}
