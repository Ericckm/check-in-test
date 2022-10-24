import { Router } from "express";
import { validateCheckIn } from "./controller/checkin";

const router: Router = Router();

// rota para validar check in
router.post("/checkin", validateCheckIn);

export { router };
