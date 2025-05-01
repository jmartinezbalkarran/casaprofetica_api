import 'dotenv/config'
import express from "express"
import swaggerUi from "swagger-ui-express"
import swaggerConfig from "./swagger/swagger.js"
import routeMain from "./route/routes.js"
import routeMember from "./route/rMember.js"
import routeGroups from "./route/rGroup.js"
import routeZones from "./route/rZone.js"
import routeMinistries from "./route/rMinistry.js"
import routeActivities from "./route/rActivity.js"
import routeActivityType from "./route/rActivityType.js"
import routeAssist from "./route/rAssist.js"
import routeMemberGroup from "./route/rMemberGroup.js"
const app = express()
const port = process.env._PORT


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig))

app.use(routeMain)
app.use(routeMember)
app.use(routeGroups)
app.use(routeZones)
app.use(routeMinistries)
app.use(routeActivities)
app.use(routeActivityType)
app.use(routeAssist)
app.use(routeMemberGroup)

app.listen(port, ()=>{
    console.log(`app staring in http://localhost:${port}`)
})