CREATE TABLE IF NOT EXISTS `track_202130_users` (
`id` INT NULL,
`name` VARCHAR(MAX) NULL,
`username` VARCHAR(MAX) NULL,
`email` VARCHAR(MAX) NULL,
`password` VARCHAR(MAX) NULL,
`img` VARCHAR(MAX) NULL,
`date_create` VARCHAR(MAX) NULL
);

INSERT INTO track_202130_users VALUES
(1,'Terry Hopkins','user1','user1@gmail.com',md5("pass"),'https://via.placeholder.com/400/795/fff/?text=user1','2021-03-16 03:48:28'),
(2,'Jeannie Mcdaniel','user2','user2@gmail.com',md5("pass"),'https://via.placeholder.com/400/976/fff/?text=user2','2020-02-02 01:48:40'),
(3,'Camacho Gray','user3','user3@gmail.com',md5("pass"),'https://via.placeholder.com/400/925/fff/?text=user3','2020-07-30 02:04:02'),
(4,'Toni Clarke','user4','user4@gmail.com',md5("pass"),'https://via.placeholder.com/400/860/fff/?text=user4','2020-11-14 01:52:22'),
(5,'Hattie Buck','user5','user5@gmail.com',md5("pass"),'https://via.placeholder.com/400/989/fff/?text=user5','2021-01-08 09:17:03'),
(6,'Fowler Briggs','user6','user6@gmail.com',md5("pass"),'https://via.placeholder.com/400/899/fff/?text=user6','2020-02-17 04:35:01'),
(7,'June Gibson','user7','user7@gmail.com',md5("pass"),'https://via.placeholder.com/400/856/fff/?text=user7','2020-02-25 01:13:42'),
(8,'Cleveland Henry','user8','user8@gmail.com',md5("pass"),'https://via.placeholder.com/400/848/fff/?text=user8','2020-10-14 11:41:35'),
(9,'Velma Cross','user9','user9@gmail.com',md5("pass"),'https://via.placeholder.com/400/904/fff/?text=user9','2020-01-26 11:14:23'),
(10,'Roxie Patel','user10','user10@gmail.com',md5("pass"),'https://via.placeholder.com/400/929/fff/?text=user10','2020-09-13 05:41:36');