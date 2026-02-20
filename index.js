import express from 'express';
import prisma from './PrismaClient.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { verificarToken, SECRET_KEY } from './auth.js';

const app = express();
app.use(express.json());

app.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    const pessoa = await prisma.pessoa.findUnique({
      where: { email }
    });

    if (!pessoa) {
      return res.status(401).json({ error: "E-mail ou senha incorretos" });
    }

    const senhaValida = await bcrypt.compare(senha, pessoa.senhaHash);

    if (!senhaValida) {
      return res.status(401).json({ error: "E-mail ou senha incorretos" });
    }

    const token = jwt.sign(
      { id: pessoa.id },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.json({ token });

  } catch (error) {
    res.status(500).json({ error: "Erro no login" });
  }
});

// --- ROTAS DE PESSOAS ---

// Listar Pessoas
app.get('/pessoas', async (req, res) => {
  const listaPessoas = await prisma.pessoa.findMany({
    include: { conhecimentos: true }
  });

  res.json(listaPessoas);
});

// Criar Pessoa
app.post('/pessoas', async (req, res) => {
  try {
    const { nome, email, telefone, descricao, senha } = req.body;

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const novaPessoa = await prisma.pessoa.create({
      data: {
        nome,
        email,
        telefone,
        descricao,
        senhaHash: senhaCriptografada
      }
    });

    const { senhaHash, ...pessoaSemSenha } = novaPessoa;

    res.status(201).json(pessoaSemSenha);

  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Erro ao criar pessoa" });
  }
});

// Atualizar Pessoa
app.put('/pessoas/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, email, telefone, descricao } = req.body;

  try {
    const atualizado = await prisma.pessoa.update({
      where: { id: Number(id) },
      data: { nome, email, telefone, descricao }
    });

    res.json(atualizado);

  } catch (error) {
    res.status(404).json({ error: "Pessoa não encontrada" });
  }
});

// Deletar Pessoa
app.delete('/pessoas/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.pessoa.delete({
      where: { id: Number(id) }
    });

    res.status(204).send();

  } catch (error) {
    res.status(404).json({ error: "Erro ao deletar" });
  }
});

// --- ROTAS DE CONHECIMENTOS ---

// Listar Conhecimentos
app.get('/conhecimentos', async (req, res) => {
  const listaConhecimentos = await prisma.conhecimento.findMany({
    include: { pessoa: true }
  });

  res.json(listaConhecimentos);
});

// Criar Conhecimento (PROTEGIDO)
app.post('/conhecimentos', verificarToken, async (req, res) => {
  const { titulo, descricao, categoria, nivel } = req.body;

  try {
    const novoConhecimento = await prisma.conhecimento.create({
      data: {
        titulo,
        descricao,
        categoria,
        nivel,
        pessoaId: req.usuarioId
      }
    });

    res.status(201).json(novoConhecimento);

  } catch (error) {
    res.status(400).json({ error: "Erro ao criar conhecimento" });
  }
});

// Atualizar Conhecimento (PROTEGIDO)
app.put('/conhecimentos/:id', verificarToken, async (req, res) => {
  const { id } = req.params;
  const { titulo, descricao, categoria, nivel } = req.body;

  try {
    const conhecimento = await prisma.conhecimento.findUnique({
      where: { id: Number(id) }
    });

    if (!conhecimento) {
      return res.status(404).json({ error: "Conhecimento não encontrado" });
    }

    if (conhecimento.pessoaId !== req.usuarioId) {
      return res.status(403).json({ error: "Sem permissão" });
    }

    const atualizado = await prisma.conhecimento.update({
      where: { id: Number(id) },
      data: { titulo, descricao, categoria, nivel }
    });

    res.json(atualizado);

  } catch (error) {
    res.status(400).json({ error: "Erro ao atualizar" });
  }
});

// Deletar Conhecimento (PROTEGIDO)
app.delete('/conhecimentos/:id', verificarToken, async (req, res) => {
  const { id } = req.params;

  try {
    const conhecimento = await prisma.conhecimento.findUnique({
      where: { id: Number(id) }
    });

    if (!conhecimento) {
      return res.status(404).json({ error: "Conhecimento não encontrado" });
    }

    if (conhecimento.pessoaId !== req.usuarioId) {
      return res.status(403).json({ error: "Sem permissão" });
    }

    await prisma.conhecimento.delete({
      where: { id: Number(id) }
    });

    res.status(204).send();

  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar" });
  }
});


// Iniciar Servidor
app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});