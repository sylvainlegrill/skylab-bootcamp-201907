import jwt from 'jsonwebtoken'

/**
 * Get a user id by by decoding token.
 * 
  * @returns {string} sub id.
 * 
 * 
 */


export default function() {
    const { sub } = jwt.decode(this.__token__)

    return sub
}