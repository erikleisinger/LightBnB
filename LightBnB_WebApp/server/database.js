const properties = require('./json/properties.json');
const users = require('./json/users.json');

const { Pool } = require('pg');
const pool = new Pool ({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb',
});

pool.connect

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return pool.query(`
  SELECT *
  FROM users
  WHERE email LIKE $1;
  `, [email]).then((res) => {
    return Promise.resolve(res.rows[0]);
  });
  
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool.query(`
  SELECT *
  FROM users
  WHERE id = $1;
  `, [id]).then((res) => {
    console.log(res)
    return Promise.resolve(res.rows[0]);
  });
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  const dataArray = [user.name, user.email, user.password];
  return pool.query(`
    INSERT INTO users (name, email, password)
    VALUES($1, $2, $3)
    RETURNING *;
  `, dataArray).then((res) => {
    Promise.resolve(res.rows);
  });
  
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return pool.query(`
  SELECT reservations.*, properties.*
  FROM reservations
  JOIN properties on properties.id = reservations.property_id
  JOIN users ON users.id = reservations.guest_id
  WHERE reservations.guest_id = $1
  GROUP BY reservations.id, properties.id;
  `, [guest_id]).then((res) => {
    return Promise.resolve(res.rows);
  })
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

 /*
 {
  city,
  owner_id,
  minimum_price_per_night,
  maximum_price_per_night,
  minimum_rating
}
  */
const getAllProperties = function(options, limit = 10) {
  const queryParams = [];
    console.log(options)
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) AS average_rating
  FROM properties
  JOIN property_reviews ON property_id = properties.id
  `;

  // console.log(queryParams.findIndex((item) => {
  //   return item = options.city;
  // }))

  // Check for options

  if (options) {
    queryString += `WHERE `;
  }

  // Check for city

  if (options.city) {
    queryParams.push(options.city)
    queryString += `city LIKE $${queryParams.length} AND `;
  };

  if (options.owner_id) {
    queryParams.push(options.owner_id)
    queryString += `city LIKE $${queryParams.length} AND `;
  }

  if (options.maximum_price_per_night) {
    queryParams.push(options.maximum_price_per_night)
    queryString += `cost_per_night < $${queryParams.length} AND `;
  }

  if (options.minimum_price_per_night) {
    queryParams.push(options.minimum_price_per_night)
    queryString += `cost_per_night >= $${queryParams.length} AND `;
  }

  if (options.minimum_rating) {
    queryParams.push(options.minimum_rating)
    queryString += `rating >= $${queryParams.length} AND `;
  }

  queryString = queryString.substring(0, queryString.length - 4);

  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  
  console.log(queryString, queryParams);



  return pool.query(queryString, queryParams)
  .then(res => res.rows);
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;
