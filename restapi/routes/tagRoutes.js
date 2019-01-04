'use strict';

module.exports = function(app) {

    var tag = require('../controllers/tagController');

    app.route('/tag')

        .get(tag.tags)

        .post(tag.add);

    app.route('/tag/:tagId')

        .get(tag.gettag)

        .put(tag.update)
        
        .delete(tag.delete);
};