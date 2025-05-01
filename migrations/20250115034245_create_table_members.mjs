export const up = async (knex) => {
    await knex.schema.createTable('members', (table) => {

      table.increments('id')
      table.string('name')
      table.string('lastname')
      table.string('card')
    })
  }
  
  export const down = async (knex) => {
    await knex.schema.dropTableIfExists('members')
  }