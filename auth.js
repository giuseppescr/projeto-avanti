import jwt from 'jsonwebtoken';

const SECRET_KEY = "sua_chave_secreta_aqui";

export const verificarToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ error: "Nenhum token fornecido" });
  }

  try {

    const apenasToken = token.split(' ')[1];
    const decodificado = jwt.verify(apenasToken, SECRET_KEY);
    req.usuarioId = decodificado.id; // Salva o ID do usuário para usar depois
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido ou expirado" });
  }
};

export { SECRET_KEY };