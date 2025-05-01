import db from "../config/db.js"

const mGroup = {

    getAll: async () =>{
        
       const [results] = await db.query("SELECT * FROM `groups`")
       return results
    },
    getOne:async(id) => {
        const [results]= await db.query("SELECT * FROM `groups` WHERE id = ?",[id])
        return results[0]
    },
    getName:async(name) => {
        const [results]= await db.query("SELECT * FROM `groups` WHERE name = ?",[name])
        return results[0]
    },
    create:async(group) => {
        const [results] = await db.query("INSERT INTO `groups` (name, address, zone_id) VALUE (?, ?, ?)",
            [
            group.name,
            group.address,
            group.zone_id
            ])
        return results   
    },

    update:async(group, id) => {
        const [results] = await db.query("UPDATE `groups` SET name = ?, address = ?, zone_id = ? WHERE id = ?",
            [group.name,
             group.address,
             group.zone_id, 
             id
            ])
    },

    delete:async(id) => {
        const [results] = await db.query("DELETE FROM `groups` WHERE id = ? ",[id])
    }
    
}

export default mGroup