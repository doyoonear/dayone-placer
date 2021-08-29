CREATE TABLE `part` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(255) NOT NULL DEFAULT '',
  `state` varchar(255) NOT NULL DEFAULT '',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `room_id` int(10) unsigned NOT NULL,
  `member_id` int(10) unsigned DEFAULT NULL,
  `location_x` int(10) NOT NULL,
  `location_y` int(10) NOT NULL,
  `direction` int(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `part_room_id_foreign` (`room_id`),
  KEY `part_member_id_foreign` (`member_id`),
  CONSTRAINT `part_member_id_foreign` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`),
  CONSTRAINT `part_room_id_foreign` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
