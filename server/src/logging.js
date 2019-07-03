const hooks = exports.hooks = {
	onRequest: async (request, reply) => {
		request.log.debug(`[${request.id}] >>> ${request.req.method} ${request.req.url}`);
	},
	onResponse: async (request, reply) => {
		request.log.debug(`[${request.id}] <<< ${request.req.method} ${reply.res.statusCode}`);
	},
};
