import db from "../config/db.js"

const mAssist ={
    getAll:async() => {
        const [results] = await db.query("SELECT * FROM assists")
        return results
    },

    getOne:async(id) => {
        const [results] = await db.query(`SELECT * FROM assists WHERE id = ?`,[id])
        return results[0]
    },

    getMember:async(member_id) => {
        const [results] = await db.query("SELECT * FROM assists WHERE member_id = ?",[member_id])
        return results[0]
    },

    create:async(assist) => {
        const [results] = await db.query("INSERT INTO assists (activity_id, member_id, created_at, updated_at) VALUE (?, ?, ?, ?)",
            [
            assist.activity_id,
            assist.member_id,
            assist.created_at,
            assist.updated_at
            ])

        return results
    },


    update:async(assist, id) => {
        const [results] = await db.query("UPDATE assists SET activity_id = ? , member_id = ?, updated_at = ? WHERE id = ?",
            [
            assist.activity_id,
            assist.member_id,
            assist.updated_at,
            id
            ])

        return results
    },

    delete:async(id) => {
        const [results] = await db.query("DELETE FROM assists WHERE id = ? ",[id])
    }

}

export default mAssist