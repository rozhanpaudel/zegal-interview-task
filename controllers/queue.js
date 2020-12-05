var express = require('express');
var router = express.Router();
const amqp = require('amqplib/callback_api');
var randomSentence = require('random-sentence');
const findRandom = require('../methods/randomDigitGenerator');

/* Publish message to queue */

router.get('/publish', function (req, res, next) {
  amqp.connect('amqp://localhost', function (error, connection) {
    if (error) {
      throw error;
    }
    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1;
      } else {
        var queue = 'zegaltask';

        //Message Format
        var arrayMsg = [];
        var i = 1;
        while (i <= 20) {
          arrayMsg.push({
            message: randomSentence({ min: 4, max: 9 }),
            timestamp: Date.now(),
            priority: findRandom(),
          });
          i = i + 1;
        }

        //assert the queue if queue doesnot exists create one

        channel.assertQueue(queue, {
          durable: true,
        });

        channel.sendToQueue(queue, Buffer.from(JSON.stringify(arrayMsg)), {
          persistent: true,
        });

        res.json({
          msg: 'You just published a message to a queue',
        });
      }
    });

    setTimeout(function () {
      connection.close();
    }, 500);
  });
});

// Subscribe message from Queue

router.get('/subscribe', function (req, res, next) {
  //  Create Connection

  amqp.connect('amqp://localhost', (connError, connection) => {
    if (connError) {
      return res.json({
        error: true,
        error: connError,
      });
    } else {
      //  Create Channel
      connection.createChannel((channelError, channel) => {
        if (channelError) {
          return res.json({ error: true, error: channelError });
        } else {
          //  Assert Queue
          const QUEUE = 'zegaltask';
          channel.assertQueue(QUEUE);

          // Receive Messages
          channel.consume(
            QUEUE,
            (msg) => {
              if (!msg) return res.send('No Messages in queue');
              else {
                var result = JSON.parse(msg.content.toString());

                //Filter Message with Priority >= 7
                var filteredMsg = result.filter((elem) => {
                  return elem.priority >= 7;
                });

                console.log('filtered msg is', filteredMsg);

                res.write('<p>Subscribed !</p>');

                // //emitting to frontend
                req.io.emit('msg', filteredMsg);

                setTimeout(function () {
                  connection.close();
                  res.end();
                }, 500);
              }
            },
            {
              noAck: true,
            }
          );
        }
      });
    }
  });
});

module.exports = router;
