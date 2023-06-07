const IO = require('../utils/io');
const jwt = require('../utils/jwt');
const User = new IO('./database/users.json');


const checkRole = async(req, res, next) => {
    try{
            // Read elements
        const users = await User.read();
        const token = await req.headers.authorization.split(" ")[1] || req.headers;
        if(!token) return res.status(401).json({message: "Invalid token"});   
            // get id and find user
        const { userId } = jwt.verify(token);
        const findUser = users.find((user) => user.id === userId);
            // Check it's role
        if(findUser['role'] === "admin") {
            next();
        }else{
            res.status(400).json({message: "Bad request"});
        }
    }catch(error){
        res.status(401).json(error.message);
    }
}

module.exports = {
    checkRole
};