const { content } = require('../../models');
const { comment } = require('../../models');
const { user } = require('../../models');
const { tag } = require('../../models');

module.exports = {
    get: async (req, res) => {       
       console.log(req.params)
       if(!req.params.id) {
          return res.status(400).send({ message: "존재하지 않는 글입니다 !" })
       } else {
           // content정보에 태그 정보를 넣어서 불러오기
           const contentInfo = await content.findOne({
            where: { id: req.params.id },
            include: [{
                model: tag,
                attributes: ["tagName"]
            }]
          })
            // console.log(contentInfo)
           // content를 작성한 유저 정보 불러오기

           const contentWrite = await content.findOne({
               where: { id: req.params.id }
           })

           const userContentInfo = await user.findOne({
               where: { id: contentWrite.userId }
           })           
           // comment정보 불러오기
           const commentInfo = await comment.findAll({
               where: { contentId: req.params.id }
           })           
           // tag 더 생각해보기       
           res.status(200).send({ data: [{contentInfo, userContentInfo, commentInfo, }], message: `${req.params.id}번 게시글 정보입니다 !` })
       }
  }
}