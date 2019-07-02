const debugHooks = exports.debugHooks = {
	onRequest: async (request, reply) => {
		request.log.debug(`[${request.id}] >>>>> ${request.req.method} ${request.req.url}`);
	},
	onResponse: async (request, reply) => {
		request.log.debug(`[${request.id}] <${reply.res.statusCode}< ${request.req.method} `
			+ `${request.req.originalUrl}`);
	},
};
