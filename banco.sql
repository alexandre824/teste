
create database website;
use website;
--
-- Banco de dados: `website`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `resenha`
--


CREATE TABLE `resenha`(
`idresenha` INT NOT NULL AUTO_INCREMENT,  
`nome` VARCHAR(45) NOT NULL, 
'texto' VARCHAR(45), 
'ano' INT NOT NULL,  
`urlimagem` VARCHAR(200) NOT NULL,   
`created_at` TIMESTAMP default current_timestamp,   PRIMARY KEY (`idresenha`)) 
ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

