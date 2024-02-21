
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


CREATE TABLE `appointment` (
  `id` int(11) NOT NULL,
  `doctorId` varchar(250) NOT NULL,
  `patientId` varchar(250) NOT NULL,
  `date` varchar(250) NOT NULL,
  `time` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



INSERT INTO `appointment` (`id`, `doctorId`, `patientId`, `date`, `time`) VALUES
(1, 'Dr. Karthik', 'Arun', '2023-05-31', '17:16'),
(2, 'Dr. Chand', 'Kumari', '2023-05-31', '17:16');



CREATE TABLE `doctor` (
  `id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `contact` varchar(250) NOT NULL,
  `special` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



INSERT INTO `doctor` (`id`, `name`, `contact`, `special`) VALUES
(1, 'Dr. Karthik', '8596324569', 'Teeth'),
(2, 'Dr. Kumari', '8542365489', 'Eye'),
(3, 'Dr. Chand', '8542369854', 'Bone');



CREATE TABLE `patient` (
  `id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `contact` varchar(250) NOT NULL,
  `address` varchar(250) NOT NULL,
  `gender` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT INTO `patient` (`id`, `name`, `contact`, `address`, `gender`) VALUES
(1, 'Arun', '1234569856', 'Aaa, Bbb, ccc', 'Male'),
(2, 'Bandana', '6985324568', 'ABC, XYZ, Bypass', 'Female');



CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



INSERT INTO `users` (`id`, `email`, `password`) VALUES
(1, 'admin@gmail.com', 'admin');

ALTER TABLE `appointment`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `doctor`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `patient`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `appointment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;


ALTER TABLE `doctor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

ALTER TABLE `patient`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;


ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;
