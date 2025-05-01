import { Router } from "express"

const routers = Router()

routers.get("/", async (req, res) => {
    res.json('Work It')
})
export default routers