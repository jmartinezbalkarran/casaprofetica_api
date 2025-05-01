export const up = async (knex) => {
    await knex.schema.createTable('activity_type', (table) => {
        
        table.increments('id')
        table.string('description')
    })
  
};

export const down = async (knex) => {
    await knex.schema.dropTableIfExists('activity_type')
  
};