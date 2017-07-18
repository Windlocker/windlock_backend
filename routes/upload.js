var multer = require('multer');
var Q = require('q');

var upload = (req, res, token) => {
  var deferred = Q.defer();
  var storage = multer.diskStorage({
  // 서버에 저장할 폴더
    destination: function (req, file, cb) {
      cb(null, "upload/");
    },
        // 서버에 저장할 파일 명
    filename: function (req, file, cb) {
      var token = req.body.token;

      file.uploadedFile = {
        name: token,
        ext: file.mimetype.split('/')[1]
      };

      cb(null, file.uploadedFile.name + '.' + file.uploadedFile.ext);
    }
  });

  var upload = multer({ storage: storage }).single('file');
    upload(req, res, function (err) {
    if (err) deferred.reject();
    else if (req.file === undefined){
      console.log("파일안날라옴 ");
    }else deferred.resolve(req.file.uploadedFile);

    });
    return deferred.promise;
};


module.exports = (router)=>{
  router.get('/', function(req, res, next) {
    upload(req, res).then(function (file) {
      return res.status(200).send("suck");
    }, function (err) {
      if(err) return res.status(409).send(err);
    });
  })
  });

  return router;
}
