const { content } = require('../../models');

module.exports = {
  delete: (req, res) => {       
       // 로그인이 되어있는 상태에서 본인이 작성한것을 지울수 있기에
       // 먼저 로그인 상태를 확인한다
       // 로그인 상태가 아니라면 로그인 하라고 메세지를 보낸다 
       if(!req.session.userId) {
         res.status(401).json({ message: 'Please login' })
       } else {
           // 로그인 상태라면 유저가 작성한 글인지 확인하고
           // 해당 페이지 content를 delete하기 위해
           // content테이블에 id가 req.params.id와 같은 조건인 content를 찾아서
           // 데이터를 delete한다
           // console.log("???", req)
         content
           .destroy({
             where: {
               userId: req.session.userId,
               id: req.params.id
             },
           })
           .then(() => {                
              res.status(200).send({"message": 'content 삭제 성공 !'});                
           })
          .catch((err) => {
             res.status(500).send('err');
           });
          
       }
           
       // session에 들어있는 userId를 user에서 찾아서 없앤다

  },
};