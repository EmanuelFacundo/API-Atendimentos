const fs = require('fs');
const path = require('path');

module.exports = (pathFile, nameFile, callback) => {

  const validTypes = ["png", "jpg", "jpeg"]
  const type = path.extname(pathFile)
  const valid = validTypes.includes(type.substring(1))

  if (!valid) {
    const err = "Tipo de arquivo invalido"
    callback(err)
  } else {
    const newPath = `./assets/images/${nameFile}${type}`
    fs.createReadStream(pathFile)
      .pipe(fs.createWriteStream(newPath))
      .on('finish', () => callback(false, newPath))
  }

}