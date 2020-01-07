# Express-REST-API

# Prepare for code
1. Install nodemon with following command
```
npm i -g nodemon
```
2. Copy `.env.example` to `.env` with following command
```
cp .env.example .env
```
3. Add value to field without doube-quote(`""`) or single-quote(`''`) in file `.env`

# For Migration & Seeder
1. Install knex cli with following command
```
npm i -g knex
```
2. Go to database directory with following command
```
cd database
```
3. Create migration with following command
```
knex migrate:make migrate_table_name
```
4. Code create table with following example in function of `exports.up` and see other attribute in [Knex](http://knexjs.org/#Schema-Building)
```javascript
return knex.schema.createTable('table_name', function (table) {
    table.increments('id')
    table.string('filed')
})
```
5. Migrate table with following command
```
knex migrate:latest
```
6. Create seed with following command
```
knex seed:make seed_name
```
7. Change data in seed.

For this project, it already install faker for mock data.

You can copy the following code and paste it at the top of seed file.

You can read how to use it in [facker](https://github.com/Marak/Faker.js)
```javascript
const faker = require('faker')
```
8. Run seed with following command
```
knex seed:run
```
# Project Structure
- :file_folder: app 
    - this directory will contain all of the application logic.
    - :file_folder: controllers
        - this is where the controllers are defined.
        - all controllers have to do with CRUD actions on Models.
    - :file_folder: lib
        - this is where the configuration's libraries are defined.
    - :file_folder: models
        - this is where the models are defined.
        - all models have to do CRUD actions.
    - :file_folder: routes
        - this is where the application's routes are defined.
        - :page_facing_up: index.js
            - this is main route file for collect any route file in routes folder
- :file_folder: database
    - this directory will contain files and folder for build API's database.
    - :file_folder: migrations
        - the migrations is automatic generated by knex command for create migrate file.
    - :file_folder: seeds
        - the seeds is automatic generated by knex command for create seed file.
    - :page_facing_up: knexfile.js
        - this contain database configuration.
- :page_facing_up: index.js
    - this is main project file.
    - it contain configuration of express js.
- :page_facing_up: package.json
    - this contain node configuration include dependencies.