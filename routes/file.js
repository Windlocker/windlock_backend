module.exports = (router, rndString, Users)=>{
  router.get('/', function(req, res, next) {
    var restore_key = rndString.generate(30);
    Users.findOne({token: req.body.token}, (err, users) =>{
      if(err) return res.status(500).send("DB error");
      if(users){
        Users.update({token: req.body,token}, {$set: {restore_key:restore_key}}, (err, result)=>{
          if(err) reutnrn  res.status(500).send("DB err");
          if(result) return res.status(200).send(restore_key);
          else  return res.status(403).send("faild");
        });
      }esle return res.status(404).send("user not found or invaild token");
    });
  });

  return router;
}
