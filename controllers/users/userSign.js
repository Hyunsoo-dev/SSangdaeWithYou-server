const { user } = require('../../models');
const { userinfo } = require('./userInfo');

module.exports = {
  sign: async (req, res) => {
   
     console.log(req.body)
    const {
      username,
      password
    } = req.body;

    // 사용자 조회 
    console.log('사용자조회')
    const userInfo = await user.findOne({
      where: { username: username, password: password }
    })
    
    // .catch(err => res.status(400).json("입력값이 잘못되었습니다."));

    if (!userInfo) {
      // 회원이 아니라면 
      res.status(404).send('존재하지 않는 사용자 입니다.')
    } else {
      // 회원이라면 
      // console.log(userInfo)
     req.session.doitnow = userInfo.dataValues.username 
     res.status(200).send("ok");
 
 
 

      //res.send(response);
       //  console.log("id1   " + req.session.id)
      //  res.status(200).json("ok")
    }
  }
}

// 소셜 로그인 => 유저 정보를 받아오고 (토큰 버려) (email, nickname, id) => 유저 정보를 우리 디비(email, nickname, username, null)에 저장하고 세션을 돌려줌 => 이 세션으로 인해 일반, 소셜 사용자가 동일해짐.

