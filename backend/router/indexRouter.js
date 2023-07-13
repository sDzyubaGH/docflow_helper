import { Router } from "express";
import { tasksRouter } from "./tasksRouter.js";
import { documentsRouter } from "./documentsRouter.js";

const indexRouter = Router()

indexRouter.use('/tasks', tasksRouter)
indexRouter.use('/documents', documentsRouter)

export { indexRouter }