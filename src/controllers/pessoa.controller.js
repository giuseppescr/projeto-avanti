import prisma from "../database/PrismaClient.js";
import bcrypt from "bcrypt";

// Listar Pessoas
export async function listarPessoas(req, res) {
  const listaPessoas = await prisma.pessoa.findMany({
    include: { conhecimentos: true },
  });
  res.json(listaPessoas);
}

// Criar Pessoa 
export async function criarPessoa(req, res) {
  try {
    const { nome, email, telefone, descricao, senha } = req.body;

    const senhaHash = await bcrypt.hash(senha, 10);

    const novaPessoa = await prisma.pessoa.create({
      data: { 
        nome, 
        email, 
        telefone, 
        descricao, 
        senha: senhaHash  
      },
    });

    // Remove a senha antes de enviar a resposta
    const { senha: _, ...pessoaSemSenha } = novaPessoa;

    res.status(201).json(pessoaSemSenha);

  } catch (error) {
    if (error.code === "P2002") {
      return res.status(400).json({ error: "Este e-mail já está cadastrado." });
    }

    console.log(error);
    res.status(400).json({ error: "Erro ao criar pessoa" });
  }
}

// Atualizar Pessoa
export async function atualizarPessoa(req, res) {
  const { id } = req.params;
  const { nome, email, telefone, descricao } = req.body;

  try {
    const atualizado = await prisma.pessoa.update({
      where: { id },
      data: { nome, email, telefone, descricao },
    });

    res.json(atualizado);
  } catch (error) {
    res.status(404).json({ error: "Pessoa não encontrada" });
  }
}

// Deletar Pessoa
export async function deletarPessoa(req, res) {
  const { id } = req.params;

  try {
    await prisma.pessoa.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: "Erro ao deletar" });
  }
}