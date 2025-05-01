import { Router } from "express"
import cMinistry from "../controllers/cMinistry.js"

const routers = Router()

routers.get("/ministries", cMinistry.getAll)
routers.post("/ministries", cMinistry.add)
routers.get("/ministries/:id", cMinistry.show)
routers.put("/ministries/:id", cMinistry.update)
routers.delete("/ministries/:id", cMinistry.delete)

export default routers