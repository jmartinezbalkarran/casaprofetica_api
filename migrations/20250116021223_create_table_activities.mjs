export const up = async (knex) => {
    await knex.schema.createTable('activities', (table) => {
        
        table.increments('id')
        table.date('start_date')
        table.date('end_date')
        table.time('start_time')
        table.time('end_time')
        table.string('address')
        table.integer('activity_type_id').unsigned()
        table.foreign('activity_type_id').references('id').inTable('activity_type')
    })
  
};

export const down = async (knex) => {
    await knex.schema.dropTableIfExists('activities')
  
};