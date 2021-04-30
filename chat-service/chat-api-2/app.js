'use strict';
const mongoose = require('mongoose')
const url= 'mongodb://localhost/chatDB';
const config = require('./config.json');
const { StreamChat } = require('stream-chat');

const Chat = require('./models/chats');

//Authentication for Stream Chat
const serverSideClient = new StreamChat(
    config.STREAM_API_KEY,
    config.STREAM_APP_SECRET
);

mongoose.connect(url,{useNewUrlParser:true})
const con = mongoose.connection

// Connecting to MongoDB Client
con.on('open',() => {
    console.log('connected..')
})

async function main(){
    const filter = {};
    const sort = { last_message_at: -1 };
    var i = 0;
    var len = 1;
    while(len>0){
        const channels = await serverSideClient.queryChannels(filter,sort,{
            limit: 30,
            offset: i,
            message_limit: 1000000000,
        });
        len = channels.length;
        i += 30
        for (const c of channels) {
            // console.log(c.id);
            var channel_id = c.id;
            var messages = c.state.messages;

            for( const m of messages){
                const chat = new Chat({
                    channel_id: channel_id,
                    text: m.text,
                    user: m.user.name,
                    email:m.user.email,
                    status:m.status,
                    role:m.user.role,
                    time:String(m.created_at)

                })
                try{
                    const a1 = await chat.save()
                }
                catch(err){
                    console.log("Error:" + String(err))
                }
                
            }


        }
    }
    
    
}
main();