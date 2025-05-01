export const up = async (knex) => {
    await knex.schema.createTable('zones', (table) => {
       
      table.increments('id')
        table.string('name')
    })
  
};

export const down = async (knex) => {
  await knex.schema.dropTableIfExists('zones')
};
