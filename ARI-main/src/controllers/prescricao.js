const usuarioController = require("./usuarios");
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const router = express.Router();

const prisma = new PrismaClient();
router.use(express.json());

async function criaPrescricao(req, res) {
  const {
    observacao,
    frequencia_valor,
    frequencia_unidade,
    dt_inicio,
    dt_fim,
    id_remedio,
    status = true,
  } = req.body;

  const id_usuario = req.userId;  // ID do usuário logado
  
  if (!id_remedio) {
    return res.status(400).json({ message: "O remédio é obrigatório." });
  }

  try {
    // Verifica se o remédio existe no banco de dados
    const remedio = await prisma.remedio.findUnique({
      where: { id: id_remedio },
    });

    if (!remedio) {
      return res.status(404).json({ message: "Remédio não encontrado." });
    }

    // Converte as strings de data para objetos Date
    const dtInicioDate = new Date(dt_inicio);
    const dtFimDate = new Date(dt_fim);

    // Cria a prescrição no banco de dados
    const novaPrescricao = await prisma.prescricao.create({
      data: {
        observacao,
        frequencia_valor,
        frequencia_unidade,
        dt_inicio: dtInicioDate,  // Usando o objeto Date
        dt_fim: dtFimDate,        // Usando o objeto Date
        id_remedio,
        id_usuario,
        status,
      },
    });

    res.status(201).json({ message: "Prescrição criada com sucesso", id_prescricao: novaPrescricao.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao cadastrar a prescrição." });
  }
}

async function listaPrescricao(req, res) {
  try {
    const prescricao = await prisma.prescricao.findMany({
      where: {
        status: true,
      },
    });
    res.status(200).json(prescricao);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao listar usuários." });
  }
}

// No backend, em um controller de prescrições
async function listaAgendaPrescricao(req, res) {
  const usuarioId = req.userId; // ID do usuário logado (pegue do token ou sessão)

  try {
    const prescricoes = await prisma.prescricao.findMany({
      where: {
        id_usuario: usuarioId, // Filtra as prescrições do usuário logado
        status: true, // Filtra apenas as prescrições ativas
      },
      include: {
        Remedio: true, // Inclui os dados do remédio associado
      },
    });
    res.status(200).json(prescricoes);
  } catch (error) {
    console.error('Erro ao buscar prescrições', error);
    res.status(500).json({ message: 'Erro ao listar prescrições.' });
  }
}

async function lastPresc(req, res) {
  try {
    // Pegando somente a última prescrição criada com status ativo
    const prescricao = await prisma.prescricao.findFirst({
      where: {   
        status: true,  // Filtra prescrições ativas
      },
      orderBy: {
        id: 'desc',  // Ordena pela data de criação, da mais recente para a mais antiga
      },
    });

    // Se não encontrar nenhuma prescrição com status ativo
    if (!prescricao) {
      return res.status(404).json({ message: "Nenhuma prescrição encontrada." });
    }

    console.log(prescricao.id)

    // Retorna a última prescrição encontrada
    res.status(200).json(prescricao.id);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao listar a prescrição." });
  }
}


async function atualizaPrescricao(req, res) {
  const { id } = req.params;
  const { observacao, frequencia, dt_inicio, dt_fim, status } = req.body;
  try {
    const prescricaoAtualizado = await prisma.prescricao.update({
      where: { id: Number(id) },
      data: { observacao, frequencia, dt_inicio, dt_fim, status },
    });
    res
      .status(200)
      .json({
        message: "Prescricao atualizada com sucesso",
        prescricaoAtualizado,
      });
  } catch (error) {
    if (error.code === "P2025") {
      return res
        .status(404)
        .json({ message: "Prescricao não encontrado." }, error);
    }
    res.status(500).json({ message: "Erro ao atualizar a Prescricao." }, error);
  }
}

async function deletaPrescricao(req, res) {
  const { id } = req.params;

  try {
    const prescricaoExcluido = await prisma.prescricao.update({
      where: { id: Number(id) },
      data: {
        status: false,
      },
    });

    res.status(200).json({
      mensagem: "Prescricao excluída logicamente.",
      usuario: {
        id: prescricaoExcluido.id,
        status: prescricaoExcluido.status,
      },
    });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Prescricao não encontrada." });
    }
    res.status(500).json({ error: "Erro ao excluir Prescricao." });
  }
}

module.exports = {
  criaPrescricao,
  listaPrescricao,
  listaAgendaPrescricao,
  lastPresc,
  atualizaPrescricao,
  deletaPrescricao,
};
