
import mMember from "../models/mMember.js"
import mMemberGroup from "../models/mMemberGroup.js"
import mGroup from "../models/mGroup.js"
import dayjs from "dayjs"

const cMember ={

    getAll:async(req, res)=>{
        let response = {
            status: true,
            errors: [],
            data: null
        }

        response.data  = await mMember.getAll()
        
        res.json(response)

    },
    
    add:async(req,res) => {
        let response = {
            status: true,
            errors: [],
            data: null
        }

        // Obtener datos limpios
        let name = (req.body.name) ? req.body.name.trim() : null
        let lastname = (req.body.lastname) ? req.body.lastname.trim() : null
        let card = (req.body.card) ? req.body.card.trim() : null
        let group_id = parseInt((req.body.group_id) ? req.body.group_id.trim() : null)
        let created_at = dayjs().format("YYYY-MM-DD HH:MM:ss") 
        let updated_at = dayjs().format("YYYY-MM-DD HH:MM:ss")

       // Validación de campos sencillos
        let errors = []
        if (!name) errors.push("El campo name es requerido")
        if (!lastname) errors.push("El campo lastname es requerido")
        if (!card) errors.push("El campo card es requerido") 
        if (!group_id) errors.push("El campo group_id es requerido")

        // Validación de campos personalizados
        const db_card = await mMember.getOneCard(card)
        if (card != "" && db_card) errors.push("Esta card ya existe") 

        if (group_id){
            const groups = await mGroup.getOne(group_id)

            if (!groups){
            response.status = false
            response.errors = `No se encontró ningún grupo con el id:${group_id}`
            res.status(422).json(response)
            return  
            }
        }
       
        // Respuesta de validación
        if (errors.length > 0) {
            response.status = false
            response.errors = errors
            res.status(422).json(response)
            return
        }
        // Guardado de datos
        let results = await mMember.create({name, lastname, card})
        let member_id = results.insertId

        await mMemberGroup.create({member_id, group_id, created_at, updated_at})

        response.data = await mMember.getOne(member_id)
        // Respuesta json
        res.json(response)   
    },
   
    show:async(req, res) => {
       
        let errors = []
        let response = {
            status: true,
            errors: [],
            data: null
        }
        
        let id = req.params.id
        const member = await mMember.getOne(id)

        // Validación de campos sencillos
        if (!member)errors.push(`No existe ningún miembro con el id ${id}`)

        // Respuesta de validación
        if (errors.length > 0) {
            response.status = false
            response.errors = errors
            res.status(422).json(response)
            return
        } 
        // Respuesta json
        
        response.data = member
        res.json(response) 
    },

    update:async(req, res) => {
        let response = {
            status: true,
            errors: [],
            data: null
        }
        
        // Obtener datos limpios
        let id = req.params.id
        let name = (req.body.name) ? req.body.name.trim() : null
        let lastname = (req.body.lastname) ? req.body.lastname.trim() : null
        let card = (req.body.card) ? req.body.card.trim() : null
        let group_id = parseInt((req.body.group_id) ? req.body.group_id.trim() : null)
        let updated_at = dayjs().format("YYYY-MM-DD HH:MM:ss")
        let members = await mMember.getOne(id)
        
        // Validación sencilla
        
        let errors =[]

        if(!members)errors.push(`No existe ningún miembro con el id ${id}`)
        if (!name) errors.push("El campo name es requerido")
        if (!lastname) errors.push("El campo lastname es requerido")
        if (!card) errors.push("El campo card es requerido") 

        // Validación de campos personalizados
       
        if (members && card != members.card){

            const db_card = await mMember.getOneCard(card)

            if (db_card){
                errors.push("Esta  card ya existe")
                response.status = false
                response.errors = errors
                res.status(422).json(response)
                return    
            }    
        }

        if (group_id){
            const groups = await mGroup.getOne(group_id)
            
            if (!groups){
            response.status = false
            response.errors = `No se encontró ningún grupo con el id:${group_id}`
            res.status(422).json(response)
            return  
            }

            
        }
        
       // Respuesta de validación
       if (errors.length > 0) {
            response.status = false
            response.errors = errors
            res.status(422).json(response)
         return
       } 

        // Guardado de datos
        
        await mMember.update({name, lastname, card},id)
        response.data = await mMember.getOne(id)

        const group = await mMemberGroup.getGroupId(id)

         if (group_id && group_id != group.group_id){
             await mMemberGroup.update({group_id, updated_at}, id)
             const newGroup =await mMemberGroup.getGroupId(id)
             response.data.groups = newGroup.group_id 
            res.json(response)
            return   
        }
        
        // Respuesta json
        res.json(response)  
    },

    delete:async(req, res) => {

        // Obtener datos limpios
        let errors = []
        let response = {
            status: true,
            errors: [],
            data: null
        }

        let id = req.params.id
        let member = await mMember.getOne(id)
        
        // Validación de campos sencillos
        if (!member)errors.push(`No existe ningún miembro con el id ${id}`)

        // Respuesta de validación
        if (errors.length > 0) {
            response.status = false
            response.errors = errors
            res.status(422).json(response)
            return
        } 
         // Eliminar miembro   
        response.data = member

        await mMember.delete(id)
        await mMemberGroup.delete(id)
            
        res.json(response) 
    }

}

export default cMember