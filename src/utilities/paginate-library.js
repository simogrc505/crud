const R = require('ramda');

module.exports = {
  create_filters: (params) => {
    return {
      ...params,
        offset: (parseInt(params.page)-1) * parseInt(params.limit),
        limit: parseInt(params.limit),
    };
  },
  knex_adapter: (list, count, params) => {
    return new Promise((resolve, reject) =>
      Promise.all([list, count]).then(result => {
        resolve(R.pick(['limit', 'offset', 'results', 'totalCount'],{
          ...params,
          results: result[0],
          totalCount: result[1].counts
        }))
      })
    )
  },
  append_headers: R.curry((res, params) => {
    let page = parseInt(params.offset)/parseInt(params.limit)+1;

     res
      .set('x-total', params.totalCount)
      .set('x-page', page)
      .set('x-count', params.results.length)
      .set('x-limit', params.limit)
      .set('x-from', (page-1)*parseInt(params.limit))
      .set('x-to', ((page-1)*parseInt(params.limit)) + params.results.length)

    return params;
  }),
};