import { Router } from "express"
import cActivityType from "../controllers/cActivityType.js"

const routers = Router()

routers.get("/activityType", cActivityType.getAll)
routers.post("/activityType", cActivityType.add)
routers.get("/activityType/:id", cActivityType.show)
routers.put("/activityType/:id", cActivityType.update)
routers.delete("/activityType/:id", cActivityType.delete)

export default routers 