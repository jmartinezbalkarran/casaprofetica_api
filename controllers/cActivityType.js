import mActivityType from "../models/mActivityType.js"

const cActivityType ={

    getAll:async(req, res) => {
        let response = {
            status: true,
            error:[],
            data:null
        }

        response.data = await mActivityType.getAll()

        res.json(response)
    },

    add:async(req, res) => {
        let response = {
            status: true, 
            error: [],
            data: null
        }
        //obtener datos limpios
        let description = (req.body.description) ? req.body.description.trim() : null
    
        
        //validar los datos
        let error = []

        if (!description)error.push("El campo descripción es requerido")
        

        //respuesta de la validación de datos
        if (error.length > 0){
            response.status = false
            response.error = error
            res.status(422).json(response)
          return 
        }

        //guardado de datos
        const newActivityType = await mActivityType.create(description)
        let id = newActivityType.insertId

        //respuesta Json
        response.data = await mActivityType.getOne(id)
        res.json(response)
    },

    show:async(req, res) => {
        let response = {
            status: true, 
            error: [],
            data: null
        }

        let id = req.params.id
         const activityType = await mActivityType.getOne(id)

        // Validación de campos sencillos
          let error = []
           if(!activityType)error.push(`No se encontró ninguna actividad con el id:${id}`)

        // Respuesta de validación
          if(error.length > 0){
            response.status = false
            response.error = error
            res.status(422).json(response)
            return
          }

        response.data = activityType
        res.json(response)

    },

    update:async(req, res) => {
        let response = {
            status: true, 
            error: [],
            data: null
        }
        //obtener datos limpios
        let id = req.params.id
        let description = (req.body.description) ? req.body.description.trim() : null
        
        //validar los datos
        let error = []

        if (!description)error.push("El campo descripción es requerido")
      

        //respuesta de la validación de datos
        if (error.length > 0){
            response.status = false
            response.error = error
            res.status(422).json(response)
          return 
        }

        //guardado de datos
        const newActivity = await mActivityType.update(description,id)
        

        //respuesta Json
        response.data = await mActivityType.getOne(id)
        res.json(response)

    },

    delete:async(req, res) => {
        let response = {
            status: true, 
            error: [],
            data: null
        }

        let id = req.params.id
         const activity = await mActivityType.getOne(id)

        // Validación de campos sencillos
          let error = []
           if(!activity)error.push(`No se encontró ninguna actividad con el id:${id}`)

        // Respuesta de validación
          if(error.length > 0){
            response.status = false
            response.error = error
            res.status(422).json(response)
            return
          }
        // eliminación de datos
        response.data = activity
        await mActivityType.delete(id)

        //respuesta Json
        res.json(response)

    }
    

}

export default cActivityType