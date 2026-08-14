function health(req, res){
    res.status(200).json({health: "OK",
    time: new Date().toTimeString()});
}