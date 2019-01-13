var express = require('express');
var router = express.Router();

//Render Index
router.get('/', function(req, res, next){
    //res.send('Hello');
    res.render('../index.html');
});
router.post('/', function(req, res) {
    var body = req.body;
    var response={};
    var error=true;
    if(body.payload){
        var resArray=[];

        body.payload.forEach((el,i )=> {
            if (el.drm == false && el.episodeCount && error){
                error=false;
                response={'result':resArray};         
            }
            if(el.drm == true && el.episodeCount > 0){
                let resBody={'image':'','slug':'','title':''};
                resBody.image=el.image.showImage;
                resBody.slug=el.slug;
                resBody.title=el.title;

                resArray.push(resBody);
            }
        });
        
    }
    if(error){
        res.status(400);
        response['error']='Could not decode request: JSON parsing failed';
        response['id']=error;
    }
    res.send(response);
});

module.exports = router;