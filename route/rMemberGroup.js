import { Router } from "express"
//import cMemberGroup from "../controllers/cMemberGroup.js"
import cMemberGroupR from "../controllers/cMemberGroup.js"


const routers = Router()

routers.post("/members-groups", cMemberGroupR.add)
routers.delete("/members-groups", cMemberGroupR.delete)

export default routers