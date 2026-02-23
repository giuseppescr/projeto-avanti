import { Router } from "express";
import pessoaRoutes from "./pessoa.routes.js";
import conhecimentoRoutes from "./conhecimento.routes.js";
import authRoutes from "./auth.routes.js";

const router = Router();

router.use("/pessoas", pessoaRoutes);
router.use("/conhecimentos", conhecimentoRoutes);
router.use(authRoutes);

export default router;