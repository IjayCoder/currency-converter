import { Router } from "express";
import { convert, currencies } from "../controller/currencyController";

const router = Router();

router.post("/convert", convert);

router.get("/currencies", currencies);

export default router;
