GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'root';
flush privileges;

CREATE DATABASE IF NOT EXISTS placer;

USE placer;
SET foreign_key_checks = 0;

-- MySQL dump 10.13  Distrib 5.7.23, for macos10.13 (x86_64)
--
-- Host: 127.0.0.1    Database: placer
-- ------------------------------------------------------
-- Server version	5.7.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account` (
                           `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
                           `state` varchar(255) NOT NULL DEFAULT '',
                           `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
                           `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                           `email` varchar(255) NOT NULL,
                           `password` varchar(255) NOT NULL,
                           `level` int(11) NOT NULL DEFAULT '0',
                           `salt` varchar(255) NOT NULL,
                           PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (1,'NORMAL','2021-08-30 10:33:24','2021-08-31 12:04:31','master','c09a3445f14c150867cca76b435ea82f3f6232e6da665f692a3c5901f65b7d81',100,'KEY1'),(2,'NORMAL','2021-08-30 10:33:24','2021-08-31 12:04:24','test','ff04ca62f807f2567885033fcc7d398206a46c367832bd81c683c219f5f30a2d',0,'KEY2');
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `group`
--

DROP TABLE IF EXISTS `group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `group` (
                         `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
                         `type` varchar(255) NOT NULL DEFAULT '',
                         `state` varchar(255) NOT NULL DEFAULT '',
                         `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
                         `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                         `parent_id` int(10) DEFAULT NULL,
                         `title` varchar(255) NOT NULL,
                         `color` varchar(255) DEFAULT NULL,
                         `sequence` int(10) NOT NULL DEFAULT '0',
                         PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group`
--

LOCK TABLES `group` WRITE;
/*!40000 ALTER TABLE `group` DISABLE KEYS */;
INSERT INTO `group` (`id`, `type`, `state`, `created_at`, `updated_at`, `parent_id`, `title`, `color`, `sequence`) VALUES
(1, 'LEVEL_1', 'NORMAL', '2021-08-29 08:48:35', '2021-08-29 08:50:03', NULL, '개발실', '#000000', 0),
(2, 'LEVEL_2', 'NORMAL', '2021-08-29 08:48:35', '2021-08-31 22:50:13', 1, '1팀', '#7A8B99', 1),
(3, 'LEVEL_2', 'NORMAL', '2021-08-29 08:48:35', '2021-08-31 22:50:19', 1, '2팀', '#FE5F55', 2),
(4, 'LEVEL_2', 'NORMAL', '2021-08-29 08:48:35', '2021-08-31 22:50:24', 1, '3팀', '#B497D6', 3),
(7, 'LEVEL_1', 'NORMAL', '2021-08-29 08:48:35', '2021-08-29 08:50:03', NULL, '인사팀', '#000000', 0),
(8, 'LEVEL_2', 'NORMAL', '2021-08-29 08:48:35', '2021-09-17 20:05:14', 7, '1팀', '#B7F0B1', 1);
/*!40000 ALTER TABLE `group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `member` (
                          `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
                          `state` varchar(255) NOT NULL DEFAULT '',
                          `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
                          `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                          `name` varchar(255) NOT NULL,
                          `group_id` int(10) unsigned NOT NULL,
                          `level` int(10) NOT NULL DEFAULT '0',
                          PRIMARY KEY (`id`),
                          KEY `member_group_id_foreign` (`group_id`),
                          CONSTRAINT `member_group_id_foreign` FOREIGN KEY (`group_id`) REFERENCES `group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` (`id`, `state`, `created_at`, `updated_at`, `name`, `group_id`, `level`) VALUES
(1, 'NORMAL', '2021-08-29 08:58:14', '2021-08-31 23:33:50', '민준', 2, 0),
(2, 'NORMAL', '2021-08-29 08:58:14', '2021-08-31 23:33:56', '시우', 2, 0),
(3, 'NORMAL', '2021-08-29 08:58:14', '2021-08-31 23:34:02', '하준', 2, 0),
(4, 'NORMAL', '2021-08-29 08:58:14', '2021-08-31 23:34:06', '지후', 3, 0),
(5, 'NORMAL', '2021-08-29 08:58:14', '2021-08-31 23:34:11', '현우', 3, 0),
(6, 'NORMAL', '2021-08-29 08:58:14', '2021-08-31 23:34:29', '윤서', 3, 0),
(7, 'NORMAL', '2021-08-29 08:58:14', '2021-08-31 23:34:19', '건우', 4, 0),
(8, 'NORMAL', '2021-08-29 08:58:14', '2021-08-31 23:34:21', '우진', 4, 0),
(9, 'NORMAL', '2021-08-29 08:58:14', '2021-09-04 23:07:43', '홍길동1', 4, 0),
(10, 'NORMAL', '2021-08-29 08:58:14', '2021-09-04 23:07:43', '홍길동2', 4, 0),
(11, 'NORMAL', '2021-08-29 08:58:14', '2021-09-04 23:07:43', '홍길동3', 4, 0),
(12, 'NORMAL', '2021-08-29 08:58:14', '2021-09-04 23:07:43', '홍길동4', 4, 0),
(13, 'NORMAL', '2021-08-29 08:58:14', '2021-09-04 23:07:43', '홍길동5', 4, 0),
(14, 'NORMAL', '2021-08-29 08:58:14', '2021-09-04 23:07:43', '홍길동6', 4, 0),
(15, 'NORMAL', '2021-08-29 08:58:14', '2021-09-04 23:07:43', '홍길동7', 4, 0),
(16, 'NORMAL', '2021-08-29 08:58:14', '2021-09-04 23:07:43', '홍길동8', 4, 0),
(17, 'NORMAL', '2021-08-29 08:58:14', '2021-09-04 23:07:43', '홍길동9', 4, 0),
(18, 'NORMAL', '2021-08-29 08:58:14', '2021-09-04 23:07:43', '홍길동10', 4, 0),
(19, 'NORMAL', '2021-08-29 08:58:14', '2021-09-04 23:07:43', '홍길동11', 4, 0),
(20, 'NORMAL', '2021-08-29 08:58:14', '2021-09-04 23:07:43', '홍길동12', 4, 0),
(21, 'NORMAL', '2021-08-29 08:58:14', '2021-09-04 23:07:43', '홍길동13', 4, 0),
(22, 'NORMAL', '2021-08-29 08:58:14', '2021-09-04 23:07:43', '홍길동14', 4, 0),
(23, 'NORMAL', '2021-08-29 08:58:14', '2021-09-04 23:07:43', '홍길동15', 4, 0),
(24, 'NORMAL', '2021-08-29 08:58:14', '2021-09-04 23:07:43', '홍길동16', 4, 0),
(25, 'NORMAL', '2021-08-29 08:58:14', '2021-09-04 23:07:43', '홍길동17', 4, 0),
(26, 'NORMAL', '2021-08-29 08:58:14', '2021-09-04 23:07:43', '홍길동18', 4, 0),
(27, 'NORMAL', '2021-08-29 08:58:14', '2021-09-04 23:07:43', '홍길동19', 4, 0),
(28, 'NORMAL', '2021-08-29 08:58:14', '2021-09-04 23:07:43', '홍길동20', 4, 0),
(29, 'NORMAL', '2021-08-29 08:58:14', '2021-09-04 23:07:43', '홍길동21', 4, 0),
(30, 'NORMAL', '2021-08-29 08:58:14', '2021-09-04 23:07:43', '홍길동22', 4, 0),
(31, 'NORMAL', '2021-08-29 08:58:14', '2021-09-04 23:07:43', '홍길동23', 4, 0),
(32, 'NORMAL', '2021-08-29 08:58:14', '2021-09-04 23:07:43', '홍길동24', 4, 0),
(33, 'NORMAL', '2021-08-29 08:58:14', '2021-09-04 23:07:43', '홍길동25', 4, 0),
(34, 'NORMAL', '2021-08-29 08:58:14', '2021-09-17 20:01:17', '짱구', 8, 0);
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `part`
--

DROP TABLE IF EXISTS `part`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `part` (
                        `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
                        `type` varchar(255) NOT NULL DEFAULT '',
                        `state` varchar(255) NOT NULL DEFAULT 'NORMAL',
                        `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
                        `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                        `room_id` int(10) unsigned NOT NULL,
                        `member_id` int(10) unsigned DEFAULT NULL,
                        `location_x` int(10) NOT NULL,
                        `location_y` int(10) NOT NULL,
                        `direction` int(10) NOT NULL DEFAULT '1',
                        PRIMARY KEY (`id`),
                        KEY `part_room_id_foreign` (`room_id`),
                        KEY `part_member_id_foreign` (`member_id`),
                        CONSTRAINT `part_member_id_foreign` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`),
                        CONSTRAINT `part_room_id_foreign` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `part`
--

LOCK TABLES `part` WRITE;
/*!40000 ALTER TABLE `part` DISABLE KEYS */;
/*!40000 ALTER TABLE `part` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `room` (
                        `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
                        `state` varchar(255) NOT NULL DEFAULT 'NORMAL',
                        `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
                        `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                        `title` varchar(255) NOT NULL,
                        `size_x` int(10) NOT NULL,
                        `size_y` int(10) NOT NULL,
                        `sequence` int(10) NOT NULL DEFAULT '0',
                        PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;

/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'placer'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-18 12:23:05


UNLOCK TABLES;
SET foreign_key_checks = 1;
