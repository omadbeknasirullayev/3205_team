import { Router } from "express";
import UserController from "../controller/user.controller";

const router = Router();

router.post("/search", UserController.searchUsers);
router.post("/users", UserController.createUser);

export default router;
