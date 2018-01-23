let mongoose = require('mongoose');
let models = require('../models');

function isIdValid(id, cb) {
    cb(mongoose.Types.ObjectId.isValid(id));
}

module.exports = {

    getPaginatedList: (modelName, page, count, callbackFn) => {

        page = page ? Number(page) : 1;
        count = count ? Number(count) : 10;

        let response = {};
        models[modelName].paginate({}, { page: page, limit: count })
            .then(results => {
                /**
                 * Response looks like:
                 * {
                 *   docs: [...] // array of Posts
                 *   total: 42   // the total number of Posts
                 *   limit: 10   // the number of Posts returned per page
                 *   page: 2     // the current page of Posts returned
                 *   pages: 5    // the total number of pages
                 * }
                */
                response.status = 'success';
                response.data = results;
                callbackFn(response);
            })
            .catch((err) => {
                response.status = 'error';
                response.data = err;
                callbackFn(response);
            });
    },

    getAll: (modelName, callbackFn) => {

        let response = {};

        models[modelName].find().sort('-_id').find({}, (err, rows) => {
            if (err) {
                response.status = 'error';
                response.data = err;
            } else {
                response.status = 'success';
                response.data = rows;
            }

            callbackFn(response);
        });
    },

    getAllWhere: (modelName, conditionObj,callbackFn) => {

        let response = {};

        console.log('conditionObj is :', conditionObj);

        models[modelName].find(conditionObj).sort('-_id').find({}, (err, rows) => {
            if (err) {
                response.status = 'error';
                response.data = err;
            } else {
                response.status = 'success';
                response.data = rows;
            }

            callbackFn(response);
        });
    },

    getById: (id, modelName, callbackFn) => {

        let response = {};

        models[modelName].findOne({ _id: id }, (err, row) => {
            if (err) {
                response.status = 'error';
                response.data = err;
            } else {
                response.status = 'success';
                response.data = row;
            }

            callbackFn(response);
        });
    },

    create: (data, modelName, cb) => {

        let response = {};
        let newData = new models[modelName](data);

        newData.save(data, (err, row) => {
            if (err) {
                response.status = 'error';
                response.data = err;
            } else {
                response.status = 'success';
                response.data = row;
            }
            cb(response);
        });

    },

    bulkCreate: (data, model, cb) => {

        let response = {};

        model.collection.insert(data, (err, rows) => {
            if (err) {
                response.status = 'error';
                response.data = err;
            } else {
                response.status = 'success';
                response.data = rows;
            }
            cb(response)
        });


    },


    update: (id, data, model, cb) => {

        let response = {};

        models[model].findOneAndUpdate({ _id: id }, { $set: data }, { new: true, multi: false }, (updationErr, uodatedRow) => {
            if (updationErr) {
                response.status = 'error';
                response.data = updationErr;
            }
            else {
                response.status = 'success';
                response.data = uodatedRow;
            }
            cb(response);
        });

        // isIdValid(id, (isValid) => {
        //     if(isValid){
        //         models[model].findOne({_id: id}, (err, row) => {
        //             if(err) {
        //                 response.status = 'error';
        //                 response.data = err;
        //                 cb(response);
        //             } else if(!row) {
        //                 response.status = 'error';
        //                 response.message = 'NOT_FOUND';
        //                 response.data = null;
        //                 cb(response);
        //             } else {

        //                 let query = { _id: id };
        //                 let options = { multi: false };

        //                 models[model].update(query, data, options, (updationErr, uodatedRow) => {
        //                     if(updationErr) {
        //                         response.status = 'error';
        //                         response.data = updationErr;
        //                     } 
        //                     else {
        //                         response.status = 'success';
        //                         response.data = uodatedRow;
        //                     }

        //                     cb(response);
        //                 });
        //             }
        //         });
        //     } else {
        //         response.status = 'error';
        //         response.data = 'Provided id is not valid';
        //         cb(response);
        //     }

        // });
    },

    delete: (id, model, cb) => {

        let response = {};

        isIdValid(id, (isValid) => {
            if (isValid) {
                models[model].findOne({ _id: id }, (err, row) => {
                    if (err) {
                        response.status = 'error';
                        response.data = err;
                        cb(response);
                    } else if (!row) {
                        response.status = 'error';
                        response.message = 'NOT_FOUND';
                        response.data = null;
                        cb(response);
                    } else {

                        models[model].findByIdAndRemove({ _id: id }, (err, deletedRow) => {
                            if (err) {
                                response.status = 'error';
                                response.data = err;
                            } else {
                                response.status = 'success';
                                response.data = deletedRow;
                            }
                            cb(response);
                        });
                    }
                });

            } else {
                response.status = 'error';
                response.data = 'Provided id is not valid';
                cb(response);
            }
        });
    }
}
