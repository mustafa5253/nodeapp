module.exports = (req, res, next) => {

	if (req.user && req.user.user_type === 'admin') {
		next();
	} else {
		res.send({
			status: 'error',
			message: 'You don\'t have permission to perform this action.'
		});
	}
}