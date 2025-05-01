import { Router } from "express"
import cAssist from "../controllers/cAssist.js"

const routers = Router()

routers.get("/assists", cAssist.getAll)
routers.post("/assists", cAssist.add)
routers.get("/assists/:id", cAssist.show)
routers.put("/assists/:id", cAssist.update)
routers.delete("/assists/:id", cAssist.delete)



export default routers