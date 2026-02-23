import prisma from "../database/PrismaClient.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function login(req, res) {
  const { email, senha } = req.body;

  try {
    const pessoa = await prisma.pessoa.findUnique({
      where: { email },
    });

    if (!pessoa) {
      return res.status(401).json({ error: "E-mail ou senha inválidos" });
    }

    const senhaValida = await bcrypt.compare(senha, pessoa.senha);

    if (!senhaValida) {
      return res.status(401).json({ error: "E-mail ou senha inválidos" });
    }

    const token = jwt.sign(
      { id: pessoa.id },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.json({ token });

  } catch (error) {
    res.status(500).json({ error: "Erro ao fazer login" });
  }
}