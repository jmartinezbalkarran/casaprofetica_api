import { Router } from "express"
import cActivity from "../controllers/cActivity.js"

const routers = Router()

routers.get("/activities", cActivity.getAll)
routers.post("/activities", cActivity.add)
routers.get("/activities/:id", cActivity.show)
routers.put("/activities/:id", cActivity.update)
routers.delete("/activities/:id", cActivity.delete)

export default routers 