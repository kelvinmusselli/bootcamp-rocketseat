Criando e baixando um banco de dados com docker

EXECUTANDO DOCKER
-> docker run
-> docker stop database
-> docker start database

CRIAR UM BANCO
-> docker run --name database -e POSTGRESS_PASSWORD=docker -p 5432:5432 -d postgres

LISTA TODAS INSTANCIAS DO DOCKER EM REAL TIME
-> docker ps
-> docker ps -a

INSTALANDO MONGODB NO DOCKER
docker run --name mongobarber -p 27017:27017 -d -t mongo
