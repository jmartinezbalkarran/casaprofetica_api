import mMemberGroup from "../models/mMemberGroup.js"
import mGroup from "../models/mGroup.js"
import mMember from "../models/mMember.js"
import dayjs from "dayjs"


const cMemberGroup = {

    add:async(req, res) => {

        let response = {
            status: true,
            errors: [],
            data: null
        }

        let member_id = parseInt((req.body.member_id) ? req.body.member_id.trim() : null)
        let group_id = parseInt((req.body.group_id) ? req.body.group_id.trim() : null)
        let created_at = dayjs().format("YYYY-MM-DD HH:MM:ss") 
        let updated_at = dayjs().format("YYYY-MM-DD HH:MM:ss")
        
        
        let errors = []
        if (!member_id) errors.push("El campo member_id es requerido")
        if (!group_id) errors.push("El campo group_id es requerido")

        if (member_id && group_id){

            let member = await mMember.getOne(member_id)
            let group = await mGroup.getOne(group_id)
            let member_group = await mMemberGroup.getGroupId(member_id)

            if (!member)errors.push(`No existe ningún Member con el id ${member_id}`)
            if (!group)errors.push(`No existe ningún Group con el id ${group_id}`)
            if (member_group)errors.push(`El Miembro ${member_id} ya se pertenece un grupo`)
        }

                      
        if (errors.length > 0) {
            response.status = false
            response.errors = errors
            res.status(422).json(response)
            return
        }
        

        const newMemberGroup = await mMemberGroup.create({member_id, group_id, created_at, updated_at})
        let id = newMemberGroup.insertId
      
        response.data = await mMemberGroup.getGroupId(member_id)
        
        res.json(response)
    },

   
    delete:async(req, res) => {
        let response = {
            status: true,
            errors: [],
            data: null
        }

        let member_id = parseInt((req.body.member_id) ? req.body.member_id.trim() : null)
        let group_id = parseInt((req.body.group_id) ? req.body.group_id.trim() : null)
              
        
        let errors = []

        if (!member_id) errors.push("El campo member_id es requerido")
        if (!group_id) errors.push("El campo group_id es requerido")
            
        if (member_id && group_id){
            let member_group = await mMemberGroup.getGMid(member_id, group_id)
            if (!member_group)errors.push("No se encontró registro asociado a esos datos")
        }

    
        if (errors.length > 0) {
            response.status = false
            response.errors = errors
            res.status(422).json(response)
            return
        }

        response.data = await mMemberGroup.getGroupId(member_id)
        await mMemberGroup.delete(member_id)
        res.json(response)
    }
}

export default cMemberGroup
