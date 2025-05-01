import { Router } from "express"
import cGroup from "../controllers/cGroup.js"

const routers = Router()

routers.get("/groups", cGroup.getAll)
routers.post("/groups", cGroup.add)
routers.get("/groups/:id",cGroup.show)
routers.put("/groups/:id",cGroup.update)
routers.delete("/groups/:id",cGroup.delete)

export default routers