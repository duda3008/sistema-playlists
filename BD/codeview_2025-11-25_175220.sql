-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: codeview
-- ------------------------------------------------------
-- Server version	8.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `faqs`
--

DROP TABLE IF EXISTS `faqs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `faqs` (
  `id_faq` int NOT NULL AUTO_INCREMENT,
  `descricao` text COLLATE utf8mb4_general_ci NOT NULL,
  `pergunta` text COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id_faq`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faqs`
--

/*!40000 ALTER TABLE `faqs` DISABLE KEYS */;
INSERT INTO `faqs` VALUES (1,'É só acessar a página de cadastro, preencher seus dados e confirmar. Rapidinho, sem burocracia. Por favor não esquça de inserir todos os dados',' Como faço para criar minha conta?'),(2,'Entre no seu perfil, clique em “Editar” e salve as alterações. Simples e sem mistério.',' Como altero meus dados pessoais?'),(3,'Nem sempre. Algumas ações precisam que você clique em “Salvar”, então confere antes de sair da página.','O sistema salva automaticamente minhas alterações?'),(4,'Clique em “Criar playlist”, preencha as informações e confirme. No mesmo formulário é só adicionar suas músicas preferidas.',' Como crio uma playlist?'),(5,'Com certeza! Abra a playlist, clique em “Editar” e ajeite tudo do jeitinho que quiser.','Posso editar o nome ou a imagem da minha playlist depois?'),(6,'Dentro da playlist, use o botão “Adicionar música”. Preencha os dados, clique em \"salvar\" e pronto.','Como adiciono músicas a uma playlist?'),(7,'Provavelmente você criou em outro perfil. Verifica se está no perfil certo — acontece com todo mundo.','Por que minhas playlists não aparecem?'),(8,'Abra o card da playlist e clique no ícone de lixeira. Confirma a exclusão e ela some do mapa.','Como deleto uma playlist?'),(9,'Os humores disponíveis aparcerão na hora de criar a playlist ou na seção \"Sugestões\".','Quais humores posso usar?'),(10,'Pode! No card da playlist tem um botão de favoritar. Depois você vai poder filtrar só as favoritas.','Posso favoritar playlists?'),(11,'Não! Os emojis já são pré-definidos pelo sistema.','Posso mudar o emoji dos humores?'),(12,'É necessário ir em configurações e clicar em \"excluir conta\". Mas fique atento, após a exclusão todos os seus dados serão apagados, confira se sua intenção é excluir ou sair da sua conta.','Como excluo minha conta?'),(13,'Sim! Ele é responsivo, então abre bonitinho no navegador do celular.','O site funciona no celular?'),(14,'Geralmente é só recarregar a página ou tentar novamente. Se continuar, revisa os campos ou procure o suporte.','Tive um erro ao salvar dados. O que faço?'),(15,'Entre na playlist, clique no botão “Editar informações” e altere o nome. Salva ali e pronto.','Como edito o nome de uma playlist?'),(16,'Você só precisa ir na imagem escolhida apertar com o botão direito do mouse (ou pressionar no caso de dispositivo móvel) e copiar o endereço da imagem, depois é só colar no compo indicado.','Como funciona a inserção de imagem no perfil, na playlist e nas músicas?'),(17,'Sim! No mesmo painel de edição você escolhe outra imagem.','Posso mudar a imagem da playlist?'),(18,'Abra a playlist, clique em “Editar” e ajuste tudo: descrição, humor, imagem, vibes… é só salvar no final.','Como edito a descrição, humor ou outras informações da playlist?'),(19,'No card da playlist tem um botão de lixeira. Clicou ali, confirmou… e acabou, ela some do sistema.','Como excluo uma playlist?'),(20,'Dentro da playlist tem um botão “Adicionar música”. Preenche os campos bonitinho e pronto — tá na lista. Confira sempre se todos os campos estão preenchidos','Como adiciono uma música nova dentro da playlist?'),(21,'Na lista de músicas da playlist, cada música tem um botão de editar. Ali você pode mudar nome, artista, álbum, duração, gênero, imagem… tudo.','Como edito as informações de uma música?'),(22,'Do lado do botão de editar tem o botão “excluir”. Clicou, confirmou, música removida sem estresse.','Como excluo uma música da playlist?'),(23,'Tudo vai junto. As músicas dessa playlist somem com ela.','O que acontece se eu excluir uma playlist com músicas dentro?'),(24,'Ainda não. Se excluir, já era. Então sempre confirma antes.','Posso desfazer a exclusão?'),(25,'Vá em Configurações ou Perfil, clique em Editar nome e altere seu nome. Depois é só salvar.','Como edito meu nome no perfil?'),(26,'Na área de edição de email, troque o e-mail e confirme.','Como altero meu e-mail?'),(27,'Pode sim! Na parte de Configurações em Alterar senha, você coloca a senha atual e cria uma nova.','Posso mudar minha senha?'),(28,'Abaixo da sua foto de perfil clique em Editar foto e selecione uma nova imagem. Ao salvar, ela já atualiza.','Como troco minha foto de perfil?'),(29,'Atualiza a página. Se ainda estiver igual, vê se você clicou Salvar.','Minhas alterações de perfil não aparecem. O que fazer?'),(30,'Provavelmente já existe uma conta usando esse e-mail, ou ele não passou nas validações. Confere se escreveu certinho.','O sistema não aceita meu novo e-mail. Por quê?');
/*!40000 ALTER TABLE `faqs` ENABLE KEYS */;

--
-- Table structure for table `tb_albuns`
--

DROP TABLE IF EXISTS `tb_albuns`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_albuns` (
  `id_album` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `descricao` text COLLATE utf8mb4_general_ci,
  `imagem` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `id_artista` int NOT NULL,
  `data_publi` date DEFAULT NULL,
  PRIMARY KEY (`id_album`),
  KEY `idx_album_artista` (`id_artista`),
  CONSTRAINT `tb_albuns_ibfk_1` FOREIGN KEY (`id_artista`) REFERENCES `tb_artistas` (`id_artista`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_albuns`
--

/*!40000 ALTER TABLE `tb_albuns` DISABLE KEYS */;
INSERT INTO `tb_albuns` VALUES (1,'xzcvxc',NULL,NULL,1,NULL),(2,'vbcv',NULL,NULL,2,NULL);
/*!40000 ALTER TABLE `tb_albuns` ENABLE KEYS */;

--
-- Table structure for table `tb_artistas`
--

DROP TABLE IF EXISTS `tb_artistas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_artistas` (
  `id_artista` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `descricao` text COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`id_artista`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_artistas`
--

/*!40000 ALTER TABLE `tb_artistas` DISABLE KEYS */;
INSERT INTO `tb_artistas` VALUES (1,'ik',NULL),(2,'jfj',NULL);
/*!40000 ALTER TABLE `tb_artistas` ENABLE KEYS */;

--
-- Table structure for table `tb_genero`
--

DROP TABLE IF EXISTS `tb_genero`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_genero` (
  `id_genero` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id_genero`)
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_genero`
--

/*!40000 ALTER TABLE `tb_genero` DISABLE KEYS */;
INSERT INTO `tb_genero` VALUES (1,'Pop'),(2,'Rock'),(3,'Hip Hop'),(4,'Rap'),(5,'Trap'),(6,'R&B'),(7,'Soul'),(8,'Funk Brasileiro'),(9,'Funk Americano'),(10,'Sertanejo'),(11,'Sertanejo Universitário'),(12,'Pagode'),(13,'Samba'),(14,'MPB'),(15,'Bossa Nova'),(16,'Forró'),(17,'Pisadinha'),(18,'Eletrônica'),(19,'House'),(20,'Techno'),(21,'Trance'),(22,'EDM'),(23,'Vaporwave'),(24,'Synthwave'),(25,'Lo-fi'),(26,'Jazz'),(27,'Blues'),(28,'Gospel'),(29,'Música Clássica'),(30,'Ópera'),(31,'Indie'),(32,'Indie Rock'),(33,'Indie Pop'),(34,'K-pop'),(35,'J-pop'),(36,'C-pop'),(37,'Metal'),(38,'Heavy Metal'),(39,'Hard Rock'),(40,'Punk'),(41,'Pop Punk'),(42,'Reggae'),(43,'Ska'),(44,'Dub'),(45,'Dancehall'),(46,'Música Latina'),(47,'Reggaeton'),(48,'Cumbia'),(49,'Bachata'),(50,'Tango'),(51,'Flamenco'),(52,'Folk'),(53,'Country'),(54,'Acoustic'),(55,'Chillout'),(56,'Ambient'),(57,'New Age'),(58,'Soundtrack'),(59,'Cinematic'),(60,'Drill'),(61,'Grime'),(62,'Afrobeat'),(63,'Afro House'),(64,'Axé'),(65,'Chorinho'),(66,'Música Gaúcha'),(67,'Música Regional'),(68,'Experimental'),(69,'Hyperpop'),(70,'Art Pop'),(71,'Emo'),(72,'Grunge'),(73,'Dream Pop'),(74,'Shoegaze'),(75,'Vocaloid'),(76,'Trap BR'),(77,'Phonk'),(78,'Lo-fi Hip Hop'),(79,'Dubstep'),(80,'Future Bass'),(81,'Tech House'),(82,'Deep House');
/*!40000 ALTER TABLE `tb_genero` ENABLE KEYS */;

--
-- Table structure for table `tb_humor`
--

DROP TABLE IF EXISTS `tb_humor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_humor` (
  `id_humor` int NOT NULL AUTO_INCREMENT,
  `tipo` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `descricao` varchar(250) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id_humor`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_humor`
--

/*!40000 ALTER TABLE `tb_humor` DISABLE KEYS */;
INSERT INTO `tb_humor` VALUES (16,'Romântico','Coração leve, florescendo ideia boba, sorriso escondido no canto da boca.'),(17,'Animado','Energia que pula sem pedir licença, brilho no olhar que parece música.'),(18,'Relaxado','Corpo em modo rede, alma esparramada num fim de tarde.'),(19,'Melancólico','Saudade que não dói, mas pesa.'),(20,'Nostálgico','Cheiro de coisa antiga que abraça por dentro.'),(21,'Feliz','Riso frouxo, sol no peito.'),(22,'Triste','Nuvem baixinha passando devagar.'),(23,'Energizado','Motor ligado, pés inquietos, mundo chamando.'),(24,'Aventureiro','Vento no rosto e vontade de descobrir o que tem depois da curva.'),(25,'Sonolento','Piscada lenta que quase vira sonho.'),(26,'Focado','Mira firme, barulho do mundo em “mute”.'),(27,'Estressado','Cabeça em chamas, pensamentos trombando.'),(28,'Motivado','Meta no horizonte e pé no acelerador.'),(29,'Calmo','Respiro longo, tudo encaixado no eixo.'),(30,'Intenso','Sentimento que chega batendo na porta sem avisar.'),(31,'Saudoso','Lembrança quente, meio doce, meio doída.'),(32,'Dramático','Emoção em caixa alta, cenários internos cinematográficos.'),(33,'Contemplativo','Silêncio que observa, mente virando janela.'),(34,'Misterioso','Sombra elegante que guarda segredos.'),(35,'Irritado','Faíscas no ar, humor curto.'),(36,'Inspirado','Ideia cintilando, mão coçando pra criar.'),(37,'Apaixonado','Mundo cor-de-rosa e batimento fora do ritmo.'),(38,'Neutro','Nem maré alta, nem baixa; só indo.'),(39,'Curioso','Olhar que cutuca, perguntas que florescem.'),(40,'Confiante','Andar firme, peito aberto, passo seguro.'),(41,'Tenso','Músculos travados, respiração curta.'),(42,'Espiritual','Alma soprando leve, conexão sem palavras.'),(43,'Brincalhão','Risada prontinha pra escapar.'),(44,'Tranquilo','Brisa mansa passando devagarinho.'),(45,'Determinado','Caminho traçado, foco aceso, sem desviar.'),(46,'Rebelde','Vontade de cutucar o mundo e mudar as regras.'),(47,'Zen','Mente lisa, coração sem ondas.'),(48,'Sofrência','Dor cantada alto, emoção derramada.'),(49,'Good vibes','Energia mansa, sorrisos que fluem.'),(50,'Vibe noturna','Luzes baixas, mistério suave, sensação de madrugada eterna.'),(51,'Vibe de festa','Glitter na alma e ritmo nos pés.'),(52,'Cinemático','Vida em câmera lenta, trilha sonora invisível.'),(53,'Surpreso','Olhos arregalados, mundo em ponto de exclamação.'),(54,'Caótico','Pensamentos espalhados, coração em redemoinho.'),(55,'Minimalista','Poucos elementos, tudo essencial.'),(56,'Profundo','Emoção que afunda e encontra tesouros no silêncio.'),(57,'Reflexivo','Pensamento que se dobra e se desdobra.'),(58,'Entediado','Pensamento que se dobra e se desdobra.'),(59,'Radiante','Brilho que quase ilumina a sala inteira.'),(60,'Saudade','Abraço que faltou e insiste em ficar.'),(61,'Toska','Vazio pesado, fome de algo que nem tem nome.'),(62,'L’appel du vide','Chamado suave de um abismo interno, não para cair, mas para entender.'),(63,'Ikigai','O motivo de acordar de manhã: propósito gostosinho de viver.'),(64,'Mono no aware','Tristeza doce ao perceber que algo é passageiro.'),(65,'Wabi-sabi','Beleza das coisas imperfeitas, envelhecidas e simples.'),(66,'Tarab','Êxtase emocional causado pela música.'),(67,'Hygge','Conforto emocional de estar num ambiente quentinho e acolhedor, mentalmente ou literalmente.');
/*!40000 ALTER TABLE `tb_humor` ENABLE KEYS */;

--
-- Table structure for table `tb_musica`
--

DROP TABLE IF EXISTS `tb_musica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_musica` (
  `id_musica` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `id_genero` int NOT NULL,
  `id_artista` int NOT NULL,
  `id_album` int DEFAULT NULL,
  `duracao` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `imagem` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id_musica`),
  KEY `idx_musica_genero` (`id_genero`),
  KEY `idx_musica_artista` (`id_artista`),
  KEY `idx_musica_album` (`id_album`),
  CONSTRAINT `tb_musica_ibfk_1` FOREIGN KEY (`id_genero`) REFERENCES `tb_genero` (`id_genero`) ON DELETE CASCADE,
  CONSTRAINT `tb_musica_ibfk_2` FOREIGN KEY (`id_artista`) REFERENCES `tb_artistas` (`id_artista`) ON DELETE CASCADE,
  CONSTRAINT `tb_musica_ibfk_3` FOREIGN KEY (`id_album`) REFERENCES `tb_albuns` (`id_album`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_musica`
--

/*!40000 ALTER TABLE `tb_musica` DISABLE KEYS */;
INSERT INTO `tb_musica` VALUES (1,'ghfhjds',60,1,1,'3:00','https://images.unsplash.com/photo-1763689389840-0afa417e0939?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8'),(2,'bnvn',73,2,2,'3:00','https://images.unsplash.com/photo-1763689389840-0afa417e0939?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8');
/*!40000 ALTER TABLE `tb_musica` ENABLE KEYS */;

--
-- Table structure for table `tb_playlist_musicas`
--

DROP TABLE IF EXISTS `tb_playlist_musicas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_playlist_musicas` (
  `id_pm` int NOT NULL AUTO_INCREMENT,
  `id_playlist` int NOT NULL,
  `id_musica` int NOT NULL,
  PRIMARY KEY (`id_pm`),
  KEY `idx_playlist_m` (`id_playlist`),
  KEY `idx_playlist_m_musica` (`id_musica`),
  CONSTRAINT `tb_playlist_musicas_ibfk_1` FOREIGN KEY (`id_playlist`) REFERENCES `tb_playlists` (`id_playlist`) ON DELETE CASCADE,
  CONSTRAINT `tb_playlist_musicas_ibfk_2` FOREIGN KEY (`id_musica`) REFERENCES `tb_musica` (`id_musica`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_playlist_musicas`
--

/*!40000 ALTER TABLE `tb_playlist_musicas` DISABLE KEYS */;
INSERT INTO `tb_playlist_musicas` VALUES (1,1,1),(2,2,2);
/*!40000 ALTER TABLE `tb_playlist_musicas` ENABLE KEYS */;

--
-- Table structure for table `tb_playlists`
--

DROP TABLE IF EXISTS `tb_playlists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_playlists` (
  `id_playlist` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `nome` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `descricao` text COLLATE utf8mb4_general_ci,
  `id_humor` int DEFAULT NULL,
  `imagem` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `favorita` tinyint(1) DEFAULT '0',
  `data_acesso` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_playlist`),
  KEY `idx_playlist_user` (`id_user`),
  KEY `idx_playlist_humor` (`id_humor`),
  CONSTRAINT `tb_playlists_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `tb_usuarios` (`id_user`) ON DELETE CASCADE,
  CONSTRAINT `tb_playlists_ibfk_2` FOREIGN KEY (`id_humor`) REFERENCES `tb_humor` (`id_humor`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_playlists`
--

/*!40000 ALTER TABLE `tb_playlists` DISABLE KEYS */;
INSERT INTO `tb_playlists` VALUES (1,1,'hskjdzshgk','fhgyfdt',37,'',0,'2025-11-25 16:18:33'),(2,1,'bvcnvb','bvn',24,'',0,'2025-11-25 16:36:35');
/*!40000 ALTER TABLE `tb_playlists` ENABLE KEYS */;

--
-- Table structure for table `tb_usuarios`
--

DROP TABLE IF EXISTS `tb_usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_usuarios` (
  `id_user` int NOT NULL AUTO_INCREMENT,
  `senha` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `nome` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `imagem` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `data_cadastro` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_usuarios`
--

/*!40000 ALTER TABLE `tb_usuarios` DISABLE KEYS */;
INSERT INTO `tb_usuarios` VALUES (1,'$2y$10$9ZO9h.S22s.ScBzK4vXnoeVbrN1RFmhwljLr1AKDDim9lJ8TKqIiu','mariasilveira.ch030@academico.ifsul.edu.br','maria','img/avatar.png','2025-11-21 09:12:53'),(2,'$2y$10$UPPJ2LBd7NB9CrUzmg0J5eu24YpzTQmX8dSJH2nNVnk8Kgb7PbU0C','mahhdudapereirasilveira@gamil.com','maria','img/avatar.png','2025-11-23 00:42:46'),(3,'$2y$10$3O2pPFsf3UsbywDoMed7S.6gkszHl0t5v1P5ZKbqrxiAAI2NttDtm','mariasilveira@academico.ifsul.edu.br','maria','img/avatar.png','2025-11-23 00:49:31'),(4,'$2y$10$Lnk/7Uut43Bl3gMo/HtEKuLF7uVgivvL0vp8zjFrHVW8kd89CrjCm','ncncn@gmail.com','kcnk','img/avatar.png','2025-11-23 00:50:06'),(5,'$2y$10$T9twdeDQr1QZhzmm/CqbnuUwv1dCjuL6JKD.xKr2dMpXcQDbSSpQa','dsfdsf@gnail.com','maria','img/avatar.png','2025-11-23 00:55:58'),(6,'$2y$10$sphaYjVF5N/NHVDbXjm27OG8LAHD0aS7a3N0PuA3KcxZ0N001UDji','cdfecd@gmail.com','maria','img/avatar.png','2025-11-23 01:11:53'),(7,'$2y$10$CRmyFGHyEMeIFjEp2DixEesP6UPAE007RPB5hgfNFst/0kHa2XrS6','cdcdfvd@gmail.com','maria','img/avatar.png','2025-11-23 01:13:11'),(8,'$2y$10$txtzur5MiN/E1yqukprTTu/6hM8FSZIlFQc6gjTozU8IslqK4CvRW','suzukiryarmy96@gmail.com','maria','img/avatar.png','2025-11-23 01:47:55'),(9,'$2y$10$qamD3iTl6BwEu8yCYNv7MeJtdulJBKiNPrrVJoLE5up/7lmKQZ.ZO','mahhdugrdgdapereirasilveira@gamil.com','maria','img/avatar.png','2025-11-23 01:51:04');
/*!40000 ALTER TABLE `tb_usuarios` ENABLE KEYS */;

--
-- Dumping routines for database 'codeview'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-25 17:52:42
