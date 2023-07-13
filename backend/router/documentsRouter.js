import { Router } from "express";
import DocumentsController from "../controllers/DocumentsController.js";

const documentsRouter = Router()

documentsRouter.get('/', DocumentsController.get)
documentsRouter.get('/categories', DocumentsController.getCategories)

export { documentsRouter }