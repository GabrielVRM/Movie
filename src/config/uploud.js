const multer = require('multer')
const crypto = require('crypto')
const path = require('path')

const TMP_FOLDER = path.resolve(__dirname, '..', '..', 'tmp')
const UPLOADS_FOLDERS = path.resolve(TMP_FOLDER, 'uploads')

const MULTER = {
  storage: multer.diskStorage({
    destination: TMP_FOLDER,
    filename(req, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex')
      const filename = `${fileHash}-${file.originalname}`
      console.log(filename)
      return callback(null, filename)
    },
  }),
}

module.exports = {
  TMP_FOLDER,
  UPLOADS_FOLDERS,
  MULTER,
}
