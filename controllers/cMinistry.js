import mMinistry from "../models/mMinistry.js"
import dayjs from 'dayjs' 
const cMinistry = {

    getAll:async(req, res) => {
        
        let response = {
            status: true,
            error: [],
            data: null
        }
        //obtener datos DB
        response.data = await mMinistry.getAll()

        //formateo de fecha
        let date = response.data

        date.forEach(date => {    
        date.opening_date = dayjs(date.opening_date).format('YYYY-MM-DD')
        }); 

        //respuesta Json
        res.json(response)
    },
    
    add:async(req, res) => {

        let response = {
            status: true,
            error: [],
            data: null
        }

        //obtener datos limpios
        let name = (req.body.name) ? req.body.name.trim() : null
        let description = (req.body.description) ? req.body.description.trim() : null
        let stringDate = (req.body.opening_date) ? req.body.opening_date.trim() : null

        let dateDay =  dayjs(stringDate)
        let opening_date = dateDay.format("YYYY-MM-DD")
        


        // vieja version
       // const date = new Date(stringDate)
       // let opening_date = date.toISOString().slice(0,10)
        
        //validan sencilla los datos
        let error = []

        if (!name)error.push("El campo nombre es requerido")
        if (!description)error.push("El campo descripción es requerido")
        if (!opening_date)error.push("El campo fecha de apertura es requerido")  
            
        //validan complejas los datos
        let ministry = await mMinistry.getName(name)
        if (name && ministry) error.push("Ya existe un ministerio con este nombre")

        //respuesta de las validaciones de datos
        if (error.length > 0){
            response.status = false
            response.error = error
            
            res.status(422).json(response)
            return
        }

        
        //guardado de datos
        const newMinistry = await mMinistry.add({name, description, opening_date})
        let id = newMinistry.insertId
        response.data = await mMinistry.getOne(id)
        response.data.opening_date = dayjs(response.data.opening_date).format('YYYY-MM-DD')
        //respuesta Json

        res.json(response)

    },

    show:async(req, res) => {

        let response = {
            status: true,
            error: [],
            data: null
        }
        
        //obtención de datos
        let id = req.params.id

        //validar de los id y respuesta
        
        let ministry = await mMinistry.getOne(id)

        if (!ministry){
            response.status = false
            response.error =`No se encontró ningún ministerio con el id: ${id} `
            res.status(422).json(response)
            return
        }
        
       //respuesta Json
       response.data = ministry 
       response.data.opening_date = dayjs(response.data.opening_date).format('YYYY-MM-DD')
       res.json(response)
    },

    update:async(req, res) => {

        let response = {
            status: true,
            error: [],
            data: null
        }

        //obtener datos limpios
        let name = (req.body.name) ? req.body.name.trim() : null
        let description = (req.body.description) ? req.body.description.trim() : null
        let stringDate = (req.body.opening_date) ? req.body.opening_date.trim() : null

        const date = new Date(stringDate)
        let opening_date = date.toISOString().slice(0,10)
        
        
        let id = req.params.id

        //validan sencilla los datos
        let error = []

        if (!name)error.push("El campo nombre es requerido")
        if (!description)error.push("El campo descripción es requerido")
        if (!opening_date)error.push("El campo fecha de apertura es requerido")  
            
        //validan complejas los datos
        let ministryId = await mMinistry.getOne(id)
        if (!ministryId)error.push(`No se encontró ningún ministerio con el id: ${id} `)

        if (ministryId.name != name){

             let ministry = await mMinistry.getName(name)
            if (ministry) error.push("Ya existe un ministerio con este nombre")               
        }

        //respuesta de las validaciones de datos
        if (error.length > 0){
            response.status = false
            response.error = error
            
            res.status(422).json(response)
            return
        }

        
        //guardado de datos
        const upMinistry = await mMinistry.update({name, description, opening_date},id)
        response.data = await mMinistry.getOne(id)
        response.data.opening_date = dayjs(response.data.opening_date).format('YYYY-MM-DD')
        //respuesta Json

        res.json(response)
      
    },

    delete:async(req, res) => {

        let response = {
            status: true,
            error: [],
            data: null
        }
        
        //obtención de datos
        let id = req.params.id

        //validar de los id y respuesta
        
        let ministry = await mMinistry.getOne(id)

        if (!ministry){
            response.status = false
            response.error = `No se encontró ningún ministerio con el id: ${id} `
            res.status(422).json(response)
            return
        }

        //eliminación de los datos
        response.data = ministry
        response.data.opening_date = dayjs(response.data.opening_date).format('YYYY-MM-DD')
        await mMinistry.delete(id)

        //respuesta Json
        res.json(response)
        
    }
   

}

export default cMinistry
    
