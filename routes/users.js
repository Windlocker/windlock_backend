module.exports = (router, Users)=>{
  router.get('/', (req, res)=>{
  })

  .post('/user', (req, res)=>{
    Users.find({}, (err, users)=>{
      if(err) return res.status(500).send("DB err");
      if(users) return res.status(200).json(users);
      else return res.status(412).send("nope");
    })
  })

  .put('/:id', (req, res)=>{

  })

  .delete('/:id', (req, res)=>{

  })

  return router;
}
