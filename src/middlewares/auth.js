const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;



async function validateUser(req, res, next) {
    try {
        const PAYLOAD = {
            _id : req.body._id, 
            email : req.body.email 
        };

        const token = jwt.sign(PAYLOAD, SECRET_KEY);

        if(!token) {
            return res.status(500).send("Token generation failed");
        }

        req.token = token; 
        req.user = req.body;
        next();
    }
    catch(error) {
        res.status(500).send("Token generation failed");
    }
};



async function verifyToken(req, res, next) {
    try {
        //* Step-1  First of all get token given by client 
        let token = req.headers.authorization;
        token = token.split(" ")[1];

        //* Step-2  Verify this token 
        if(!token) {
            return res.status(400).send("Please provide bearer token");
        } 

        const isValid = await jwt.verify(token, process.env.SECRET_KEY);
        if(!isValid) {
            return res.status(400).send("Sorry, your token is invalid");
        }

        req.token = token;
        next();
    }
    catch(error) {
        res.status(400).send({
            message : "Please provide correct token", 
            error : error
        });
    }
};


module.exports = {
    validateUser, 
    verifyToken
}