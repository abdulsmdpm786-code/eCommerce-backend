import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next)=>{
    console.log("Header in verify", req.header);

    const authHeader = req.headers['authorization']
    if(!authHeader){
        return res.status(404).json({errMsg: "unauthorized user"})
    }

    const token = authHeader.split(' ')[1]
    console.log("token::",token);
    

    const verify = jwt.verify(token, process.env.JWT_SECRET_KEY)
    console.log("name is::", verify);
    
    if(verify.role !== 'admin'){
        return res.status(400).json({errMsg: "Enter prohibited"})
    }
    console.log("enter confirmed");
    next()
}