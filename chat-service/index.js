'use strict';
const config = require('./config.json');
const { StreamChat } = require('stream-chat');
const serverSideClient = new StreamChat(
    config.STREAM_API_KEY,
    config.STREAM_APP_SECRET
);

async function main() {
    const filter = { };
    const sort = { last_message_at: -1 };

    const channels = await serverSideClient.queryChannels(filter, sort, {});
    console.log(channels)

    for (const c of channels) {
        console.log(c.state.messages);
    }
}

main();
