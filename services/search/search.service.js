/**
 * branch.js
 *
 * @description :: Server-side logic for managing branches.
 */

var dcl = require('../../dcl');

module.exports = {

    /**
     * find
     */
    find: (req, res) => {

    	var cb = (response) => {
  			if(response.status === 'success'){
  				// do something with data
  				res.send(response);
  			} else {
  				// do something with error
  				res.send(response);
  			}
  		}

      if(req.entity === 'employee') {
        if(req.searchText) {
          dcl.searchEntityByIndexedFields(req.searchText, 'User', cb);
        } else {
          const condition = { 'user_type': req.entity };
          dcl.getPaginatedList('User', condition, 1, 10, cb);
        }
      } else {
        res.status(400).send("Invalid request.");
      }
    }

}