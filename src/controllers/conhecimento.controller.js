import prisma from "../database/PrismaClient.js";

// Listagem com Filtros Avançados (Categoria, Nível e Busca Textual)
export async function listarConhecimentos(req, res) {
  const { categoria, nivel, search } = req.query;

  try {
    const conhecimentos = await prisma.conhecimento.findMany({
      where: {
        AND: [
          categoria ? { categoria } : {},
          nivel ? { nivel } : {},
          search
            ? {
                OR: [
                  { titulo: { contains: search, mode: "insensitive" } },
                  { descricao: { contains: search, mode: "insensitive" } },
                ],
              }
            : {},
        ],
      },
      include: {
        pessoa: true,
      },
    });

    res.json(conhecimentos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar conhecimentos" });
  }
}

// ROTA DE DETALHES (Buscar conhecimento por ID)
export async function buscarConhecimento(req, res) {
  const { id } = req.params;

  try {
    const conhecimento = await prisma.conhecimento.findUnique({
      where: { id },
      include: { pessoa: true },
    });

    if (!conhecimento) {
      return res.status(404).json({ error: "Conhecimento não encontrado" });
    }

    res.json(conhecimento);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar detalhes do conhecimento" });
  }
}

// Criar conhecimento
export async function criarConhecimento(req, res) {
  const { titulo, descricao, categoria, nivel } = req.body;

  try {
    const novoConhecimento = await prisma.conhecimento.create({
      data: { titulo, descricao, categoria, nivel, pessoaId: req.pessoaId },
    });

    res.status(201).json(novoConhecimento);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Erro ao criar conhecimento",
    });
  }
}

// Atualizar conhecimento (PROTEGIDO)
export async function atualizarConhecimento(req, res) {
  const { id } = req.params;
  const { titulo, descricao, categoria, nivel } = req.body; // Removemos o pessoaId daqui

  try {
    const conhecimento = await prisma.conhecimento.findUnique({ where: { id } });
    
    if (!conhecimento) return res.status(404).json({ error: "Conhecimento não encontrado" });
    
    // Verificação de segurança: O dono da oferta é o mesmo usuário do Token?
    if (conhecimento.pessoaId !== req.pessoaId) {
      return res.status(403).json({ error: "Sem permissão para editar esta oferta" });
    }

    // Atualiza apenas os dados permitidos
    const atualizado = await prisma.conhecimento.update({
      where: { id },
      data: { titulo, descricao, categoria, nivel }, 
      
    });

    res.json(atualizado);
  } catch (error) {
    res.status(400).json({ error: "Erro ao atualizar conhecimento" });
  }
}

// Deletar conhecimento (PROTEGIDO)
export async function deletarConhecimento(req, res) {
  const { id } = req.params;

  try {
    const conhecimento = await prisma.conhecimento.findUnique({ where: { id } });
    
    if (!conhecimento) return res.status(404).json({ error: "Conhecimento não encontrado" });

    // Verificação de segurança: O dono da oferta é o mesmo usuário do Token?
    if (conhecimento.pessoaId !== req.pessoaId) {
      return res.status(403).json({ error: "Sem permissão para deletar esta oferta" });
    }

    await prisma.conhecimento.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar" });
  }
}