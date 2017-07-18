module.exports = (router, Users)=>{

  router.get('/:token', (req, res)=>{
    Users.findOne({token: req.body.token}, (err, user)=>{
        if(err) return res.status(500).send("DB err");
        if(user.open) return res.sendStatus(200);
        else return res.sendStatus(403);
    });
  });

  return router;
}
