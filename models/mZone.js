import db from "../config/db.js"

const mZone = {

    getAll:async() => {
        const [results] = await db.query("SELECT * FROM zones")
       return results
    },

    getOne:async(id) => {
        const [results] = await db.query("SELECT * FROM zones WHERE id = ?",[id])
        return results[0]
    },

    create:async(name) => {
        const [results] = await db.query("INSERT INTO zones (name) VALUE  (?) ",[name])
        return results
    },

    update:async(name,id) => {
        const [results] = await db.query("UPDATE zones SET name = ? WHERE id = ? ",[name, id])
        return results[0]
    },

    delete:async(id) => {
        const [results] = await db.query("DELETE FROM zones WHERE id = ? ", [id])
    }
    

}

export default mZone