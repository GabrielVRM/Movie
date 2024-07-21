const fs = require('fs')
const path = require('path')
const uploadsConfig = require('../config/uploud')

class DiskStorage {
  async saveFile(file) {
    await fs.promises.rename(
      path.resolve(uploadsConfig.TMP_FOLDER, file),
      path.resolve(uploadsConfig.UPLOADS_FOLDERS, file)
    )
    return file
  }

  async deleteFile(file) {
    const filePath = path.resolve(uploadsConfig.UPLOADS_FOLDERS, file)

    try {
      await fs.promises.stat(filePath)
    } catch (error) {
      return
    }

    await fs.promises.unlink(filePath)
  }
}

module.exports = DiskStorage
