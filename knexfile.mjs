// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
import 'dotenv/config'
export default {

  development: {
    client: process.env._CLIENT,  // Usa 'mysql2' si estás usando el paquete 'mysql2'
    connection: {
      host: process.env._HOST,
      user: process.env._USER,  // Cambia esto por tu usuario
      password: process.env._PASSWORD,  // Cambia esto por tu contraseña
      database: process.env._DATABASE,  // Nombre de la base de datos
      port: process.env._PORT_DB  // Puerto por defecto para MySQL
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',  // Nombre de la tabla para migraciones
      loadExtensions: ['.mjs'],
    }
  },

  staging: {
    client: 'mysql',  // También puedes usar 'mysql2' en staging
    connection: {
      host: 'staging_host',
      user: 'staging_user',
      password: 'staging_password',
      database: 'staging_db',
      port: 3306
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'mysql',  // En producción también 'mysql2'
    connection: {
      host: 'production_host',
      user: 'production_user',
      password: 'production_password',
      database: 'production_db',
      port: 3306
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
