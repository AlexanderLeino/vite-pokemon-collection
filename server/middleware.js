const jwt = require('jsonwebtoken');
const expiration = '1h';
const secret = process.env.secret
module.exports = {
  authMiddleware: function ( req ) {
    console.log('Flowing', req)
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }

    return req;
  },
  signToken: function ({email, _id, userName }) {
    const payload = {  email, _id, userName };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};