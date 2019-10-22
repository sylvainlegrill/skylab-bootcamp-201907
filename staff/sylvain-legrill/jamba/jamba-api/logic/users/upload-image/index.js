require('dotenv').config()

const { models: { User } } = require('jamba-data')
const cloudinary = require('cloudinary')
const { env: { CLOUDINARY_API_KEY, CLOUDINARY_NAME, CLOUDINARY_SECRET_KEY } } = process
/**
* Update user information.
* 
* @param {String} id 
* @param {Stream} image
* 
* @throws {TypeError} - if userId is not a string or buffer is not a buffer.
* @throws {Error} - if user is not found or image could not be uploaded.
*
* @returns {Object} - user.  
*/
module.exports = function (id, image) {
  
    
    return (async () => {
        const user = await User.findById(id)
        if (!user) throw new Error(`user with id ${id} not found`)
       
   
        cloudinary.config({
            cloud_name: CLOUDINARY_NAME,
            api_key: CLOUDINARY_API_KEY,
            api_secret: CLOUDINARY_SECRET_KEY
        })
        const _image = await new Promise((resolve, reject) => {
            const upload_stream = cloudinary.v2.uploader.upload_stream((err, image) => {
                if (err) return reject(err)
                resolve(image)
            })
            image.pipe(upload_stream)
        })
        await User.findByIdAndUpdate(id, { profileImg: _image.secure_url }, { new: true})
    })()
}