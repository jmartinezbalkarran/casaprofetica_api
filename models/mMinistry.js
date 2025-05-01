import db from "../config/db.js"


const mMinistry = {

    getAll:async() => {

        const [results] = await db.query("SELECT * FROM ministries")
        return results
    },

    getOne:async(id) => {

        const [results] = await db.query("SELECT * FROM ministries WHERE id = ?",[id])
        return results[0]
    },

    getName:async(name) => {

        const [results] = await db.query("SELECT * FROM ministries WHERE name = ?",[name])
        return results[0]
    },

    add:async(ministry) => {
        
        const [results] = await db.query("INSERT INTO ministries (name, description, opening_date) VALUE (?, ?, ?)",
            [
              ministry.name,
              ministry.description,
              ministry.opening_date 
            ])
        return results

    },

    update:async(ministry, id) => {
        
        const [results] = await db.query("UPDATE ministries SET name = ?, description = ?, opening_date = ? WHERE id = ?",
            [
                ministry.name,
                ministry.description,
                ministry.opening_date,
                id
            ])
        return results
    },
    delete:async(id) => {

        const [results] = await db.query("DELETE FROM ministries WHERE id = ? ",[id])
        return results

    }
   

}

export default mMinistry