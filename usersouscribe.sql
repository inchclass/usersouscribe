-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 27 sep. 2023 à 12:33
-- Version du serveur : 10.4.24-MariaDB
-- Version de PHP : 8.0.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `usersouscribe`
--

-- --------------------------------------------------------

--
-- Structure de la table `job`
--

CREATE TABLE `job` (
  `id` int(11) NOT NULL,
  `titre` varchar(50) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `skills`
--

CREATE TABLE `skills` (
  `id` int(11) NOT NULL,
  `id_job` int(11) NOT NULL,
  `titre` varchar(50) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `typeofjob`
--

CREATE TABLE `typeofjob` (
  `id` int(11) NOT NULL,
  `intitule` varchar(250) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `nom`, `prenom`, `email`, `phone`) VALUES
(1, 'Cyprien', 'DONTSA', 'cypriendontsa@gmail.com', 698364432),
(2, 'Dontdsa', 'cypriend', 'cypriedfdfndontsa@gmail.com', 697364432),
(3, 'Dontdsa', 'cypssdriend', 'cypridontsa@gmail.com', 697364432),
(4, 'Dontdsa', 'cypssdriend', 'cypridontsadsd@gmail.com', 697364432),
(5, 'Dontdsa', 'cypssdriend', 'cypridontsadsd@gmail.com', 697364432),
(6, 'Dontdsa', 'cypssdriend', 'cypridontsadsd@gmail.com', 697364432),
(7, 'Dontdsa', 'cypssdriend', 'cypridddontsadsd@gmail.com', 697364432),
(8, 'Dontdsa', 'cypssdriend', 'cypridddontsadsd@gmail.com', 697364432),
(9, 'Dontdsa', 'cypssdriend', 'cypridddontsadsd@gmail.com', 697364432),
(10, 'Dontdsa', 'cypssdriend', 'cypridddontsadsd@gmail.com', 697364432),
(11, 'Dontdsa', 'cypssdriend', 'cypridddontsadsd@gmail.com', 697364432),
(12, 'Dontdsa', 'cypssdriend', 'cypridddontsadsd@gmail.com', 697364432),
(13, 'sdsdsd', 'sdsds', 'cypridddontsadsd@gmail.com', 698364432),
(14, 'sdsdsd', 'sdsds', 'cypridddontsadsd@gmail.com', 698364432),
(15, 'sdsdsd', 'sdsds', 'cypridddontsadsd@gmail.com', 698364432),
(16, 'sdsdsd', 'sdsds', 'cypridddontsadsd@gmail.com', 698364432),
(17, 'sdsdsd', 'sdsds', 'cypridddontsadsd@gmail.com', 698364432);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `job`
--
ALTER TABLE `job`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `skills`
--
ALTER TABLE `skills`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `typeofjob`
--
ALTER TABLE `typeofjob`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `job`
--
ALTER TABLE `job`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `skills`
--
ALTER TABLE `skills`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `typeofjob`
--
ALTER TABLE `typeofjob`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
