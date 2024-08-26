// import jwt from 'jsonwebtoken'
// import { secretKey } from '../configuration/jwtConfig'

// function generateToken (user){
//     const payload={
//         id: user._id,
//         name:user.name,
//         email:user.email,
//     }
//     return jwt.sign(payload,secretKey,{expireIn:"5h"});
// }

// export default generateToken;
import jwt from "jsonwebtoken";


function generateToken(user) {
  const payload = {
    id: user._id,
    name: user.name,
    email: user.email,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "5h" });
}

export default generateToken;
