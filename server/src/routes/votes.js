const { UserError } = require('../error');

const filterUndefined = (object) => {
	return Object.keys(object).reduce((acc, cur) => {
		if (object[cur])
			acc[cur] = object[cur];
		
		return acc;
	}, {});
};

const voteProperties = {
	_id: { type: 'string' },
	title: { type: 'string' },
	endDate: { type: 'number' },
	startDate: { type: 'number' },
};

module.exports = async (fastify, opts) => {
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
			},
		},
	}, async (req, res) => {
		const { id, skip, limit, filter, popular } = req.query;

		const conditions = filterUndefined({
			title: filter ? new RegExp(`.*${filter}.*`, 'g') : undefined,
		});

		try {
			if (id) {
				return await fastify.database.votes.get(
					{ _id: id }, { limit: 1 },
				);
			}

			return await fastify.database.votes.get(
				conditions, { skip, limit },
			) || [];
		} catch (err) {
			throw new UserError('Failed getting votes', 400, err.message);
		}
	});
};
