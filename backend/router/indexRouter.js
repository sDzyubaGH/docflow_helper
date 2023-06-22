import { Router } from "express";
import { tasksRouter } from "./tasksRouter.js";

const indexRouter = Router()

indexRouter.use('/tasks', tasksRouter)

export { indexRouter }