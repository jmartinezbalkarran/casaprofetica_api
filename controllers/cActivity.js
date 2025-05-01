import mActivity from "../models/mActivity.js"
import dayjs from "dayjs"

const cActivity ={

    getAll:async(req, res) => {
        let response = {
            status: true,
            error:[],
            data:null
        }

        response.data = await mActivity.getAll()

        let date = response.data

        date.forEach(date => {    
        date.start_date = dayjs(date.start_date).format('YYYY-MM-DD')
        date.end_date = dayjs(date.end_date).format('YYYY-MM-DD')
        }); 

        

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
        let start_date_string = (req.body.start_date) ? req.body.start_date.trim() : null
        let end_date_string = (req.body.end_date) ? req.body.end_date.trim() : null
        let start_time_string = (req.body.start_time) ? req.body.start_time.trim() : null
        let end_time_string = (req.body.end_time) ? req.body.end_time.trim() : null
        let address = (req.body.address) ? req.body.address.trim() : null
        let activity_type_id = parseInt((req.body.activity_type_id) ? req.body.activity_type_id.trim() : null)

        //transformaron de fechas y tiempo
        let start_dateDay = dayjs(start_date_string)
        let start_date = start_dateDay.format("YYYY-MM-DD")

        let end_dateDay = dayjs(end_date_string)
        let end_date = end_dateDay.format("YYYY-MM-DD")

        let start_timeDay = dayjs("0000-00-00"+start_time_string)
        let start_time = start_timeDay.format("HH:MM:ss")

        let end_timeDay = dayjs("0000-00-00"+end_time_string)
        let end_time = end_timeDay.format("HH:MM:ss")
        
        //validar los datos
        let error = []

        if (!description)error.push("El campo descripción es requerido")
        if (!start_date)error.push("El campo fecha de inicio es requerido")
        if (!end_date)error.push("El campo fecha de culminación es requerido") 
        if (!start_time)error.push("El campo hora de inicio es requerido")
        if (!end_time)error.push("El campo hora de culminación es requerido")
        if (!address)error.push("El campo dirección es requerido")
        if (!activity_type_id)error.push("El campo tipo de actividades es requerido")

        //respuesta de la validación de datos
        if (error.length > 0){
            response.status = false
            response.error = error
            res.status(422).json(response)
          return 
        }

        //guardado de datos
        const newActivity = await mActivity.create({description, start_date, end_date, start_time, end_time, address, activity_type_id})
        let id = newActivity.insertId

        //respuesta Json
        response.data = await mActivity.getOne(id)
        response.data.start_date = dayjs(response.data.start_date).format('YYYY-MM-DD')
        response.data.end_date = dayjs(response.data.end_date).format('YYYY-MM-DD')
        res.json(response)
    },

    show:async(req, res) => {
        let response = {
            status: true, 
            error: [],
            data: null
        }

        let id = req.params.id
         const activity = await mActivity.getOne(id)

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

        response.data = activity
        response.data.start_date = dayjs(response.data.start_date).format('YYYY-MM-DD')
        response.data.end_date = dayjs(response.data.end_date).format('YYYY-MM-DD')
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
        let start_date_string = (req.body.start_date) ? req.body.start_date.trim() : null
        let end_date_string = (req.body.end_date) ? req.body.end_date.trim() : null
        let start_time_string = (req.body.start_time) ? req.body.start_time.trim() : null
        let end_time_string = (req.body.end_time) ? req.body.end_time.trim() : null
        let address = (req.body.address) ? req.body.address.trim() : null
        let activity_type_id = parseInt((req.body.activity_type_id) ? req.body.activity_type_id.trim() : null)

        //transformaron de fechas y tiempo
        let start_dateDay = dayjs(start_date_string)
        let start_date = start_dateDay.format("YYYY-MM-DD")

        let end_dateDay = dayjs(end_date_string)
        let end_date = end_dateDay.format("YYYY-MM-DD")

        let start_timeDay = dayjs("0000-00-00"+start_time_string)
        let start_time = start_timeDay.format("HH:MM:ss")

        let end_timeDay = dayjs("0000-00-00"+end_time_string)
        let end_time = end_timeDay.format("HH:MM:ss")

         
        //validar los datos
        let error = []

        if (!description)error.push("El campo descripción es requerido")
        if (!start_date)error.push("El campo fecha de inicio es requerido")
        if (!end_date)error.push("El campo fecha de culminación es requerido") 
        if (!start_time)error.push("El campo hora de inicio es requerido")
        if (!end_time)error.push("El campo hora de culminación es requerido")
        if (!address)error.push("El campo dirección es requerido")
        if (!activity_type_id)error.push("El campo tipo de actividades es requerido")  

        //respuesta de la validación de datos
        if (error.length > 0){
            response.status = false
            response.error = error
            res.status(422).json(response)
          return 
        }

        //guardado de datos
        const newActivity = await mActivity.update({description, start_date, end_date, start_time, end_time, address,activity_type_id},id)

        //respuesta Json
        response.data = await mActivity.getOne(id)
        response.data.start_date = dayjs(response.data.start_date).format('YYYY-MM-DD')
        response.data.end_date = dayjs(response.data.end_date).format('YYYY-MM-DD')
        res.json(response)

    },

    delete:async(req, res) => {
        let response = {
            status: true, 
            error: [],
            data: null
        }

        let id = req.params.id
         const activity = await mActivity.getOne(id)

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
        response.data.start_date = dayjs(response.data.start_date).format('YYYY-MM-DD')
        response.data.end_date = dayjs(response.data.end_date).format('YYYY-MM-DD')
        await mActivity.delete(id)

        //respuesta Json
        res.json(response)

    }
    

}

export default cActivity