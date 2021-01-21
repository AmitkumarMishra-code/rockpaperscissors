# Simple Console Chat
Your goal is to write code in `client.js` to implement a console-based chat feature using 
[socket.io](https://socket.io/)

The client should do the following:

1. Prompt for the user's name, then attempt to connect to the server 

2. When the client has connected to the server:
    - Print 'Successfully connected to server' and prompt the user for a message with a `>` character

3. When the user types a message:
    - Print 'Sending message: "\[message text\]"' then prompt the user for another message with a `>` character
    - Use the `emit` function to send a message to the server with event name of 'simple chat message' 
    and a string message argument of the form '\[user name\] says "\[message text\]"' 

4. When the client receives a message from the server:
    - Print the message to the console, then again prompt the user for a message with a `>` character
    
5. When the client loses the connection to the server (eg. if the server goes down):
    - Print 'Connection lost...' and prompt the user for a message with a `>` character
    - (Note that socket.io will automatically attempt to reconnect.  
    If reconnection is successful then the action in step 2 should be performed)     

### Example

**Note: A walkthough video for this example is [available on YouTube](https://youtu.be/62H16BgQSgg) or [our website](https://mclarencollege.com/player.html?videoUrl=https%3A%2F%2Fmclaren-college-lecture-recordings.s3.us-east-2.amazonaws.com%2Fin-class_videos%2FJavascript%2BPre-Course%2Fconsole-chat-example.mp4)**

Here is the console output and input for each of 3 clients showing 3 messages.

Time |Client 1 | Client 2 | Client 3
---|-------- | -------- | --------
1 |`What's your name ? Mark`|`What's your name ? Mohammad`|`What's your name ? Kimiko`
2 | `Successfully connected to server`| `Successfully connected to server`| `Successfully connected to server` 
3 | `>`| `>`| `>`
4 | *(User 1 types a message)*
5 | `> My favourite movie is Aliens` 
6 | *(Client 1 sends message to server)*
7 | `Sending message: "My favourite movie is Aliens"`
8 | | *(Client 2 receives message)* | *(Client 3 receives message)* 
9 | |`> Mark says "My favourite movie is Aliens"`|`> Mark says "My favourite movie is Aliens"`
10| | *(User 2 types a message)*
11| | `> I prefer Terminator 2`
12| | `Sending message: "I prefer Terminator 2"`
13| *(Client 1 receives message)* | | *(Client 3 receives message)* 
14|`> Mohammad says "I prefer Terminator 2"`| |`> Mohammad says "I prefer Terminator 2"`
15| *(Server goes down)* 
16|`> Connection lost...`| `> Connection lost...` |`> Connection lost...`
17| | | *(User 3 types a message)*
18| | | `> What about Back To The Future?`
19| | | `Sending message: "What about Back To The Future?"`
20| *(Server comes up)* 
21| `> Successfully connected to server`| `> Successfully connected to server`| `> Successfully connected to server` 
22| *(Client 1 receives message)* | *(Client 2 receives message)* 
23|`> Kimiko says "What about Back To The Future?"`| `> Kimiko says "What about Back To The Future?"`

### Tips
- You will need to use the [socket.io client API](https://socket.io/docs/v3/client-api/index.html).  You can get an idea of how to code the client with [this getting started page](https://socket.io/get-started/chat/) (although keep in mind it is designed for a browser interface, not a command line interface)
- Use the `rl.question` function to prompt the user and read in the user's response
- Note that after we print a message to the console we usually then prompt the user to enter a message - consider having one function for this behaviour

