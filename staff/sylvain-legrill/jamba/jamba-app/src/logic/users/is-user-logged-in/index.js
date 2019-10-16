/**
 * Checks if a user is logged in.
 * 
 */

export default function () {
    return !!this.__token__
}