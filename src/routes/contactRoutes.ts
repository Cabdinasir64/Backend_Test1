import { Router } from "express";
import { contactUs } from "./../Controllers/contactController";

const router = Router();

router.post("/contact", contactUs);

export default router;
