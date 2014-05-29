var Twit = require('twit');
var http = require('http');
var url = require('url');
var config = require('./config');

var tTraderoom = new Twit(config.config.tTraderoom);
var tNS = new Twit(config.config.tNS);

var server = http.createServer(function (req, res) {
    var newReq = url.parse(req.url, true);
    if (req.method === 'POST') {
        switch (newReq.pathname) {
            case '/blockuser':
                blockUser(newReq.query.screen_name, 'block');
                break;
            case '/unblockuser':
                blockUser(newReq.query.screen_name, 'unblock');
                break;
            case '/frienduser':
                friendUser(newReq.query.screen_name, 'account');
            default:
                break;
        }
    }
    res.writeHead(200);
    res.end();
});

function blockUser (user, method) {
    var block = method === 'block' ? 'blocks/create' : 'blocks/destroy';
    tTraderoom.post(block,  {
        screen_name: user
    },  function (err, data, response) {
        console.log(data);
    });
};

function friendUser (user, account) {
    var thisAccount = account === 'traderoom' ? tTraderoom : tNs;
    thisAccount.post('friendships/create', {
        screen_name: user,
        follow: true
    });
};

server.listen(3000);