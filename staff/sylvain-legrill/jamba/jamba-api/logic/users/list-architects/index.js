const { models: { User }} = require("jamba-data")
const { validate } = require("jamba-utils")

/**
 * List all architects according to their city and specialty
 *
 * @param {string} role user's role: architect or customer ( customer by default)
 * @param {string} city user's city. Parameter only for architects
 * @param {string} specialty user's architect specialty ( residential , technical, interior design, landscaper). Only for architects
 * 
 * @throws {TypeError} - if role is not a string.
 * @throws {Error} - if users with specified role/city/specialty is empty or undefined or users not found.
 * 
 * @returns {Object} architect objects.
 *
 */

module.exports = function(city, specialty) {
  validate.string(city, "city")
  validate.string(specialty, "specialty")

  // if(role === "architect")
  return (async () => {
    const users = await User.find(
      { role: 'architect', city: city, specialty: specialty },
      { password: 0, __v: 0 }
    )
    if (!users)
      throw Error(
        `No architect with specialty ${specialty} found in the city of ${city}.`
      )
    users.forEach(user => {
      user.id = user._id.toString()
      delete user._id
    })
    return users
  })()
}
