const jwt = require("jsonwebtoken");

module.exports = async function (req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if no token
  if (!token) {
    return res.send(JSON.stringify({ result: "No token, authorization denied" }));
  }

  // Verify token
  try {
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        return res.send(JSON.stringify({ result: "Token is not valid" }));
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } catch (err) {
    console.error("something wrong with auth middleware");
    res.send(JSON.stringify({ result: "sorry, Error happened in the Server!" }));
  }
};
