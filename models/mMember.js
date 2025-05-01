import db from "../config/db.js"

const mMember = {
    getAll:async()=>{
        const [results] = await db.query("SELECT members. *, members_groups.group_id FROM members INNER JOIN members_groups ON members.id = members_groups.member_id ")

       return results
    },

    create:async(newMember)=>{
        const [results] = await db.query("INSERT INTO members (name, lastname, card) VALUE (?, ?, ?)",
            [
             newMember.name,
             newMember.lastname,
             newMember.card  
            ])
           
        return results
    },
    
    getOne:async(id)=>{
        const [results] = await db.query("SELECT members.*, members_groups.group_id FROM members INNER JOIN members_groups ON members.id = members_groups.member_id WHERE member_id = ?",[id])
        return results[0]
    },

    getOneCard: async(card)=>{
        const [results] = await db.query("SELECT * FROM members WHERE card = ?",[card])
        return results[0]
    },

    update:async(member,id)=>{

        const [results] = await db.query("UPDATE members SET name = ?, lastname = ?, card = ? WHERE id = ?",
            [
             member.name,
             member.lastname, 
             member.card,
             id
            ])
            
        return results
    },
    
    delete:async(id)=>{
        await db.query("DELETE FROM members WHERE id = ?", [id]) 
    }

}
 
export default mMember