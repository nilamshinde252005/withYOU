//Express, req.body is available only when:The request method is POST, PUT, or PATCH

function limitTaskLength(req,res,next){
    const task = req.body?.task;

    if(task && task.length >140){
        return res.status(400).json({ message: 'Task exceeds 140 characters' });
    }
    next();
}
module.exports={ limitTaskLength };