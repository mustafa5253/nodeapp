module.exports = (req, res, next) => {

	if (req.user && req.user.user_type === 'admin') {
		next();
	} else {
		res.
		status(403).
		send({
			status: 'error',
			data: null,
			message: 'You don\'t have permission to perform this action.'
		});
	}
}