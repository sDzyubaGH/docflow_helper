import { Router } from "express";
import TasksController from "../controllers/TasksController.js";

const tasksRouter = Router()

tasksRouter.get('/', TasksController.get)
tasksRouter.get('/docflowUsers', TasksController.getDocflowUsers)
tasksRouter.get('/download', TasksController.download)

export { tasksRouter }