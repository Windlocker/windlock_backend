module.exports = (router, Users)=>{
  router.get('/:token', (req, res)=>{
    Users.findOne({token: req.body.token}, (err, users)=>{
        if(err) return res.status(500).send("DB err");
        if(users){
	 if(users.open){
	  return res.status(200).send("a");
	 }
 	}
        else return res.sendStatus(403);
    });
  });
  router.post('/', function(req, res, next) {
    Users.findOne({token: req.body.token}, (err, users)=>{
      if(err) res.status(500).send("DB err");
      if(users){
      Users.update({token: req.body.token},{$set: {"open": !users.open}}, (err, result)=>{
        if(err) return res.status(500).send("DB err");
        if(users) return res.status(200).send("su");
        else return res.status(412).send("nope");
      })
    }else return res.status(412).send("user not found");
    })
  })

  .get("/:token", (req, res)=>{
    Users.findOne({token: req.params.token}, (err, users)=>{
      if(err) res.status(500).send("DB err");
      if(users){
        if(users.open) return res.status(200).send("open");
        else return res.status(404).send("close");
      }
      else return res.status(412).send("user not found");
    });
  })

  .post("/restore", (req, res)=>{
      Users.findOne({token: req.body.token}, (err, users)=>{
          if(err) return res.status(500).send("err");
          if(users) return res.status(200).json({pincode:users.pincode});
      });
  });
  return router;
}
