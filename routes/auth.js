var nodemailer = require('nodemailer');
var smtpPool = require('nodemailer-smtp-pool');
var sender = 'windlockerauth <ouroboros@edcan.kr>';
var mailTitle = 'windlocker 화원가입확인';

var mailOptions = {
  from: sender,
  subject: mailTitle,
};


var smtpConfig = {
  host: 'smtp.worksmobile.com',
  port: 465,
  secure: true,
  auth: {
    user: 'ouroboros@edcan.kr',
    pass: 'drinkh0t$ix'
  }
};


var poolConfig = {
  pool: true,
  host: 'smtp.worksmobile.com',
  port: 465,
  secure: true,
  auth: {
    user: 'ouroboros@edcan.kr',
    pass: 'drinkh0t$ix'
  }
};

var transporter = nodemailer.createTransport(smtpPool(poolConfig));

module.exports = (router, Users, passport, rndString) =>{
  router.post('/signup', (req, res) => {
    var params = ['id', 'passwd', 'name'];

    if(check_param(req.body, params)){
      req.body.token = rndString.generate();
      req.body.auth_token = rndString.generate(7);
      mailOptions.html = "<a href=http://iwin247.kr:3002/auth/"+req.body.auth_token+">이메일인증하기</a>";     

      const new_user = new Users(req.body);
      mailOptions.to = req.body.id;

      transporter.sendMail(mailOptions, function (err, resa) {
            if (err)  return res.status(404).send("email invaild");
            else{
              new_user.save((err, data)=>{
                if(err) return res.status(400).send("save err");
                else{
                  return res.status(200).send(new_user);
                }
              });
            }

            transporter.close();
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

  router.get('/:token', async (req, res)=>{
     var find = await Users.findOne({auth_token: req.params.token});
     if(find && !find.is_cert){
       var test = await Users.update(find, {$set: {is_cert: true}});
       if(test.ok > 0) return res.status(200).send("succss");
       else return res.status(401).send("un authed"); 
     }else return res.status(404).send("user not found");
  });

  return router;
}
