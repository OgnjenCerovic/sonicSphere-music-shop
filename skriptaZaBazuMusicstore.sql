/*
SQLyog Community v13.2.1 (64 bit)
MySQL - 8.0.30 : Database - music_store_backend
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`music_store_backend` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `music_store_backend`;

/*Table structure for table `album_a` */

DROP TABLE IF EXISTS `album_a`;

CREATE TABLE `album_a` (
  `a_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `a_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `a_description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`a_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `album_a` */

insert  into `album_a`(`a_id`,`a_title`,`a_description`,`created_at`,`updated_at`) values 
(2,'asd','asda','2024-07-27 19:34:44','2024-07-27 19:34:44'),
(3,'asd asd','asda asd','2024-07-27 19:34:47','2024-07-27 19:34:47');

/*Table structure for table `collections_c` */

DROP TABLE IF EXISTS `collections_c`;

CREATE TABLE `collections_c` (
  `c_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `c_music_id` bigint unsigned NOT NULL,
  `c_album_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`c_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `collections_c` */

insert  into `collections_c`(`c_id`,`c_music_id`,`c_album_id`,`created_at`,`updated_at`) values 
(1,4,1,NULL,NULL),
(2,6,2,NULL,NULL);

/*Table structure for table `failed_jobs` */

DROP TABLE IF EXISTS `failed_jobs`;

CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `failed_jobs` */

/*Table structure for table `migrations` */

DROP TABLE IF EXISTS `migrations`;

CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `migrations` */

insert  into `migrations`(`id`,`migration`,`batch`) values 
(1,'2014_10_12_100000_create_password_resets_table',1),
(2,'2019_08_19_000000_create_failed_jobs_table',1),
(3,'2019_12_14_000001_create_personal_access_tokens_table',1),
(4,'2024_07_24_113458_create_users_table',1),
(5,'2024_07_24_113505_create_music_table',1),
(6,'2024_07_24_113511_create_purchases_table',1),
(7,'2024_07_24_113518_create_ratings_table',1),
(8,'2024_07_24_113525_create_reviews_table',1),
(9,'2024_07_24_113531_create_albums_table',1),
(10,'2024_07_24_113650_create_collections_table',1);

/*Table structure for table `music_m` */

DROP TABLE IF EXISTS `music_m`;

CREATE TABLE `music_m` (
  `m_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `m_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `m_description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `m_media` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`m_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `music_m` */

insert  into `music_m`(`m_id`,`m_title`,`m_description`,`m_media`,`created_at`,`updated_at`) values 
(4,'naslov 4441','opis 4441','C:\\xampp\\tmp\\php6042.tmp',NULL,'2024-07-28 09:44:30'),
(6,'naslov 6','opis 6','media2.mp3',NULL,NULL),
(7,'naslov 7','opis 7','media2.mp3',NULL,NULL),
(8,'naslov 8','opis 8','media2.mp3',NULL,NULL),
(9,'aaaa','aaaaaaaaaaaaaaaa','C:\\xampp\\tmp\\phpC96D.tmp','2024-07-27 19:16:34','2024-07-27 19:16:34'),
(10,'asdasdas','dasdasd','C:\\xampp\\tmp\\php5E86.tmp','2024-07-27 19:21:35','2024-07-27 19:21:35');

/*Table structure for table `password_resets` */

DROP TABLE IF EXISTS `password_resets`;

CREATE TABLE `password_resets` (
  `u_email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`u_email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `password_resets` */

/*Table structure for table `personal_access_tokens` */

DROP TABLE IF EXISTS `personal_access_tokens`;

CREATE TABLE `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `personal_access_tokens` */

insert  into `personal_access_tokens`(`id`,`tokenable_type`,`tokenable_id`,`name`,`token`,`abilities`,`last_used_at`,`expires_at`,`created_at`,`updated_at`) values 
(14,'App\\Models\\User',3,'auth_token','7c697f90d6bcc3b2bd0409e8e2c9e682583d2589cecfee823d8f58a95e6f2062','[\"*\"]','2024-07-26 12:42:21',NULL,'2024-07-26 12:38:50','2024-07-26 12:42:21'),
(17,'App\\Models\\User',33,'auth_token','b620a9482a0081d31bc9f1b6d6d6f05189e5d71ae756caae01e823ac23aa7c3e','[\"*\"]','2024-07-26 15:01:45',NULL,'2024-07-26 14:47:45','2024-07-26 15:01:45'),
(18,'App\\Models\\User',33,'auth_token','4875280a9e239b11109d4666989287ad2bf8904bb7adf4d4c1ee6f9bfd0bbf96','[\"*\"]','2024-07-26 15:03:04',NULL,'2024-07-26 15:01:47','2024-07-26 15:03:04'),
(19,'App\\Models\\User',33,'auth_token','3b89df3df89e2ffe84b6263476ce48123b495bf9b5c1db55fcb02068f9dd4821','[\"*\"]','2024-07-26 15:04:56',NULL,'2024-07-26 15:03:07','2024-07-26 15:04:56'),
(20,'App\\Models\\User',33,'auth_token','ce8d660d35f7016de54805ba3e82073e6fb0764dd66eefb78bff5b80994be177','[\"*\"]','2024-07-27 14:27:22',NULL,'2024-07-26 15:05:19','2024-07-27 14:27:22'),
(23,'App\\Models\\User',34,'auth_token','ca02a3bf0bf52853077109b7547e7ad3abd389f348e5db20bfb4b101542a2554','[\"*\"]','2024-07-27 18:25:32',NULL,'2024-07-27 18:25:27','2024-07-27 18:25:32'),
(24,'App\\Models\\User',34,'auth_token','ed12353d68d27c16d0cbf6257030279810fc16e7f3cc8defec3c564cdb58cefa','[\"*\"]',NULL,NULL,'2024-07-27 18:25:41','2024-07-27 18:25:41'),
(25,'App\\Models\\User',33,'auth_token','a1254add5e016c55659d576908eb5f51901e7911075e1f15513dda3a618cd742','[\"*\"]','2024-07-27 18:26:48',NULL,'2024-07-27 18:25:49','2024-07-27 18:26:48'),
(26,'App\\Models\\User',34,'auth_token','be1177b71e10873d9a60fe6f6572226931ae6c15fca9526fa48d2b69c3beb627','[\"*\"]',NULL,NULL,'2024-07-27 18:26:49','2024-07-27 18:26:49'),
(27,'App\\Models\\User',34,'auth_token','30afe4f43918fc0b98605d4e14a7d186cbcfa0cccc3c815546de46dfe2e7ec5e','[\"*\"]','2024-07-27 18:27:46',NULL,'2024-07-27 18:26:50','2024-07-27 18:27:46'),
(28,'App\\Models\\User',34,'auth_token','dce79dcb508e8fa2e7b306f93785e2f23863b3774bd710d869d16102d8a659cb','[\"*\"]','2024-07-27 18:29:34',NULL,'2024-07-27 18:28:08','2024-07-27 18:29:34'),
(31,'App\\Models\\User',34,'auth_token','b119dea1e69352d6ba0eb3b95711c2cf782cae2695129c537dc8948ed73b55f1','[\"*\"]','2024-07-27 20:43:44',NULL,'2024-07-27 19:20:37','2024-07-27 20:43:44'),
(32,'App\\Models\\User',34,'auth_token','218bc4e7fb21a6c91f17432e693bce3376232ab13acd817103ed2a9de7afc5c1','[\"*\"]','2024-07-27 21:18:25',NULL,'2024-07-27 20:48:34','2024-07-27 21:18:25'),
(33,'App\\Models\\User',35,'auth_token','193dc7c1942601b2e65f57f4d5385b3ea6ca2a5498504e843b552756c6f71c53','[\"*\"]','2024-07-27 21:46:12',NULL,'2024-07-27 21:05:31','2024-07-27 21:46:12'),
(34,'App\\Models\\User',33,'auth_token','aa30fa177dacbaa6da71ac89254899d28b9b2f21b5984be63e0ae6405ba950bf','[\"*\"]',NULL,NULL,'2024-07-28 09:32:08','2024-07-28 09:32:08'),
(35,'App\\Models\\User',33,'auth_token','83aba59262255b5859a2e1144cd76f40ebfa4ce09faeb2acdef0341222d77cd0','[\"*\"]','2024-07-28 09:33:12',NULL,'2024-07-28 09:33:03','2024-07-28 09:33:12'),
(36,'App\\Models\\User',33,'auth_token','e7f312da1ab79b2a81e099d4102a21a7b9f23c7545f1b8d515091acf7f1dfa51','[\"*\"]',NULL,NULL,'2024-07-28 09:33:30','2024-07-28 09:33:30'),
(37,'App\\Models\\User',33,'auth_token','3753ea698dac1520f0cb85da0e919e809ba8f9ccfa3616d4628452c8f6f788b0','[\"*\"]',NULL,NULL,'2024-07-28 09:33:36','2024-07-28 09:33:36'),
(38,'App\\Models\\User',33,'auth_token','5e2d60955b8eecc08b07332e56a4d6b8e8a9f01fcd064b8f01403c721a3577ce','[\"*\"]',NULL,NULL,'2024-07-28 09:34:15','2024-07-28 09:34:15'),
(40,'App\\Models\\User',33,'auth_token','9fc705ddd8200e4016dacdb30f0cf1d81ba0805094e9d96d73271a15981f7726','[\"*\"]','2024-07-28 09:36:21',NULL,'2024-07-28 09:36:13','2024-07-28 09:36:21'),
(42,'App\\Models\\User',34,'auth_token','a8e87f707a3be9ab012773cf0d3b632d9c372709b72f27fd23f99cd1e41a48a1','[\"*\"]',NULL,NULL,'2024-07-28 09:42:17','2024-07-28 09:42:17'),
(43,'App\\Models\\User',34,'auth_token','c1ab38acfc4b5081af0432a7265c66acc5040d50502d6e3285c9c7c8b6221ea5','[\"*\"]',NULL,NULL,'2024-07-28 09:42:53','2024-07-28 09:42:53'),
(44,'App\\Models\\User',34,'auth_token','72bce7b9afdf22c9a834cee90205a94a9ace0c4812d023e1bcd79699a7c5090f','[\"*\"]','2024-07-28 09:46:41',NULL,'2024-07-28 09:43:05','2024-07-28 09:46:41'),
(51,'App\\Models\\User',34,'auth_token','98336cfaa23c5c4eb19719beb44fbb4884bffdec907bd9a1c970b076072d0a7a','[\"*\"]','2024-08-29 21:43:21',NULL,'2024-08-29 18:19:08','2024-08-29 21:43:21');

/*Table structure for table `purchases_p` */

DROP TABLE IF EXISTS `purchases_p`;

CREATE TABLE `purchases_p` (
  `p_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `p_music_id` bigint unsigned NOT NULL,
  `p_user_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`p_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `purchases_p` */

insert  into `purchases_p`(`p_id`,`p_music_id`,`p_user_id`,`created_at`,`updated_at`) values 
(7,1,33,'2024-07-26 12:48:34','2024-07-26 12:48:34'),
(8,2,33,'2024-07-26 12:48:49','2024-07-26 12:48:49'),
(9,3,33,'2024-07-26 12:55:30','2024-07-26 12:55:30'),
(10,4,33,'2024-07-26 12:58:14','2024-07-26 12:58:14'),
(11,5,33,'2024-07-26 12:58:38','2024-07-26 12:58:38'),
(12,6,33,'2024-07-26 14:45:28','2024-07-26 14:45:28'),
(13,7,33,'2024-07-26 14:47:28','2024-07-26 14:47:28'),
(14,4,34,'2024-08-29 17:40:02','2024-08-29 17:40:02'),
(15,4,2,'2024-08-29 17:52:52','2024-08-29 17:52:52'),
(16,7,2,'2024-08-29 21:55:12','2024-08-29 21:55:12');

/*Table structure for table `ratings_ra` */

DROP TABLE IF EXISTS `ratings_ra`;

CREATE TABLE `ratings_ra` (
  `ra_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `ra_music_id` bigint unsigned NOT NULL,
  `ra_user_id` bigint unsigned NOT NULL,
  `ra_rating` enum('1','2','3','4','5') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`ra_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `ratings_ra` */

insert  into `ratings_ra`(`ra_id`,`ra_music_id`,`ra_user_id`,`ra_rating`,`created_at`,`updated_at`) values 
(4,4,34,'5','2024-08-29 17:40:11','2024-08-29 17:40:11'),
(5,10,34,'5','2024-08-29 17:40:51','2024-08-29 17:40:51');

/*Table structure for table `reviews_rw` */

DROP TABLE IF EXISTS `reviews_rw`;

CREATE TABLE `reviews_rw` (
  `rw_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `rw_music_id` bigint unsigned NOT NULL,
  `rw_user_id` bigint unsigned NOT NULL,
  `rw_comment` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`rw_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `reviews_rw` */

insert  into `reviews_rw`(`rw_id`,`rw_music_id`,`rw_user_id`,`rw_comment`,`created_at`,`updated_at`) values 
(2,4,33,'test 2','2024-07-27 14:52:10','2024-07-27 14:52:10'),
(3,4,33,'hehe','2024-07-27 14:56:49','2024-08-29 17:38:06'),
(4,8,33,'test','2024-07-27 14:57:20','2024-07-27 14:57:20'),
(5,4,2,'like it!','2024-08-29 17:46:49','2024-08-29 17:46:49');

/*Table structure for table `users_u` */

DROP TABLE IF EXISTS `users_u`;

CREATE TABLE `users_u` (
  `u_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `u_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `u_last_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `u_email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `u_phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `u_password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `u_status` enum('user','admin') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`u_id`),
  UNIQUE KEY `users_u_u_email_unique` (`u_email`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `users_u` */

insert  into `users_u`(`u_id`,`u_name`,`u_last_name`,`u_email`,`u_phone`,`u_password`,`u_status`,`created_at`,`updated_at`) values 
(1,'Ognjen','Cerovic','ognje@gmail.com','4545454545','ognjen','user','2024-07-24 10:26:44','2024-07-24 10:26:44'),
(2,'Marko','Narkovic','marko@gmail.com','4565445645','marko','user','2024-07-24 10:30:36','2024-08-29 17:50:22'),
(33,'Jovica','Jovic','jovica@gmail.com','56565655551','jovica','user','2024-07-24 10:33:10','2024-07-26 15:05:40'),
(34,'Jovan','Jovanovic','jovan@gmail.com','2342342','admin','admin',NULL,NULL),
(35,'Marij','Marija','marija@gmail.com','345345345','marija','user','2024-07-27 21:05:03','2024-07-27 21:05:03'),
(36,'nemanja','popovic','nemmanja@gmail.com','456546546','nemanja','user','2024-07-28 09:27:46','2024-07-28 09:27:46'),
(37,'Nemanja','Djuric','nemanja.dj@gmail.com','456546546','djuric','user','2024-07-28 09:28:30','2024-07-28 09:28:30'),
(38,'Nikola','Nikolic','nikolac@gmail.com','345345345','a@a.coma@a.com','user','2024-07-28 09:29:19','2024-07-28 09:29:19');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
