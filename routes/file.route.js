var express = require('express');
var router = express.Router();
var services = require('../services');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
var fs = require('fs');
var path = require('path');


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
    fs.createReadStream(path.join('uploads', req.params.id)).pipe(res);
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