module.exports = {
  user: {
  	create: require('./user/create'),
  	update: require('./user/update'),
  },
  company: {
  	create: require('./company/create'),
  	update: require('./company/update'),
  },
  services: {
  	create: require('./services/create'),
  	update: require('./services/update'),
  },
  plan: {
  	create: require('./plan/create'),
  	update: require('./plan/update'),
  },
  task: {
  	create: require('./task/create'),
  	update: require('./task/update'),
  },
  document: {
  	create: require('./document/create'),
  	update: require('./document/update'),
  }
};