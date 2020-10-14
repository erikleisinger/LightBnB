INSERT INTO users (id, name, email, password)
VALUES (DEFAULT, 'Paul Giamatti', 'paul@famouspeople.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
(DEFAULT, 'Dawn Oftime', 'timelydawn@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
(DEFAULT, 'Carol Baskin', 'carolstigers@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
(DEFAULT, 'Patricia Blue', 'patblue@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
(DEFAULT, 'Sergei Rachmaninoff', 'svrachmaninoff@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
(DEFAULT, 'Bippity Boo-pop Kazoo', 'frankandtheguys@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
(DEFAULT, 'Gandalf', 'bigbeardz@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');


INSERT INTO properties (id, owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (DEFAULT, 2, 'Montreal Townhouse', 'description', 'url', 'url', 200, 2, 2, 3, 'Canada', 'Rue Saint-Denis', 'Montreal', 'Quebec', 'H2L5G6', true),
(DEFAULT, 1, 'NDG murder home', 'description', 'url', 'url', 30, 0, 7, 5, 'Canada', 'Rue Clamondon', 'Montreal', 'Quebec', 'H2L5G6', true),
(DEFAULT, 2, 'Country Getaway', 'description', 'url', 'url', 150, 4, 2, 4, 'Canada', 'Rue de la Compagne', 'Montreal', 'Quebec', 'H2L5G6', true),
(DEFAULT, 3, 'A washing machine', 'description', 'url', 'url', 5, 0, 1, 1, 'Canada', 'Avenue de Maisonneuve', 'Montreal', 'Quebec', 'H2L5G6', true),
(DEFAULT, 4, 'Two cardboard boxes', 'description', 'url', 'url', 50, 0, 2, 2, 'Canada', 'Rue Clamondon', 'Montreal', 'Quebec', 'H2L5G6', true);

INSERT INTO reservations (id, guest_id, property_id, start_date, end_date)
VALUES (DEFAULT, 1, 2, '2020-11-01', '2020-11-03'),
(DEFAULT, 3, 1, '2020-11-03', '2020-11-04'),
(DEFAULT, 2, 3, '2020-11-02', '2020-11-03'),
(DEFAULT, 4, 4, '2020-11-09', '2020-11-11'),
(DEFAULT, 5, 2, '2020-11-14', '2020-11-17'),
(DEFAULT, 6, 1, '2020-11-14', '2020-11-17'),
(DEFAULT, 7, 4, '2020-11-02', '2020-11-07');

INSERT INTO property_reviews (id, guest_id, property_id, reservation_id, rating, message)
VALUES (DEFAULT, 1, 2, 15, 3, 'message'),
(DEFAULT, 3, 1, 16, 5, 'message'),
(DEFAULT, 4, 4, 18, 1, 'message');


