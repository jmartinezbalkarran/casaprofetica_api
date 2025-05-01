export const up = async (knex) => {
    await knex.schema.createTable('ministries', (table) => {
        
        table.increments('id')
        table.string('name')
        table.string('description')
        table.date('opening_date')
    })
  
};

export const down = async (knex) => {
    await knex.schema.dropTableIfExists('ministries')
  
};
