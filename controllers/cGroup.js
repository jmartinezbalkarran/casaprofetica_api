import mGroup from "../models/mGroup.js"



const cGroup = {

    getAll:async(req, res) => {
        let response ={
            status:true,
            error:[],
            data: null
        }

        response.data = await mGroup.getAll()

        res.json(response)
    },

    add:async(req, res) => {
        let response = {
            status:true,
            error:[],
            data:null
        }

        // Obtener datos limpios
        let name = (req.body.name) ? req.body.name.trim(): null
        let address = (req.body.address) ? req.body.address.trim():null
        let zone_id = parseInt((req.body.zone_id) ? req.body.zone_id.trim():null)
        
        // Validación de campos sencillos
        let error = []
       

        if(!name)error.push("El campo name es requerido")
        if(!address)error.push("El campo address es requerido")
        if(!zone_id)error.push("El campo zone_id es requerido")       
       
        // Validación de campos personalizados
        const db_name = await mGroup.getName(name)
        if(name != ""&& db_name)error.push("Ya esta registrado un grupo con este nombre") 
        
        // Respuesta de validación
        if(error.length > 0){
            response.status = false
            response.error = error
            res.status(422).json(response)
            return  
        }
           
        // Guardado de datos
        const newGroup = await mGroup.create({name, address, zone_id})
        let id = newGroup.insertId
        response.data = await mGroup.getOne(id)

        
        // Respuesta json

        res.json(response)
    },

    show:async(req, res) => {
        let response = {
            status:true,
            error:[],
            data:null
        }
         let id = req.params.id
         const group = await mGroup.getOne(id)

        // Validación de campos sencillos
          let error = []
           if(!group)error.push(`No se encontró ningún grupo con el id:${id}`)

        // Respuesta de validación
          if(error.length > 0){
            response.status = false
            response.error = error
            res.status(422).json(response)
            return
          }
       
        // Respuesta json
        response.data = group
        res.json(response)
    },

    update:async(req, res) => {
        
        let response = {
            status:true,
            error:[],
            data:null
        }

        // Obtener datos limpios
        let id = req.params.id
        let name = (req.body.name) ? req.body.name.trim():null
        let address = (req.body.address) ? req.body.address.trim():null
        let zone_id = parseInt((req.body.zone_id) ? req.body.zone_id.trim():null)
        let group = await mGroup.getOne(id)

        // Validación sencilla
        let error = []
        
        if(!group){
            error.push(`No se encontró ningún grupo con el id:${id}`)
            response.status = false
            response.error = error
            res.status(422).json(response)
            return  
        }

        if(!name)error.push("El campo nombre es requerido")   
        if(!address)error.push("El campo dirección es requerido")  
        if(!zone_id)error.push("El campo zone_id es requerido")

        // Validación de campos personalizados
        
        if (group.name != name){
            let db_name = await mGroup.getName(name)
            if(db_name)error.push("Ya esta registrado un grupo con este nombre")
        }
    
          
        // Respuesta de validación

        if(error.length > 0 ){
            response.status = false
            response.error = error
            res.status(422).json(response)
            return
        }
        
  
        // Guardado de datos
        const upGroup = await mGroup.update({name, address, zone_id},id)
        response.data = await mGroup.getOne(id)
        
        // Respuesta json

        res.json(response)

         

        
    },

    delete:async(req, res) => {
        let response = {
            status:true,
            error:[],
            data:null
        }
        
        //obtención de dato
        let id = req.params.id

        //validación sencilla y su respuesta
        const grupo = await mGroup.getOne(id)
        
        if(!grupo){
            response.status = false
            response.error.push(`No se encontró ningún grupo con el id:${id}`)
            res.status(422).json(response)
            return
        }

        // eliminación del grupo  
        response.data = grupo
        await mGroup.delete(id)

        //Respuesta Json
        res.json(response)
    }

}

export default cGroup