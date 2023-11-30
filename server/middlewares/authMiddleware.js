const jwt = require('jsonwebtoken');
module.exports = async(req, res, next) => {
    const token = req.headers['authorization'].split(" ")[1]
        // console.log(token);
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
        try {
            if (err) {
                return res.status(200).send({ message: "Auth Failed", success: false });
            } else {
                req.body.userId = decode.id;
                next();
                // req.body.userId :decode.id;
            }
        } catch (err) {
            console.log(err);
            res.status(401).send({ message: "Auth Filed", success: false })
        }
    })
}