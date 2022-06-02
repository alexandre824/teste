# projeto-web6

Projeto Parte 1

Passo 1. Crie o Banco de dados com o nome "database"

Comandos:

create database website;
use website;
CREATE TABLE `website`.`resenha` (  `idresenha` INT NOT NULL AUTO_INCREMENT,  `nome` VARCHAR(45) NOT NULL, texto VARCHAR(45), ano INT NOT NULL,  `urlimagem` VARCHAR(200) NOT NULL,   `created_at` TIMESTAMP default current_timestamp,   PRIMARY KEY (`idresenha`));

Passo 2. Execute no terminal os seguintes comandos:                                                                                                     
  1. Caso tenha o nodejs instalado pule esta etapa                                                                                                       
     Linux -> sudo apt-get install nodejs
  
  2. Instalar npm                                                                                          
     Linux -> sudo apt-get install npm                                                                                 
  Em seguida devemos instalar o express, ejs, mysql e consign                                                                  
     Linux -> npm install express                                                                                                          
     Linux -> npm install ejs                                                                                              
     Linux -> npm install mysql                                                                              
     Linux -> npm install consign                                                                   
  
  3. Agora dentro da pasta do projeto após ter instalado tudo o que é necessário e criado o banco de dados é necessário conferir o usuário e senha do banco de dados se eles estão certo.
     Após conferir, abra o terminal dentro da pasta e execute                                                                  
    Linux -> node app.js                                                  
    
    Entre no navegador: http://localhost:3000/
