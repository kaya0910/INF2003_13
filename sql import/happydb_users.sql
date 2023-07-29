-- MySQL dump 10.13  Distrib 8.0.33, for macos13 (arm64)
--
-- Host: 127.0.0.1    Database: happydb
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userID` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`userID`),
  UNIQUE KEY `id_UNIQUE` (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'jamie1','pass123',NULL,NULL),(3,'test.1111','$2b$12$0asngZ.n3yYjSS3uMEE2LO/2FbYpG51ulSnckBiBTpjZ2DMFBV8um','test',NULL),(4,'test1','$2b$12$XrYp2BLweZqatpYWdTrRguwFWufc269tPCs.Q8.YcfFatqwc6Atea','test',NULL),(5,'test2','$2b$12$JfzDwiGCd533HsNwY2TyxuwT3H/PnP.AgQG/WlBeC/SRKQEsTcBlu','test',NULL),(6,'test3','$2b$12$mkc4m5gdz7KcJY/aR4Tgb.VHq/lMxBm3RyLToKmbkfcaKPgrWmwya','test',NULL),(7,'test4','$2b$12$JOfUhRk5iA8EuGhhd9CeUuH1y9GDuuwCfxCrZ1nhPpJVOgNCs4Drm','test',NULL),(8,'test11','$2b$12$ePtYL/A9yX.Gv1xiuzmDv.zPzbmZbKAteuFFAqmeo2jMOd3bTfHDa','Joe',NULL),(9,'test123','$2b$12$tPqgLFDEGiFqXh57z/eI7uYcxChRdvOySpi8ELTzJzaoutFKQaBHO','jamie',NULL),(10,'testtest11111','$2b$12$RyJ0IG4sgYuIibWstmzTQOllDPyrctdmwMBEPW/z9OjuNnl5iL1fG','micheal jackson',NULL),(11,'1234test','$2b$12$ROCCZCt.HcNqstjiS47wkOVDd.0HDbVeM95mH729Xsx2iuwQD0JOG','Test12345',NULL),(12,'joe44824','$2b$12$DlWnqojEHuHibrp8n3RGoO4LRpqftx9u3Zpmw8Ef39RjaOhIKET/i','Joe',NULL),(13,'jj','$2b$12$Q2SVo6erJgpo/4qGHkDbxOuJIsB2GKkSxJ8jmAoSwm5PFjioxveWW','jj',NULL),(14,'jjoe','$2b$12$.83U7ESSmxUPZFhLVGToMeeQjyporJQwxzI4DI8W6aT8oYM00d.pi','jjoe',NULL),(15,'zaw','$2b$12$/Ud00RShMd1DNQwyPb6ZO.BmB8wyUdX1Yupzso3KkSx.YtwIE8OXW','zaw',NULL),(16,'joe123','$2b$12$05CFpfNUMvTpkZetHfpwju43.a/MVSiGeYI3ObiBJcYC/lfp.hAya','joe',NULL),(17,'test6666','$2b$12$m7vC99eraa1BHWO68VXqe.pY8pdzNwQbhOT8Bl5bsUpd8U/LopGH6','name',NULL),(18,'testing','$2b$12$YGBTmNDovX1q7uE0lbRuD.V8TrJVhX6RDMlWg/J25FMlW5rqCLRiS','testing',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-28 15:14:40
