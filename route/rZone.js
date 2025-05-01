import { Router } from "express"
import cZone from "../controllers/cZone.js"


const routers = Router()

routers.get("/zones", cZone.getAll)
routers.post("/zones", cZone.add)
routers.get("/zones/:id", cZone.show)
routers.put("/zones/:id", cZone.update)
routers.delete("/zones/:id", cZone.delete)
export default routers