module.exports = (router, Users, passport, rndString) =>{
  router.post('/signup', (req, res) => {
    var params = ['id', 'passwd', 'name'];

    if(check_param(req.body, params)){
      const id = req.body.id;
      const passwd = req.body.passwd;
      const name = req.body.name;

      const new_user = new Users({
        id: id,
        passwd: passwd,
        name: name,
        token: rndString.generate()
      });

      new_user.save((err, data)=>{
        if(err) return res.status(400).send("save err");
        return res.status(200).json(new_user);
      });

    }else{
      return res.status(400).send("param missing or null");
    }
  })

  .post('/signin', (req,res)=>{
    var params = ['id', 'passwd'];
    if(check_param(req.body, params)){
      Users.findOne({id: req.body.id, passwd: req.body.passwd}, {__v:0, _id: 0, passwd: 0}, (err, user)=>{
        if(err) return res.status(500).send("DB err");
        if(user) {
          req.session.name = user.name;
          return res.status(200).json(user);
        }
        else return res.status(404).send("incorrect id or passwd");
      });
    }else return res.status(400).send("param missing or null");
  })

  .get('/auto/:token', (req, res)=>{
     var params = ['token'];

     if(check_param(req.params, params)){
       const token = req.params.token;
       Users.findOne({token: token}, {_id: 0, passwd: 0},(err, user) =>{
         if(err) return res.status(500).send("DB error");
         if(user) return res.status(200).json({id: user.id, name: user.name, token: user.token});
         else return res.status(404).send("user not found");
       });
     }else{
       return res.status(400).send("param missing or null");
     }
  });

  return router;
}
