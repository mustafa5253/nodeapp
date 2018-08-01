var express = require('express');
var router = express.Router();
var services = require('../services');
// var upload = multer({ dest: 'uploads/' });
var fs = require('fs');
var path = require('path');
var mmm = require('mmmagic');
let Magic = mmm.Magic;
let magic = new Magic(mmm.MAGIC_MIME_TYPE);

let aws = require('aws-sdk');
let multer  = require('multer');
var multerS3 = require('multer-s3');

var isAdminGuard = require('../authorization/is-admin-guard');

aws.config.update({
    secretAccessKey: 'uReN/fajmxmOyNZIKW6E4RIPOY9G3gaxuLd/b3M7',
    accessKeyId: 'AKIAJARREX7UOZ7ZXDGQ',
    region: 'ap-south-1'
});

let s3 = new aws.S3();

let upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'office-mirror-dev',
        key: function (req, file, cb) {
            cb(null, Date.now().toString()); //use Date.now() for unique file keys
        }
    })
});


/*
 * GET ALL
 */
router.get('/all', setQueryParamsInReq, services.document.list);

function setQueryParamsInReq(req, res, next) {

    req.page = req.query.page ? parseInt(req.query.page) : 1;
    req.count = req.query.count ? parseInt(req.query.count) : 10;

    next();
}

/*
 * GET
 */
// router.get('/:id', services.document.show);
router.get('/:id', function (req, res) {
    // Validate that req.params.id is 16 bytes hex string
    // Get the stored image type for this image
    res.setHeader('Content-Type', 'image/jpeg');
    if (fs.existsSync(path.join('uploads', req.params.id))) {
        // Do something
        fs.createReadStream(path.join('uploads', req.params.id)).pipe(res);
    } else {
        fs.createReadStream(path.join('api-assets', 'e6b65b74e544696704044b42e859953e')).pipe(res);
    }
});

/*
 * DOWNLOAD
 */
router.get('/download/:id', function (req, res) {
    let response = {};
    // fs.readFile(path.join('uploads', req.params.id), function(err, data) {
    //     if(err) {
    //         response.status = 'error';
    //         response.data = 'Some error while downloading file.';
    //         res.send(response);
    //     } else {
    //         let base64data = new Buffer(data).toString('base64');
    //         magic.detectFile(path.join('uploads', req.params.id), function(error, result) {
    //             if(!error) {
    //                 response.file_type = result;
    //             }
    //             response.status = 'success';
    //             response.data = base64data;
    //             res.send(response);
    //         });
    //     }
    // });

    s3.getObject(
        { Bucket: 'office-mirror-dev', Key: req.params.id },
        function (error, data) {
          if (error) {
            response.status = 'error';
            response.data = error;
            res.send(response);
          } else {
            let base64data = new Buffer(data.Body).toString('base64');
            response.status = 'success';
            response.data = base64data;
            res.send(response);
          }
        }
      );
});

/*
 * POST
 */
router.post('/', upload.single('file'), services.document.create);

/*
 * PUT
 */
router.put('/:id', services.document.update);

/*
 * DELETE
 */
router.delete('/:id', (req, res) => {
    let response = {};
    services.document.remove(req, res, (data) => {
        var params = {  Bucket: 'office-mirror-dev', Key: data.key };
        s3.deleteObject(params, function(err, s3Res) {
            if(err) {
                response.status = 'error';
                response.data = err;
            } else {
                response.status = 'success';
                response.data = data;
            }
            res.send(response);
        });
    });
});


/*
 * GET USER FILES
 */
router.get('/user-docs/:id', isAdminGuard, services.document.getUserDocs);


module.exports = router;