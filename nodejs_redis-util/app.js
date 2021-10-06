import { createClient } from 'redis';

const redisData = [];
const redisDataJSON = [];
const curTimestamp = Math.floor(new Date().getTime()/1000);


async function readRedisData() {
    const client = createClient({
        socket: {
            url: 'redis://:AUTHPWD@IP:PORT'
        }
    });

    client.on('error', (err) => console.log('Redis Client Error', err));

    await client.connect();

    const keys = await client.keys('*');
    
    for (let i = 0; i < keys.length; i++)     {
        if (keys[i].length == 12) {
            const sdata = await client.get(keys[i]);
            redisData.push(sdata);
        }
    }

    for (let i = 0; i < redisData.length; i++)     {
        redisDataJSON.push(JSON.parse(redisData[i]));
    }

    redisDataJSON.sort(tsSort);

  
    function tsSort(a, b) { if(a.ts == b.ts){ return 0} return a.ts < b.ts ? 1 : -1; }

    for (let i = 0; i < redisDataJSON.length; i++)     {
        printRedisData(redisDataJSON[i]);
    }

    process.exit(0);

};

function printRedisData(sdata) {
    console.log(`[${sdata.id.padEnd(12)}]`);
}

function printAllDevices() {
    for (let i = 0; i < redisDataJSON.length; i++)     {
        printRedisData(redisDataJSON[i]);
    }
}

readRedisData();
