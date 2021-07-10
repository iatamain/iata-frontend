const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../config')
module.exports = (req, res, next)=>{
   if(req.method == 'OPTIONS'){
      next();
   }
   try{
      const token = req.headers.authorization.split(' ')[1] // "Bearer TOKEN"
      if(!token){
         return res.status(401).json({message: 'Не авторизован'});
      }
      const decoded = jwt.verify(token, jwtSecret);
      req.user = decoded;
      next();
   } catch(e){
      console.log("Не авторизован " + e.message);
      return res.status(401).json({message: 'Не авторизован'});
   }
}