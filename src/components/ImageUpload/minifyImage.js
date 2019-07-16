const fs = require('fs');
const path = require('path');
const base64Img = require('base64-img');
const Jimp = require('jimp');
const randomstring = require("randomstring");
const multer = require('multer');

const { promisify } = require('util');
const sizeOf = promisify(require('image-size'));


module.exports = (app) => {
  let filePath;
  let minifyPath;
  let newFileName;
  const MAGIC_NUMBERS = { jpg: 'ffd8ffe0', jpg1: 'ffd8ffe1', png: '89504e47', gif: '47494638' };

  /**
   * multer storage configuration
   */
  const storage = multer.diskStorage({
    destination: function(req, file, callback) {
      callback(null, path.join(__dirname, '/../uploads'));
    },
    filename: function(req, file, callback) {
      let fileBaseName = path.basename(file.originalname, path.extname(file.originalname));
      fileBaseName = randomstring.generate(7);

      newFileName = fileBaseName + path.extname(file.originalname);

      filePath = path.join(__dirname, '/../uploads', newFileName);
      minifyPath = path.join(__dirname, '/../uploads', "m_" + newFileName);

      callback(null, newFileName);
    }
  });

  return {
    upload
  };

  function upload(req, res, next) {
    const upload = multer({ storage: storage }).any();

    upload(req, res, function(err) {
      const bitmap = fs.readFileSync(__dirname + '/../uploads/' + req.files[0].filename).toString('hex', 0, 4);
      if (!_checkMagicNumbers(bitmap)) {
        fs.unlinkSync('./uploads/' + req.files[0].filename);
        res.status(403).end('File is not valid');
      }

      const minifyOriginalImage = new Promise(function (resolve, reject) {
        Jimp.read(filePath).then(function (image) {
          image.scale(0.1)
          .write(minifyPath, resolve);
        }).catch(function (err) {
          console.error(err);
          return res.status(400).end("Error during minify process");
        });
      });

      minifyOriginalImage.then(async function () {
        dataImage = base64Img.base64Sync(minifyPath);

        const dimensions = await sizeOf(__dirname + '/../uploads/' + newFileName);

        res.status(200).json({
          imageName: newFileName,
          imageBase64: dataImage,
          dimensions: {
            width: dimensions.width,
            height: dimensions.height
          }
        });
      });
    });
  }

  function _checkMagicNumbers(magic) {
    if (magic == MAGIC_NUMBERS.jpg || magic == MAGIC_NUMBERS.jpg1 || magic == MAGIC_NUMBERS.png || magic == MAGIC_NUMBERS.gif)
      return true;
  }
};
