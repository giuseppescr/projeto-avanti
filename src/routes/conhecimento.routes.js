import { Router } from "express";
import {
  listarConhecimentos,
  buscarConhecimento,
  criarConhecimento,
  atualizarConhecimento,
  deletarConhecimento,
} from "../controllers/conhecimento.controller.js";
import authenticate from "../middlewares/authenticate.js";

const router = Router();

router.get("/", authenticate, listarConhecimentos);
router.get("/:id", authenticate, buscarConhecimento);
router.post("/", authenticate, criarConhecimento);
router.put("/:id", authenticate, atualizarConhecimento);
router.delete("/:id", authenticate, deletarConhecimento);

export default router;