import { json } from "express"
import mZone from "../models/mZone.js" 

const cZone = {

    getAll:async(req, res) => {

        let response = {
            status: true,
            error: [],
            data: null
        }

        response.data = await mZone.getAll()
        
        res.json(response)
    },

    add:async(req, res) => {

        let response = {
            status: true,
            error: [],
            data: null
        }

        //obtención y limpieza de datos 
        let name = (req.body.name) ? req.body.name.trim() : null
        
        //Validación y Respuesta de datos
       
        if(!name){
            response.status = false
            response.error = "El campo name es requerido"  
            res.status(422).json(response)
            return
        }
       
        const newZone = await mZone.create(name)
        let id = newZone.insertId
        response.data = await mZone.getOne(id)
 
        res.json(response)
    },

    show:async(req, res) => {
        
        let response = {
            status: true,
            error: [],
            data: null
        }

        let id = req.params.id
        const zone = await mZone.getOne(id)

        if(!zone){
            response.status = false
            response.error = `NO se encontró ninguna zona con el id:${id}`
            res.status(422).json(response)
            return
        }

        response.data = zone

        res.json(response)
    },

    update:async(req, res) => {


        let response = {
            status: true,
            error: [],
            data: null
        }

        //obtención y limpieza de datos
        let id = req.params.id
        let name = (req.body.name) ? req.body.name.trim() : null
        let zone = await mZone.getOne(id)

        //validación datos
        let error = []
        
        if(!zone)error.push(`NO se encontró ninguna zona con el id:${id}`)
        if(!name)error.push("El campo nombre es requerido")

        //respuesta de validación de datos
        if (error.length > 0 ){
            response.status = false
            response.error = error
            res.status(422).json(response)
            return
        }

        //Guardado de datos

        const upZone = await mZone.update(name, id)
        response.data = await mZone.getOne(id)


        //respuesta Json

        res.json(response)
    },

    delete:async(req, res) => {
       
        let response = {
            status:false,
            error:[],
            data: null
        }    

        // obtención de datos 
        let id = req.params.id
        let zone = await mZone.getOne(id)

        //validación y su respuesta
        if(!zone){
            response.status = false
            response.error = `NO se encontró ninguna zona con el id:${id}`
            return res.status(422).json(response)
        }

        // Eliminando datos 
        
        response.data = zone
        await mZone.delete(id)
        
        //respuesta Json

        res.json(response)
    }

    
}    

export default cZone