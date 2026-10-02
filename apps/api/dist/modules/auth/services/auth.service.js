import { getOrm } from '../../../config/orm.js';
import { User } from '../../../entities/usuario.js';
// Busca un usuario por email y contraseña
export const findUserByCredentials = async (email, password) => {
    const em = getOrm().em.fork();
    return em.findOne(User, { email, password });
};
// Crea un nuevo usuario
export const createUser = async (name, email, password, role, businessData) => {
    const em = getOrm().em.fork();
    const user = em.create(User, {
        nombre: name,
        email,
        password,
        rol: role,
        activo: true,
        ...(businessData ?? {})
    });
    await em.persist(user).flush();
    return user;
};
