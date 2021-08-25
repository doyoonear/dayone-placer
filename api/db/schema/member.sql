CREATE TABLE member (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  state varchar(255) NOT NULL DEFAULT '',
  created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  name varchar(255) NOT NULL,
  member_group_id int(10) unsigned NOT NULL,
  PRIMARY KEY (id),
  KEY member_member_group_id_foreign (member_group_id),
  CONSTRAINT member_member_group_id_foreign FOREIGN KEY (member_group_id) REFERENCES member_group (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
