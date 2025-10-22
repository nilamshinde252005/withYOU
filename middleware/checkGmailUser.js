function checkGmailUser(req,res,next){
    const username=req.payload?.name;
    if(!username.endsWith('@gmail.com')){
        return res.status(403).json({ message: 'Only @gmail.com users allowed' });
    }
    next();
}
module.exports = { checkGmailUser };
