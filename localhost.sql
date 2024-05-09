-- phpMyAdmin SQL Dump
-- version 5.2.1-1.el9
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 09, 2024 at 02:02 PM
-- Server version: 10.5.22-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `patrikhy`
--
CREATE DATABASE IF NOT EXISTS `patrikhy` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `patrikhy`;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `categoryId` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `file` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`categoryId`, `name`, `file`) VALUES
(1, 'Lihat', 'lihat-kuva-file-1714719643164-295923303.jpg'),
(2, 'Pakasteet', 'pakaste-kuva-file-1714716988593-691673320.jpg'),
(3, 'Kuumat juomat', 'kuumatjuomat-kuva-file-1714650644353-196179065.jpg'),
(4, 'Hedelmät', 'hedelmã¤t-kuva-file-1714650684885-475942055.jpg'),
(5, 'Vihannekset', 'vihannekset-kuva-file-1714650711247-972351992.jpg'),
(6, 'Juustot', 'juustot-kuva-file-1714650735331-456578012.jpg'),
(13, 'Maitotuotteet', 'dairyproducts-file-1715242692978-427888666.jpg'),
(14, 'Makeiset', 'fazer-file-1715093222399-735406182.jpg'),
(15, 'Suolaiset naposteltavat', 'sipsi 1-file-1715094204962-668017571.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `customerId` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `role` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`customerId`, `name`, `address`, `email`, `password`, `role`) VALUES
(11, 'patrikhy', 'Ajurinkatu 6 D', 'patrik.hyytiaine@gmail.com', '$2b$10$5WPxtRTohovkfouqMJDaL.3jry7nVhR0YL.zYAZq5ZV60el3FUcL.', 'admin'),
(17, 'Petteri', 'Helsinki katu 2', 'petteri.petteri@gmail.com', '$2b$10$6gf7G58iHRkvw8mX.qbbbOPPMG8I1B7H.5826dZsakByZigGu0MYC', 'admin'),
(19, 'PatrikH', 'Helsinki katu 2', 'gfds@gmail.com', '$2b$10$2.lHIG4AsXLvtCTuX5pjVuuQ1/8XAemR7oiTrpu1P6dxNhDPtlwEO', 'admin'),
(20, 'nimohanf', 'metropolia 12 A', 'faranim01@gmail.com', '$2b$10$zhd/J32oDi4L3xhP531ZcOynh9J9gJC3Ya5sO4trEQ9eVtEAu1R5W', 'admin'),
(30, 'testi', 'Myllypuro', 'test@gmail.com', '$2b$10$EnBO97h10eRVGqR/4wzexO1aXPy8ylG.dy8hZUG6.CqvRORRW3Gyu', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `orderItems`
--

CREATE TABLE `orderItems` (
  `orderItemId` int(11) NOT NULL,
  `orderId` int(11) DEFAULT NULL,
  `productId` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `orderItems`
--

INSERT INTO `orderItems` (`orderItemId`, `orderId`, `productId`, `quantity`) VALUES
(2, 1, 15, 1),
(3, 2, 13, 2),
(6, 8, 13, 1),
(10, 18, 59, 1),
(11, 18, 56, 1),
(12, 19, 25, 2),
(13, 20, 15, 1),
(15, 20, 25, 1),
(16, 20, 36, 1),
(17, 20, 30, 1),
(18, 20, 13, 1),
(19, 20, 37, 4),
(20, 20, 44, 1),
(21, 21, 13, 1),
(22, 22, 38, 3),
(23, 24, 37, 3),
(24, 24, 32, 1),
(25, 25, 14, 1);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `orderId` int(11) NOT NULL,
  `customerId` int(11) DEFAULT NULL,
  `orderDate` date DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `status_code` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`orderId`, `customerId`, `orderDate`, `price`, `status_code`) VALUES
(1, 11, '2024-05-08', 12.00, 4),
(2, 11, '2024-05-08', 9.00, 1),
(3, 11, '2024-05-08', 0.00, 1),
(4, 11, '2024-05-08', 5.00, 1),
(5, 11, '2024-05-08', 5.00, 1),
(6, 11, '2024-05-08', 5.00, 1),
(7, 11, '2024-05-08', 0.00, 1),
(8, 11, '2024-05-08', 4.00, 1),
(9, 11, '2024-05-08', 0.00, 4),
(10, 11, '2024-05-08', 5.00, 1),
(11, 11, '2024-05-08', 0.00, 1),
(12, 11, '2024-05-08', 5.00, 1),
(13, 11, '2024-05-08', 0.00, 1),
(14, 11, '2024-05-08', 0.00, 1),
(15, 11, '2024-05-08', 0.00, 4),
(16, 11, '2024-05-08', 5.00, 4),
(17, 11, '2024-05-08', 5.00, 4),
(18, 11, '2024-05-09', 4.00, 4),
(19, 11, '2024-05-09', 3.00, 4),
(20, 11, '2024-05-09', 48.00, 4),
(21, 11, '2024-05-09', 4.00, 4),
(22, 11, '2024-05-09', 10.00, 1),
(23, 11, '2024-05-09', 10.00, 1),
(24, 11, '2024-05-09', 5.00, 4),
(25, 11, '2024-05-09', 5.00, 1);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `productId` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `file` varchar(255) DEFAULT NULL,
  `categoryId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`productId`, `name`, `description`, `price`, `file`, `categoryId`) VALUES
(13, 'Pakastettu maissi', 'Pakastettua maissia (250g)', 4.99, 'maissipakaste-file-1714461653711-79078789.jpg', 2),
(14, 'Kana', 'Kanan filee suikale (300g)', 5.00, 'kana-file-1714462287227-559624885.jpg', 1),
(15, 'Kahvi', 'Paulig Juhla Mokka (500g)', 7.50, 'kahvi-file-1714458053150-401441490.jpg', 3),
(25, 'Salaatti', 'Järvikylä Ruustinnan salaatti 200g', 1.99, 'salaatti-file-1714462330203-237908826.jpg', 5),
(29, 'Porkkana', 'Porkkanaa 0.50€ kpl', 0.50, 'porkkana-file-1714636122026-859396333.jpg', 5),
(30, 'Maito', 'Suomalaista maitoa (1L)', 1.99, 'maito-file-1714726963472-814926452.png', 13),
(31, 'banaani', 'banaani irto 140g ', 0.34, 'bannani alku-file-1714735726215-214669672.jpg', 4),
(32, 'omena', 'omena suomi pussi 400g', 2.13, 'omena1-file-1714737112915-923628672.jpg', 4),
(35, 'Pepperoni', 'Snellman Pepperoni salami 100 g', 2.89, 'pepperoni-file-1715086292163-153571728.jpg', 1),
(36, 'Naudan', 'Snellman Naudan entrecote 2 kpl 500g', 18.99, 'naudanliha-file-1715082990235-671877529.jpg', 1),
(37, 'Herne', 'Apetit Kotimainen herne pakaste 200g', 1.00, 'herne-file-1715083122236-181213247.jpg', 2),
(38, 'Lipton Pyramid vihreä tee', 'Lipton Pyramid vihreä tee minttu RFA 20ps', 3.55, 'tee-file-1715083486349-136360231.jpg', 3),
(40, 'kaakao', 'Nescafé Mocha Café au Chocolat erikoispikakahvi annospussi 8kpl', 3.49, 'kaakao-file-1715083868445-171948733.jpg', 3),
(41, 'Appelsiini', 'Appelsiini irto 220 g', 0.50, 'appelsiini-file-1715083982979-538867537.jpg', 4),
(42, 'Kiivi', 'Kiivi rasia 500g', 2.49, 'kiivi-file-1715084195874-613655117.jpg', 4),
(43, 'Paprika', 'Paprika Punainen Irto', 0.99, 'papriikka-file-1715084740690-277980605.jpg', 5),
(44, 'Kurkku', 'Kurkku Suomi Irto', 1.50, 'kurkku-file-1715085060411-546312370.jpg', 5),
(46, 'Mozerella', 'Galbani Mozzarella 125g', 2.25, 'mozerella-file-1715086350347-610796986.jpg', 6),
(47, 'Cheddar', 'Castello Burger Cheddar viipaleet 150g', 3.95, 'chedar-file-1715087265260-454272128.jpg', 6),
(48, 'feta', 'Fontana Feta LUOMU 150g', 4.75, 'feta-file-1715088839146-251278046.jpg', 6),
(49, 'Vuohenjuusto', 'Président Sainte Maure vuohenjuusto 200g', 4.98, 'vuohenjuusto-file-1715090810124-983051719.jpg', 6),
(50, 'kerma', 'Valio kermaviili 200g', 0.99, 'kerma-file-1715092016352-484035105.jpg', 13),
(52, 'Jogurtti', 'Arla Mansikka jogurtti 200g', 0.65, 'jogurtti-file-1715092702569-561472305.jpg', 13),
(53, 'Piimä', 'Valio AB piimä (Asidofilus-Bifidus) 1L', 2.25, 'piima-file-1715093000911-268266313.jpg', 13),
(55, 'Fazer ', 'Karl Fazer Vadelmajogurtti suklaalevy 121g', 2.89, 'fazerkuva1-file-1715093182213-838425959.jpg', 14),
(56, 'Karkkipussi', 'Fazer Remix Mini Sour karkkipussi', 1.65, 'fazer remix mini sour karkkipussi-file-1715093370468-114806469.jpg', 14),
(57, 'Karkkipussi', 'Fazer Remix Mini Choco karkkipussi 100g', 1.65, 'fazer remix mini choco karkkipussi 100g-file-1715093545626-842061456.jpg', 14),
(58, 'Karkkipussi', 'Fazer Marianne karkkipussi 220g', 4.09, 'fazer marianne karkkipussi 220g-file-1715093638213-976132894.jpg', 14),
(59, 'Suklaa', 'Fazer Geisha suklaakeksi 100g', 2.89, 'giesha keksi-file-1715093825792-411063098.jpg', 14),
(60, 'Sipsit', 'Taffel Sipsit suolattu sipsi 145g', 2.09, 'sipsi 1-file-1715094718331-214668150.jpg', 15),
(61, 'sipsit', 'Taffel Grills grillimaustettu perunalastu 325g', 3.59, 'taffel grills grillimaustettu perunalastu 325g-file-1715094966416-693632981.jpg', 15),
(62, 'Sipsit', 'Taffel Broadway 150g', 3.59, 'taffel broadway 150g-file-1715095787547-450226421.jpg', 15),
(63, 'Lays', 'Lays Salted sipsit 175g', 2.67, 'lays salted sipsit 175g-file-1715095918728-276016297.jpg', 15),
(64, 'Sipsit', 'Taffel maustettu juustosnacks 115g', 3.49, 'taffel maustettu juustosnacks 115g-file-1715096118848-693091216.jpg', 15),
(65, 'Atria naudan jauheliha', 'Atria naudan jauheliha', 7.99, 'atria-parempi-nauta-jauheliha-10_4117-file-1715258940137-538676613.jpg', 1),
(66, 'Grillimaustettu Kana', 'Atria Grillimaustettu Kanan Koipi 800g', 4.65, 'atria grillimaustettu kanan koipi 800g-file-1715259619080-537678211.jpg', 1),
(67, ' Kalkkunaleike', 'Atria Kalkkunaleike 250g', 4.55, 'atria kalkkunaleike 250g-file-1715259724828-441281014.jpg', 1),
(68, 'Grillattu kinkku', 'Snellman Grillattu kinkku 200g', 3.99, 'snellman grillattu kinkku 200g-file-1715259962026-621040273.jpg', 1),
(69, 'Salami', 'Snellman Pepperoni salami 100 g', 2.89, 'snellman pepperoni salami 100 g-file-1715260197843-94425213.jpg', 1),
(70, 'Nakkimakkara ', 'Snellman Kunnon kuoreton nakkimakkara 280g', 2.99, 'snellman kunnon kuoreton nakkimakkara 280g-file-1715260370187-871997467.jpg', 1),
(71, 'Kalkkunan jauheliha', 'Kariniemen Kalkkunan jauheliha 400 g', 5.99, 'kariniemen kalkkunan jauheliha 400 g-file-1715261865353-171558580.jpg', 1),
(72, 'Rintafilee ', 'Kariniemen Kananpojan rintafilee maustamaton 4kpl 600g', 10.90, 'kariniemen kananpojan rintafilee maustamaton 4kpl 600g-file-1715262065185-899817945.jpg', 1),
(73, 'Kanafilee Leppäsavu', 'Atria Artesaani Murea Kanafilee Leppäsavu 160g', 3.99, 'atria grillimaustettu kanan koipi 800g-file-1715262336641-372918220.jpg', 1),
(75, 'Ohut Broilerinfilee', 'HK Ohuen ohut Broilerinfilee 300 g', 3.99, 'hk ohuen ohut broilerinfilee 300 g-file-1715262676677-189074035.jpg', 1),
(76, 'Kasslerpihvi', 'Snellman Maatiaispossun ohut kasslerpihvi 500g', 6.39, 'snellman maatiaispossun ohut kasslerpihvi -file-1715263023831-881819791.jpg', 1),
(77, 'Marjasekoitus ', 'Pakkasmarja luomu marjasekoitus 250g', 3.35, 'pakkasmarja luomu marjasekoitus -file-1715263229399-926725795.jpg', 2);

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `reviewId` int(11) NOT NULL,
  `customerId` int(11) DEFAULT NULL,
  `orderId` int(11) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `shoppingCarts`
--

CREATE TABLE `shoppingCarts` (
  `shoppingCartId` int(11) NOT NULL,
  `orderId` int(11) DEFAULT NULL,
  `productId` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `wsk_cats`
--

CREATE TABLE `wsk_cats` (
  `cat_id` int(11) NOT NULL,
  `cat_name` text NOT NULL,
  `weight` float NOT NULL,
  `owner` int(11) NOT NULL,
  `filename` text NOT NULL,
  `birthdate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `wsk_cats`
--

INSERT INTO `wsk_cats` (`cat_id`, `cat_name`, `weight`, `owner`, `filename`, `birthdate`) VALUES
(41, 'Siiri', 4, 37, 'some_filename', '2010-03-05'),
(48, 'TestiKissa', 3, 41, 'default.jpg', '2006-03-21'),
(49, 'TestiKissa2', 4, 41, 'default.jpg', '1988-11-01');

-- --------------------------------------------------------

--
-- Table structure for table `wsk_users`
--

CREATE TABLE `wsk_users` (
  `user_id` int(11) NOT NULL,
  `name` text NOT NULL,
  `username` text NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `role` text NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `wsk_users`
--

INSERT INTO `wsk_users` (`user_id`, `name`, `username`, `email`, `password`, `role`) VALUES
(1, 'Administrator', 'admin', 'admin@metropolia.fi', '$2a$10$5RzpyimIeuzNqW7G8seBiOzBiWBvrSWroDomxMa0HzU6K2ddSgixS', 'admin'),
(37, 'Test User', 'john', 'john@metropolia.fi', '$2a$10$5RzpyimIeuzNqW7G8seBiOzBiWBvrSWroDomxMa0HzU6K2ddSgixS', 'user'),
(40, 'Patrik', 'yahhas', 'urpo@gmail.com', '$2b$10$Nb9.a3rb1FKQnRwHCKEABOYKyk4/72zKZ78eF0V/FSTzG0T2Jz69m', 'user'),
(41, 'PatrikAdmin', 'yahhasz', 'patrik@gmail.com', '$2b$10$zyxXrag4aVi1y9TuyrMWbu7Wnbyrr35k.70jIxi5np.e5SiPPvOYm', 'admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`categoryId`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`customerId`);

--
-- Indexes for table `orderItems`
--
ALTER TABLE `orderItems`
  ADD PRIMARY KEY (`orderItemId`),
  ADD KEY `orderId` (`orderId`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`orderId`),
  ADD KEY `customerId` (`customerId`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`productId`),
  ADD KEY `categoryId` (`categoryId`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`reviewId`),
  ADD KEY `customerId` (`customerId`),
  ADD KEY `orderId` (`orderId`);

--
-- Indexes for table `shoppingCarts`
--
ALTER TABLE `shoppingCarts`
  ADD PRIMARY KEY (`shoppingCartId`),
  ADD KEY `orderId` (`orderId`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `wsk_cats`
--
ALTER TABLE `wsk_cats`
  ADD PRIMARY KEY (`cat_id`),
  ADD KEY `owner` (`owner`);

--
-- Indexes for table `wsk_users`
--
ALTER TABLE `wsk_users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `categoryId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `customerId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `orderItems`
--
ALTER TABLE `orderItems`
  MODIFY `orderItemId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `orderId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `productId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `reviewId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `shoppingCarts`
--
ALTER TABLE `shoppingCarts`
  MODIFY `shoppingCartId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `wsk_cats`
--
ALTER TABLE `wsk_cats`
  MODIFY `cat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `wsk_users`
--
ALTER TABLE `wsk_users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orderItems`
--
ALTER TABLE `orderItems`
  ADD CONSTRAINT `orderItems_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`),
  ADD CONSTRAINT `orderItems_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customerId`) REFERENCES `customers` (`customerId`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`);

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`customerId`) REFERENCES `customers` (`customerId`),
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`);

--
-- Constraints for table `shoppingCarts`
--
ALTER TABLE `shoppingCarts`
  ADD CONSTRAINT `shoppingCarts_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`),
  ADD CONSTRAINT `shoppingCarts_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`);

--
-- Constraints for table `wsk_cats`
--
ALTER TABLE `wsk_cats`
  ADD CONSTRAINT `fk_owner_user_id` FOREIGN KEY (`owner`) REFERENCES `wsk_users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
