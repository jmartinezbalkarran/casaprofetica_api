import db from "../config/db.js"

const mMemberGroup ={

    create:async(member_group) => {
        const [results] = await db.query("INSERT INTO members_groups (member_id, group_id, created_at, updated_at) VALUE (?, ?, ?, ?)",
            [
                member_group.member_id,
                member_group.group_id,
                member_group.created_at,
                member_group.updated_at

            ])

            return results
    },

    getGroupId:async(member_id) => {
        const [results] = await db.query("SELECT * FROM members_groups WHERE member_id = ?",[member_id])
        return results[0] 
    },

    getGMid:async(member_id, group_id) => {
        const [results] = await db.query("SELECT * FROM members_groups WHERE member_id = ? AND group_id = ?",[member_id, group_id])
        return results[0] 
    },

    

    getGroups:async() => {
        const [results] = await db.query("SELECT * FROM members_groups")
        return results
    },


    update:async(record, member_id) => {   
        const [results] = await db.query("UPDATE members_groups SET group_id = ?, updated_at = ? WHERE member_id = ?",
            [
                record.group_id,
                record.updated_at,
                member_id
            ])
            return results
    },

    delete:async(member_id) => {
        const [results] = await db.query("DELETE FROM members_groups WHERE member_id = ?",[member_id])
    }
}

export default mMemberGroup