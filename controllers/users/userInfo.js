const { user } = require('../../models');

module.exports = {
  userinfo: async (req, res) => {
    // const { identifier } = req.body.body;
    // console.log(req.session)
    // console.log('서버' + identifier)
    // console.log(req.body)
    console.log(req.session)
   
    if (!req.session.doitnow) {
      // 세션 객체에 식별자가 존재하지 않는다면
      res.status(400).json("로그인 후 이용해주세요")
    } else {
      // 세션 객체에 식별자가 존재한다면
      //const id = req.session.identifier;
      const userInfo = await user.findOne({
        where: { username: req.session.doitnow }
      })
      

      const {
        username,
        nickname,
        email
      } = userInfo.dataValues;
      res.status(200).send({ username, nickname, email })
      
    }
  }
}
