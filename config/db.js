import 'dotenv/config'
import mysql from "mysql2/promise"

const pool = mysql.createPool({
    host: process.env._HOST,
    user: process.env._USER,
    password: process.env._PASSWORD,
    database: process.env._DATABASE,
    waitForConnections:true,
    connectionLimit:10,
    queueLimit:0
})

export default pool