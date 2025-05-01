import db from "../config/db.js"

const mActivity = {
    getAll:async() => {

        const [results] = await db.query("SELECT * FROM activities")
        return results
    },

    getOne:async(id) =>{
        
        const [results] = await db.query("SELECT * FROM activities WHERE id = ?",[id])
        return results[0]
    },

    create:async(activity) =>{

        const [results] = await db.query(
            "INSERT INTO activities (description, start_date, end_date, start_time, end_time, address, activity_type_id) VALUE (?, ?, ?, ?, ?, ? ,?)",
        [
            activity.description,
            activity.start_date, 
            activity.end_date,
            activity.start_time,
            activity.end_time, 
            activity.address,
            activity.activity_type_id
        ])
        return results
    },

    update:async(activity,id) => {
        const [results] = await db.query(
            "UPDATE activities SET description = ?, start_date = ?, end_date = ?, start_time = ?, end_time = ?, address = ?, activity_type_id = ? WHERE id = ?",
        [
            activity.description,
            activity.start_date, 
            activity.end_date,
            activity.start_time,
            activity.end_time, 
            activity.address,
            activity.activity_type_id,
            id 
        ])
        return results

    },

    delete:async(id) => {
        await db.query("DELETE FROM activities WHERE id = ?",[id])
    }

    

}

export default mActivity