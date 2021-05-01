const { content } = require('../../models');

module.exports = {
  put: (req, res) => {
     const { title, boardName, contentBody, img } = req.body;
      if(!req.session.userId) {
      res.status(401).json({ message: 'Please login' })
      } else {    
      content
       .update(
         {
           title: title,
           boardName: boardName,
           contentBody: contentBody,
           img: img
         },
         {
           where: {
             userId: req.session.userId,
             id: req.params.id
           },
         },
       ).then((data) => {
          // console.log(data)
          res.status(200).send({ "message": "complete update !" })
       })
        .catch((err) => {
           res.status(500).send('err');
       });
    }   
  },
};