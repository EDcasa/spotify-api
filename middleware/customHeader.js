const customHeder = (req, res, next) => {
    try {
        const api_key = req.headers.api-key;
        if(api_key === process.env.API_KEY){
            next();
        } else {
            res.status(403);
            res.send({error:"API_KEY ERROR"})
        }
    } catch (error) {
        res.status(403);
        res.send({error:"Error in customHeder"})
    }
}

module.exports = customHeder;