import jwt from 'jsonwebtoken';

function checkAuth(req, res, next) {
    console.log('받은 헤더:', req.headers.authorization);  // 임시 추가

    const authHeader = req.headers.authorization;  
    
    if (!authHeader) {
        return res.status(401).json({ error: 'No token provided' });
    }
    
    const token = authHeader.split(' ')[1];  
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId; 
        next();  
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
    
}
export default checkAuth;