-- If Exists Table Drop
DROP TABLE IF EXISTS users cascade;


CREATE TABLE countries(
    id SERIAL,
    name TEXT NOT NULL PRIMARY KEY,
    code TEXT NOT NULL,
    continent TEXT NOT NULL CHECK (continent IN ('Europe', 'Asia', 'Africa', 'Oceania', 'North America', 'South America', 'Antarctica')),
    surf_season TEXT NOT NULL,
    good_weather_season TEXT NOT NULL,
    timezone TEXT NOT NULL,
    life_cost INTEGER NOT NULL CHECK (life_cost >= 1 AND life_cost <= 5)
);

CREATE TABLE spots(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    country TEXT NOT NULL REFERENCES countries(name) ON DELETE CASCADE,
    image_link TEXT NOT NULL,
    has_coworking BOOLEAN DEFAULT FALSE,
    has_coliving BOOLEAN DEFAULT FALSE,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    wifi_quality INTEGER NOT NULL CHECK (wifi_quality >= 1 AND wifi_quality <= 5),
    creator_name TEXT REFERENCES users(name) ON DELETE SET NULL,
    submitted_by INTEGER REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE users( 
    id SERIAL PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    email VARCHAR(32) UNIQUE NOT NULL,
    password VARCHAR(48) NOT NULL,
    createdAt TIMESTAMP WITHOUT TIME ZONE DEFAULT(NOW() AT TIME ZONE 'utc'),
    updatedAt TIMESTAMP WITHOUT TIME ZONE
);

CREATE TABLE work_places (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('café', 'coworking', 'coliving')),
    spot_id INTEGER NOT NULL REFERENCES spots(id) ON DELETE CASCADE,
    creator_user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    adress TEXT NOT NULL,
    image_link TEXT NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL
);



CREATE TABLE ratings(
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    work_place_id INTEGER REFERENCES work_places(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 0 AND rating <= 5),
    PRIMARY KEY (user_id, work_place_id)
);

CREATE TABLE likes(
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    spot_id INTEGER REFERENCES spots(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, spot_id)
);



