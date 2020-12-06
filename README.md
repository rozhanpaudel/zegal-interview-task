# zegal-interview-task
  This repo contains a node js Backend to simulate a high volume data input environment which makes use of node js mqtt library called RabbitMQ (open-source queue).

Performs following Operations:-
 * Publish 20 random Messages into the Queue
 * Subscribe Messages from Queue
 * Filters Messages with priority >= 7 and emit to frontend using socket.io 
 
 
 
 
 # Architecture and Pattern Used
 This simulator is made on Model-View-Template (MVC) pattern and REST artitecture .
 
 # Guide to Install 
 
 * Download and install Erlang as RabbitMQ is based in Erlang programming Language.
 * Download and install RabbitMQ from  [Go to the RabbitMQ Web Site](https://www.rabbitmq.com/install-windows.html#installer) 
 * then go to start menu and search for rabbitmq command prompt
type command "rabbitmq-plugins enable rabbitmq_management"
All set to go now go to http://localhost:15672 
Username: guest
Password: guest
* Now clone this repo to your local machine
* After clone open command prompt and type npm install to install all the dependencies
* To run the project type node app.js and hit enter
Now you have successfully installed the project .

# How to use it?

* After running your node js server, go to localhost:4000 to view subscribed messages.(initially webpage looks empty) Note: this is frontend
* hit the localhost:4000/api/publish to publish 20 random Messages to queue.
Message Format Looks like : 
{
 message: <random Message>,
 timestamp: <shows timestamp>,
 priority: <1-10>
}
* After publishing Messages to queue hit the localhost:4000/api/subscribe to subscribe your published Messages . (this will filter messages 
with priority >=7 and emits to frontend )
* Check the Frontend page now (this shows all those emitted messages with priority >=7)












 
