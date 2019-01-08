'use strict';

const Tags = require('../controllers/tagController');

module.exports = (app) =>{
    app.route('/api/tags')
        .get(Tags.getalltags)
        .post(Tags.sendtag);
    app.route('/api/tags/findEPC/:EPC')
        .get(Tags.getspecifictag);
    app.route('/api/tags/logs')
        .get(Tags.getlogs);
}