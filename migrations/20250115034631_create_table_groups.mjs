export const up = async(knex) => {
    await knex.schema.createTable('groups',(table) => {
        
        table.increments('id')
        table.string('name')
        table.string('address')
        table.integer('zone_id')
    })
}

export const down = async (knex) => {
    await knex.schema.dropTableIfExist('groups')
}