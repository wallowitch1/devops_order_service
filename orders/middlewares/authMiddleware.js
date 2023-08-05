const jwt = require('jsonwebtoken');
const SECRET_KEY = "keroro2424.";

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Failed to authenticate token" });
    }

    req.user = decoded; // 토큰에서 해독된 사용자 정보를 req.user에 저장
    next();
  });
};

module.exports = verifyToken;
