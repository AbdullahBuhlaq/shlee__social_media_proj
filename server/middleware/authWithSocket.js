const jwt = require("jsonwebtoken");

module.exports = async function (socket, next) {
  // Get token from header
  let token;
  if (socket.handshake.query && socket.handshake.query.token) {
    try {
      token = socket.handshake.query.token;
      jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
          return next(new Error("Authentication error"));
        } else {
          socket.user = decoded.user;
          next();
        }
      });
    } catch (err) {
      console.error("something wrong with auth middleware");
      console.log({ result: "sorry, Error happened in the Server!" });
    }
  } else {
    next(new Error("Authentication error"));
  }

  // Verify token
};
