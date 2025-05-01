import dayjs from "dayjs"
import mAssist from "../models/mAssist.js"

const cAssist = {
    
    getAll:async(req, res) => {
        let response = {
            status:true,
            error:[],
            data: null
        }

        response.data = await mAssist.getAll()

        let date = response.data

        date.forEach(date => {    
        date.created_at = dayjs(date.created_at).format('YYYY-MM-DD HH:MM:ss')
        date.updated_at = dayjs(date.updated_at).format('YYYY-MM-DD HH:MM:ss')
        }); 

        res.json(response)  
    },

    add:async(req, res) => {
        let response = {
            status:true,
            error:[],
            data: null
        }

        let activity_id = parseInt( (req.body.activity_id) ? req.body.activity_id.trim(): null)
        let member_id = parseInt((req.body.member_id) ? req.body.member_id.trim(): null)
        let created_at = dayjs().format("YYYY-MM-DD HH:MM:ss")
        let updated_at = dayjs().format("YYYY-MM-DD HH:MM:ss")
        let error = []
        const member = await mAssist.getMember(member_id)
        

        
        if (!activity_id)error.push("El campo activity_id es requerido")
        if (!member_id)error.push("El campo member_id es requerido")
        if (member)error.push("Este miembro ya se encuentra en la asistencia")      
        
        if (error.length > 0){
            response.status = false
            response.error = error
            res.status(422).json(response)
            return
        }
        
        const newAssist = await mAssist.create({activity_id, member_id, created_at, updated_at})
        let id = newAssist.insertId
        response.data = await mAssist.getOne(id)

        response.data.created_at = dayjs(response.data.created_at).format('YYYY-MM-DD HH:MM:ss')
        response.data.updated_at = dayjs(response.data.updated_at).format('YYYY-MM-DD HH:MM:ss')
       
        res.json(response)  

    },

    show:async(req, res) => {
        let response = {
            status:true,
            error:[],
            data: null
        }

        let id = req.params.id 
       
        const assist = await mAssist.getOne(id)

        

        if (!assist){
           
            response.status = false
            response.error = `No se encontró ningún asistencia con el id: ${id} `

            res.status(422).json(response)
            return
        }
        
        response.data = assist

        response.data.created_at = dayjs(response.data.created_at).format('YYYY-MM-DD HH:MM:ss')
        response.data.updated_at = dayjs(response.data.updated_at).format('YYYY-MM-DD HH:MM:ss')

        res.json(response)  
    },

    update:async(req, res) => {
        let response = {
            status:true,
            error:[],
            data: null
        }

        let id = req.params.id
        let activity_id = parseInt( (req.body.activity_id) ? req.body.activity_id.trim(): null)
        let member_id = parseInt((req.body.member_id) ? req.body.member_id.trim(): null)
        let updated_at = dayjs().format('YYYY-MM-DD HH:mm:ss')
        const assist = await mAssist.getOne(id)
        let error = []

        if (!assist){
           
            response.status = false
            response.error = `No se encontró ningún asistencia con el id: ${id} `

            res.status(422).json(response)
            return
        }

        if (!activity_id)error.push("El campo activity_id es requerido")
        if (!member_id)error.push("El campo member_id es requerido")
        
        if (error.length > 0){
            response.status = false
            response.error = error
            res.status(422).json(response)
            return
        }

        const upAssist = await mAssist.update({activity_id, member_id, updated_at},id)
        
        response.data = await mAssist.getOne(id)

        response.data.created_at = dayjs(response.data.created_at).format('YYYY-MM-DD HH:MM:ss')
        response.data.updated_at = dayjs(response.data.updated_at).format('YYYY-MM-DD HH:MM:ss')
        
        res.json(response)  

    },

    delete:async(req, res) => {
        let response = {
            status:true,
            error:[],
            data: null
        }

        let id = req.params.id
        const assist = await mAssist.getOne(id)
        
        if (!assist){
            response.status = false
            response.error = `No se encontró ningún asistencia con el id: ${id} `

            res.status(422).json(response)
            return
        }

        response.data = assist
        await mAssist.delete(id)

        response.data.created_at = dayjs(response.data.created_at).format('YYYY-MM-DD HH:MM:ss')
        response.data.updated_at = dayjs(response.data.updated_at).format('YYYY-MM-DD HH:MM:ss')

        res.json(response)  


    }

    
}

export default cAssist