export const up = async (knex) => {
    await knex.schema.createTable('assists', (table) => {
        
        table.increments('id')
        table.integer('activity_id')
        table.integer('member_id')
        table.timestamp('created_at')
        table.timestamp('updated_at')
    })
  
};

export const down = async (knex) => {
    await knex.schema.dropTableIfExists('assists')
  
};