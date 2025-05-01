import db from "../config/db.js"

const mActivityType = {
    getAll:async() => {

        const [results] = await db.query("SELECT * FROM activity_type")
        return results
    },

    getOne:async(id) =>{
        
        const [results] = await db.query("SELECT * FROM activity_type WHERE id = ?",[id])
        return results[0]
    },

    create:async(description) =>{

        const [results] = await db.query(
            "INSERT INTO activity_type (description) VALUE (?)",[description])
        return results
    },

    update:async(description,id) => {
        const [results] = await db.query(
            "UPDATE activity_type SET description = ? WHERE id = ?",[description,id])
        return results

    },

    delete:async(id) => {
        await db.query("DELETE FROM activity_type WHERE id = ?",[id])
    }

    

}

export default mActivityType