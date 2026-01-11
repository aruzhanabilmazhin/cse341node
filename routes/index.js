const router=require('express').Router();

router.get('/', (req,res)=> {res.send('Helo,World');});

module.exports=router;