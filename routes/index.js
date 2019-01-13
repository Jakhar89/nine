var express = require('express');
var router = express.Router();

//Render Index
router.get('/', function(req, res, next){
    //res.send('Hello');
    res.render('../index.html');
});
router.post('/', function(req, res) {
    var body = req.body;
    var resArray=[];
    var response={'response':resArray}; 
    
    if(body.payload){
        body.payload.forEach((el)=> {
        
            if(el.drm == true && el.episodeCount > 0){
                let resBody={'image':'','slug':'','title':''};
                resBody.image=el.image.showImage;
                resBody.slug=el.slug;
                resBody.title=el.title;

                resArray.push(resBody);
            }

        });
        
    }
    res.send(response);
});

module.exports = router;