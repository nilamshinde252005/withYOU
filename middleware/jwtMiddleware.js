{/*

    ** Before someone can access private or protected routes (like /dashboard, /journal, /todos), we want to:
1]Check if they are logged in (i.e. they have a valid JWT token)
2]Verify that the token wasn’t faked or expired
3]Extract their user info from the token so we can use it in later logic

    */}

//Brings in the jsonwebtoken library. Needed to verify tokens.
const jwt=require("jsonwebtoken");// use-whenever you're working with JWT tokens in any backend file — either to create, verify, or decode tokens.

// define a secure middleware fucntion
function jwtMiddleware(req, res, next) {
    const jwtToken = req.headers['authorization'];
    console.log("🔐 Incoming token header:", jwtToken);

    if (!jwtToken) {
        return res.status(403).json({ message: "Missing token" });
    }

    const tokenExtract = jwtToken.split(' ')[1];
    console.log("🔍 Extracted token:", tokenExtract);

    try {
        const payload = jwt.verify(tokenExtract, 'HyperionDev');
        req.payload = payload;
        console.log(" Verified payload:", payload);
        next();
    } catch (error) {
        console.log("JWT verification failed:", error.message);
        res.status(403).json({ message: "Invalid token" });
    }
}


module.exports={jwtMiddleware};