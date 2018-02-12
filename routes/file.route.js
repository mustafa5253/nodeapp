var express = require('express');
var router = express.Router();
var services = require('../services');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
var fs = require('fs');
var path = require('path');
var mmm = require('mmmagic');
let Magic = mmm.Magic;
let magic = new Magic(mmm.MAGIC_MIME_TYPE);

/*
 * GET ALL
 */
router.get('/all', services.document.list);

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
    fs.readFile(path.join('uploads', req.params.id), function(err, data) {
        if(err) {
            response.status = 'error';
            response.data = 'Some error while downloading file.';
            res.send(response);
        } else {
            let base64data = new Buffer(data).toString('base64');
            magic.detectFile(path.join('uploads', req.params.id), function(error, result) {
                if(!error) {
                    response.file_type = result;
                }
                response.status = 'success';
                response.data = base64data;
                res.send(response);
            });
        }
    });
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
router.delete('/:id', services.document.remove);


module.exports = router;