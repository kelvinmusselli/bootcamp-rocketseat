Comandos Sequelize

CRIAR UMA MIGRATION
yarn sequelize migration:create --name=create-users
yarn sequelize migration:create --name=create-files
yarn sequelize migration:create --name=add-avatar-field-to-users

CONFIRMAR CRIAÇÃO DA MIGRATION
yarn sequelize db:migrate

DESFAZER UMA MIGRATION
yarn sequelize db:migration:undo

DESFAZER TODAS MIGRATIONS
yarn sequelize db:migration:undo:all
