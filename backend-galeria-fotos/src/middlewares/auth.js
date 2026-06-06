import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { User } from '../models/index.js';
import { fail } from '../utils/apiResponse.js';

export const authRequired = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return fail(res, 'Acceso denegado. Se requiere un token JWT en el header.', 401);
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, env.jwtSecret);
    const user = await User.findByPk(decoded.id);
    
    if (!user) return fail(res, 'El usuario asignado al token no existe.', 401);
    
    // Guardar el usuario en el req para utilizarlo en los controladores siguientes
    req.user = user;
    next();
  } catch (error) {
    return fail(res, 'Token inválido o expirado.', 403);
  }
};

export const optionalAuth = async (req, res, next) => {
  // Este middleware permite continuar aunque no haya token, útil para rutas mixtas
  next();
};