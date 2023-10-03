import jwt from "jsonwebtoken";

export default (req, res, next) => {
    const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

    if (token) {
        try {
            
            const decoded = jwt.verify(token, 'your_secret_key_here');

            req.userId = decoded._id;
            next();
        } catch (e) {
            return res.status(401).json({
                message: "Нет доступа"
            });
        }

    } else {
       return res.status(403).json({
            message: "Нет доступа"
        });
    }

  
}