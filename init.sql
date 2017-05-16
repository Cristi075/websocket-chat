-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema project
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `project` ;

-- -----------------------------------------------------
-- Schema project
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `project` DEFAULT CHARACTER SET utf8 ;
USE `project` ;

-- -----------------------------------------------------
-- Table `project`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `project`.`User` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `fullName` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `project`.`Conversation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `project`.`Conversation` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `project`.`Role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `project`.`Role` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `project`.`Message`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `project`.`Message` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `content` VARCHAR(200) NULL,
  `type` VARCHAR(45) NULL,
  `sentAt` DATE NULL,
  `authorId` INT NOT NULL,
  `conversationId` INT NOT NULL,
  PRIMARY KEY (`id`, `authorId`, `conversationId`),
  INDEX `fk_Message_User1_idx` (`authorId` ASC),
  INDEX `fk_Message_Conversation1_idx` (`conversationId` ASC),
  CONSTRAINT `fk_Message_User1`
    FOREIGN KEY (`authorId`)
    REFERENCES `project`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Message_Conversation1`
    FOREIGN KEY (`conversationId`)
    REFERENCES `project`.`Conversation` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `project`.`User_has_Role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `project`.`User_has_Role` (
  `User_id` INT NOT NULL,
  `Role_id` INT NOT NULL,
  PRIMARY KEY (`User_id`, `Role_id`),
  INDEX `fk_User_has_Role_Role1_idx` (`Role_id` ASC),
  INDEX `fk_User_has_Role_User_idx` (`User_id` ASC),
  CONSTRAINT `fk_User_has_Role_User`
    FOREIGN KEY (`User_id`)
    REFERENCES `project`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_User_has_Role_Role1`
    FOREIGN KEY (`Role_id`)
    REFERENCES `project`.`Role` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `project`.`Conversation_has_User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `project`.`Conversation_has_User` (
  `conversationId` INT NOT NULL,
  `userId` INT NOT NULL,
  PRIMARY KEY (`conversationId`, `userId`),
  INDEX `fk_Conversation_has_User_User1_idx` (`userId` ASC),
  INDEX `fk_Conversation_has_User_Conversation1_idx` (`conversationId` ASC),
  CONSTRAINT `fk_Conversation_has_User_Conversation1`
    FOREIGN KEY (`conversationId`)
    REFERENCES `project`.`Conversation` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Conversation_has_User_User1`
    FOREIGN KEY (`userId`)
    REFERENCES `project`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;



INSERT INTO `project`.`user` (`username`, `password`, `fullName`) VALUES ('admin', 'admin', 'Administrator');
INSERT INTO `project`.`user` (`username`, `password`, `fullName`) VALUES ('user1', 'user1', 'UserOne');
INSERT INTO `project`.`user` (`username`, `password`, `fullName`) VALUES ('user2', 'user2', 'UserTwo');
INSERT INTO `project`.`user` (`username`, `password`, `fullName`) VALUES ('user3', 'user3', 'UserThree');

INSERT INTO `project`.`role` (`name`) VALUES ('ADMIN');
INSERT INTO `project`.`role` (`name`) VALUES ('USER');

INSERT INTO `project`.`user_has_role` (`User_id`, `Role_id`) VALUES ('1', '1');
INSERT INTO `project`.`user_has_role` (`User_id`, `Role_id`) VALUES ('2', '2');
INSERT INTO `project`.`user_has_role` (`User_id`, `Role_id`) VALUES ('3', '2');
INSERT INTO `project`.`user_has_role` (`User_id`, `Role_id`) VALUES ('4', '2');