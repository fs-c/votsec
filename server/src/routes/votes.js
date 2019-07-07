const { UserError } = require('../error');
const { requireAuth } = require('../auth');

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
	const { votes } = fastify.database;

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
				return await votes.get({ _id: id }, { limit: 1 });
			}

			return await votes.get(conditions, { skip, limit }) || [];
		} catch (err) {
			throw new UserError('Failed getting votes', 400, err.message);
		}
	});

	// TODO: PUT?
	fastify.post('/create', {
		preHandler: requireAuth(),
		schema: {
			body: {
				type: 'object',
				required: [ 'title' ],
				properties: { title: { type: 'string' } },
			},
		},
	}, async (req, res) => {
		const { title } = req.body;

		const duplicates = await votes.get({ title });

		if (duplicates.length > 0) {
			throw new UserError('Duplicate vote title', 400);
		}

		return await votes.create({ title });
	});

	// TODO: PATCH? Additionally, implement proper abstraction for vote editing 
	// like it's being done here.
	fastify.post('/vote', {
		preHandler: requireAuth(),
		schema: {
			query: {
				id: { type: 'string' },
				for: { type: 'boolean' },
			},
		},
	}, async (req, res) => {
		const vote = (await votes.get({ _id: req.query.id }))[0];

		// Legacy support for old votes
		if (!vote.votes)
			vote.voters = [];

		if (vote.voters.includes(req.user.id)) {
			throw new UserError('You already participated in this vote');
		}

		if (req.query.for) {
			vote.for++;
		} else {
			vote.against++;
		}

		vote.voters.push(req.user.id);

		await vote.save();
	});
};
