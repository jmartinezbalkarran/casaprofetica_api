import 'dotenv/config'
import swaggerJSDoc from "swagger-jsdoc"


const port = process.env._PORT
const options = {
    definition:{
        openapi: "3.1.1",

        info:{
        title: "Casa Profética",
        version: "1.0.0",
        description: "Documentación de la API"
    },

    serve: [
         {
            url: port
         }
        ],

    },

    apis:["./swagger/*.yaml"]
}

const swaggerConfig = swaggerJSDoc(options)

export default swaggerConfig