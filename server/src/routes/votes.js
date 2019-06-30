const { requireAuth } = require('../auth');

const filterUndefined = (object) => {
	return Object.keys(object).reduce((acc, cur) => {
		if (object[cur])
			acc[cur] = object[cur];
		
		return acc;
	}, {});
};

module.exports = (fastify, opts, next) => {
	const voteProperties = {
		_id: { type: 'string' },
		title: { type: 'string' },
		startDate: { type: 'number' },
		endDate: { type: 'number' },
	};

	fastify.addSchema({
		$id: 'genericError',
		type: 'object',
		properties: {
			error: { type: 'string' },
			message: { type: 'string' },
			statusCode: { type: 'number' },
		}
	});

	fastify.get('/get', {
		schema: {
			query: {
				id: { type: 'string' },
				skip: { type: 'number' },
				limit: { type: 'number' },
				filter: { type: 'string' },
				popular: { type: 'boolean' },
			},
			response: {
				'2xx': {
					type: 'array',
					items: { type: 'object', properties: voteProperties },
				},
				'4xx': 'genericError#',
			},
		},
	}, async (request, reply) => {
		const { id, skip, limit, filter } = request.query;

		if (id)
			return await fastify.database.votes.get({ _id: id }, { limit: 1 });

		const conditions = filterUndefined({
			title: filter ? new RegExp(`.*${filter}.*`, 'g') : undefined,
		});

		return await fastify.database.votes.get(conditions, {
			skip, limit,
		}) || [];
	});

	fastify.post('/add', {
		preHandler: requireAuth(fastify, 'Admin'),
		schema: {
			body: {
				type: 'object',
				required: [ 'title' ],
				properties: voteProperties,
			},
			response: {
				'2xx': {
					type: 'object',
					properties: voteProperties,
				},
				'4xx': 'genericError#'
			},
		},
	}, async (request, reply) => {
		try {
			const duplicates = await fastify.database.votes.get({
				title: request.body.title
			});

			if (duplicates.length > 0)
				throw new Error('Duplicate title');

			return await fastify.database.votes.add(request.body); 
		} catch (err) {
			reply.badRequest(err.message);
		}
	});

	fastify.delete('/delete/:id', {
		preHandler: requireAuth(fastify, 'Admin'),
		schema: {
			params: {
				type: 'object',
				properties: {
					par1: { type: 'string' },
				},
			},
			response: {
				'2xx': { type: 'object', properties: {} },
				'4xx': 'genericError#',
			},
		},
	}, async (request, reply) => {
		fastify.log.info('params: %o', request.params);

		try {
			return await fastify.database.votes.delete(request.params.id);
		} catch (err) {
			reply.badRequest(err.message);
		}
	});

	fastify.post('/vote/:id', {
		preHandler: requireAuth(fastify),
	}, async (request, reply) => {
		const func = fastify.database.votes[request.query.for ? 'for' : 'against' ]; 

		try {
			return await func(request.params.id, request.userId);
		} catch (err) {
			reply.badRequest(err.message);
		}
	});

	next();
};
