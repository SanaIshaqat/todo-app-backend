'use strict';

const { users } = require('../models/index.js');

module.exports = async (req, res, next) => {

  try {

    if (!req.headers.authorization) { next('Invalid Login') }

    const token = req.headers.authorization.split(' ').pop();
    console.log('this is the token :',token);
    const validUser = await users.authenticateToken(token);
    console.log('validUser:',validUser);
    req.user = validUser;
    req.token = validUser.token;
    next();
  } catch (e) {
      console.log(e);
    res.status(403).send('Invalid Login  obaaaaaaaaaaaaaa');;
  }
}















// 'use strict';

// const { users } = require('../models')

// module.exports = async (req, res, next) => {

//   try {

//     if (!req.headers.authorization) { _authError() }

//     const token = req.headers.authorization.split(' ').pop();
//     const validUser = await users.authenticateToken(token);
//     req.user = validUser;
//     req.token = validUser.token;
//     next();

//   } catch (e) {
//     _authError();
//   }

//   function _authError() {
//     next('Invalid Login');
//   }
// }