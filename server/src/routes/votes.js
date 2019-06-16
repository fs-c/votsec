const { requireAuth } = require('../auth');

module.exports = (fastify, opts, next) => {
	const voteProperties = {
		_id: { type: 'string' },
		title: { type: 'string' },
		description: { type: 'string' },
		startDate: { type: 'number' },
		endDate: { type: 'number' },
		hidden: { type: 'boolean' },
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
			},
			response: {
				'2xx': {
					type: 'array',
					items: { type: 'object', properties: voteProperties },
				},
				'4xx': 'genericError#',
			}
		},
	}, async (request, reply) => {
		const { id, skip, limit } = request.query;

		if (id)
			return await fastify.database.votes.get({ _id: id }, { limit: 1 });

		return await fastify.database.votes.get({ hidden: false }, {
			skip, limit
		}) || [];
	});

	fastify.post('/add', {
		preHandler: requireAuth(fastify, 'Admin'),
		schema: {
			body: {
				type: 'object',
				required: [ 'title', 'description' ],
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
			}
		},
	}, async (request, reply) => {
		fastify.log.info('params: %o', request.params);

		try {
			return await fastify.database.votes.delete(request.params.id);
		} catch (err) {
			reply.badRequest(err.message);
		}
	});

	next();
};
