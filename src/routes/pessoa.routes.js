import { Router } from "express";
import {
  listarPessoas,
  criarPessoa,
  atualizarPessoa,
  deletarPessoa,
} from "../controllers/pessoa.controller.js";
import authenticate from "../middlewares/authenticate.js";

const router = Router();

router.get("/", authenticate, listarPessoas);
router.post("/", criarPessoa);
router.put("/:id", authenticate, atualizarPessoa);
router.delete("/:id", authenticate, deletarPessoa);

export default router;