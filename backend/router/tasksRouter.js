import { Router } from "express";
import TasksController from "../controllers/TasksController.js";

const tasksRouter = Router()

tasksRouter.get('/', TasksController.get)

export { tasksRouter }