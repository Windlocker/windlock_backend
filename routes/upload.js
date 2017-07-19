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

      file.uploadedFile = {
        name: file.originalname.split('.')[0],
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


module.exports = (router, rndString)=>{
  var pincode = [];
  router.post('/', function(req, res, next) {
    upload(req, res).then(function (file) {
      var Npincode = rndString.generate(4);
      pincode[Npincode] = file.name+"."+file.ext;
      return res.status(200).send(Npincode);
    }, function (err) {
      if(err) return res.status(409).send(err);
    });
  });

  router.get('/sync/:pincode', (req, res)=>{
    var pincodee = req.params.pincode;
    var file = pincode[pincodee];
    if(file === "" || file == undefined) return res.status(404).send("이미사용한 sync번호입니다");
    res.download("upload/"+file);
  })
  .get('/name/:pincode', (req, res)=>{
     var pincodee = req.params.pincode;
     var file = pincode[pincodee];
     return res.status(200).send(file);
    pincode[pincodee] = "";
   });
  return router;
}
