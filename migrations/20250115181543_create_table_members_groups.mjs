export const up = async (knex) => {
    await knex.schema.createTable('members_groups', (table) => {
        
        table.increments('id')
        table.integer('member_id')
        table.integer('group_id')
        table.datetime('created_at')
        table.datetime('updated_at')
    })
  
};

export const down = async (knex) => {
    await knex.schema.dropTableIfExists('members_groups')
  
};




