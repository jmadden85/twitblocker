var Twit = require('twit');
var http = require('http');
var url = require('url');
var config = require('./config');
var fs = require('fs');

var tTraderoom = new Twit(config.config.tTraderoom);
var tNS = new Twit(config.config.tNS);

var server = http.createServer(function (req, res) {
    var newReq = url.parse(req.url, true);
    if (req.method === 'POST') {
        res.writeHead(200);
        switch (newReq.pathname) {
            case '/blockuser':
                blockUser(newReq.query.screen_name, 'block', newReq.query.account);
                break;
            case '/unblockuser':
                blockUser(newReq.query.screen_name, 'unblock', newReq.query.account);
                break;
            case '/frienduser':
                friendUser(newReq.query.screen_name, newReq.query.account);
                break;
            default:
                break;
        }
        res.end();
    } else if (req.method === 'GET') {
      switch (newReq.pathname) {
        case '/logs':
            fs.readFile('/home/joe/twitblocker/logs/out.log', 'utf8', function (err, data) {
                if (err) {
                    console.log(err);
                } else {
                    data = data.replace(/\n+/g, '<br />');
                    res.writeHead(200, {"Content-Type": "text/html"});
                    res.end(data, "utf-8");
                }
            });
          break;
        default:
          break;
      }
    }
});

function blockUser (user, method, account) {
    var block = method === 'block' ? 'blocks/create' : 'blocks/destroy';
    var thisAccount = account === 'traderoom' ? tTraderoom : tNS;
    thisAccount.post(block,  {
        screen_name: user
    },  function (err, data, response) {
        console.log(block);
    });
};

function friendUser (user, account) {
    var thisAccount = account === 'traderoom' ? tTraderoom : tNS;
    thisAccount.post('friendships/create', {
        screen_name: user,
        follow: true
    }, function (err, data, response) {
        console.log('friended');
    });
};

server.listen(3000);
