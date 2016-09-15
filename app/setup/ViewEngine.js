var nunjucks = require('nunjucks');
//http://mozilla.github.io/nunjucks/templating.html
module.exports.init = function(app) {
    nunjucks.configure('views', {
        autoescape: true,
        noCache: false,
        express: app,
        watch: true,
        tags: {
            blockStart: '{%',
            blockEnd: '%}',
            variableStart: '{{',
            variableEnd: '}}',
            commentStart: '{!',
            commentEnd: '!}'
        }
    });
    // Set Nunjucks as rendering engine for pages with .html suffix

    app.engine('html', nunjucks.render);
    app.set('view engine', 'html');
    app.use(function(req, res, next) {
        var thePath = process.cwd() + '/views/';
        res.locals.viewLayout = thePath + 'layouts/main.html';
        res.locals.layoutsPath = thePath + 'layouts/';
        res.locals.partialsPath = thePath + 'partials/';
        res.locals.viewLayoutMember = thePath + 'layouts/member.html';
        next();
    });
};
