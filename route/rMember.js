import { Router } from "express";
import cMember from "../controllers/cMember.js"

const routers = Router()

routers.get("/members", cMember.getAll)
routers.post("/members", cMember.add)
routers.get("/members/:id", cMember.show)
routers.put("/members/:id", cMember.update)
routers.delete("/members/:id", cMember.delete)

export default routers