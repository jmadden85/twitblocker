var Twit = require('twit');
var http = require('http');
var url = require('url');

var T = new Twit({
    consumer_key:         'xxx',
    consumer_secret:      'xxx',
    access_token:         'xxx',
    access_token_secret:  'xxx'
});

var server = http.createServer(function (req, res) {
    var newReq = url.parse(req.url, true);
    if (req.method === 'POST' && newReq.pathname === '/blockuser') {
        blockUser(newReq.query.screen_name, 'block');
    } else if (req.method === 'POST' && newReq.pathname === '/unblockuser') {
        blockUser(newReq.query.screen_name, 'unblock');
    }
    res.writeHead(200);
    res.end();
});

function blockUser (user, method) {
    var block = method === 'block' ? 'blocks/create' : 'blocks/destroy';
    T.post(block,  {
        screen_name: user
    },  function (err, data, response) {
        console.log(data);
    });
};

function friendUser (user) {
    T.post('friendships/create', {
        screen_name: user,
        follow: true
    });
};

server.listen(3000);