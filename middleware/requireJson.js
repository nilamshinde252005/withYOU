// Content-Type= This header tells us: "what kind of data is being sent?","application/json" = JSON data

function requireJson(req, res, next) {
    const contentType = req.headers['content-type'];
    
    if (!contentType || !contentType.includes('application/json')) {
        return res.status(415).json({ message: "Only JSON content allowed" });
    }

    next();
}

module.exports={ requireJson }