import express from 'express';
import prisma from './PrismaClient.js';

const app = express();
app.use(express.json());

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
    const { nome, email, telefone, descricao } = req.body;
    const novaPessoa = await prisma.pessoa.create({
      data: { nome, email, telefone, descricao }
    });
    res.status(201).json(novaPessoa);
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
      where: { id },
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
    await prisma.pessoa.delete({ where: { id } });
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

// Criar Conhecimento
app.post('/conhecimentos', async (req, res) => {
  const { titulo, descricao, categoria, nivel, pessoaId } = req.body;
  try {
    const novoConhecimento = await prisma.conhecimento.create({
      data: { titulo, descricao, categoria, nivel, pessoaId }
    });
    res.status(201).json(novoConhecimento);
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar (Verifique o ID da pessoa)" });
  }
});

app.put("/conhecimentos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descricao, categoria, nivel, pessoaId } = req.body;
    
    const atualizado = await prisma.conhecimento.update({
      where: { id },
      data: { titulo, descricao, categoria, nivel, pessoaId }
    });
    
    res.json(atualizado);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Erro ao atualizar conhecimento" });
  }
});

// Deletar Conhecimento
app.delete('/conhecimentos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.conhecimento.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar" });
  }
});

// Iniciar Servidor
app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});