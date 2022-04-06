# Database summary

## Commands
* npx sequelize model:generate --name <<model name>> --attributes name:string,email:string,userId:integer
* npx sequelize seed:generate --name <<name of seed>>
* npx dotenv sequelize db:migrate
* npx dotenv sequelize db:seed:all
>* npx dotenv sequelize db:migrate:undo:all
>* npx dotenv sequelize db:seed:undo:all

## Associations
### One to Many Relationship
* ex. Comments.belondsTo(models.Users, {foreignKey: 'userId'})
* ex. Users.hasMany(models.Comments, {foreignKey: 'userId'})

* (inside of models)

```
userId: {
    allowNull: false,
    type: DataTypes.INTEGER
    references: { model: 'Users'}
}
```
