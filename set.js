const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU00xaWpoUzFDODVoZDhGckdNc2RhcUpDTEtIMHNyL1oyQzhJb215SzhuYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSHZrNHZhMkFmaVR4cUhIZ0liNFc4SmRIMkhmNkx6amgvUWN5Ni9GQmhSOD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNQ0ZkOFZxMFBmenV5RzFVRDlQVDVvQWU0S0wxUEFYZ211TDVqOXZhK1ZnPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPbTFYY3lnVFZNWU9pVVQrbnBldis0NHVyN1ZTb0ZUREh3RFkrK0hRRmtBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZKTWtGenRYamFvWXRQMDBub3JabFRGTXQ1ZjFzelBZWHJFb0ZseDFqRlE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjQxRDU2T21TVEVHUE9KekxTaHk1aTc5SVg4cFcwY29HcXpsWktJM2Y5R1E9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY012T2Zib0VBTnhUYUxGMms5SzJ1TDl0VkVNN3dja0lhZlBVV1k1czFIND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicE84Z2NHZCt2Q3Q0VkswNTNGeTNNaDFObEhqU3cvaW0waE9SVmhhZ1BnQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlqTXU1alIwQnJ5MzJIYjVINFZoVVQyMllmU29NRHpiQng4OFNrRmRUc2JuZmlkVW9kME1LMEpFNUx4Y3I5Wi9xdW1MMjAyRUduVFJRdUh3eXNlQkJnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6ODUsImFkdlNlY3JldEtleSI6Im1qZzRUL2ZPbzBjb21LZUFQSkliSEc0TWZhM2UrUXdiK2hDWmlmZWQ1MUE9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IkZfOE8xa1g3VF91WkRNNjdYb2t5UGciLCJwaG9uZUlkIjoiOGIwNzAyNDktZTZkMi00ZWM4LWIxZGQtYjI3NDAzMzAxMTMzIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlYxb0ltZ3FWdWhYWlc1b1FUNTNBVG9yMnoyUT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI3dENtRDBld0Y4bkVaZHVrYWVjMThpdk5pakU9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiRFM0RUhEQU0iLCJtZSI6eyJpZCI6IjI1NjcwMzAyNTU3MTo1NUBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSXlob1VrUTg0YkZ0UVlZQVNBQUtBQT0iLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiWnhTaW1jR0lDY2VuOWtiQ2VzYlFpTzhKRVJRdCsrQVhQQXRyUnY3ODRTOD0iLCJhY2NvdW50U2lnbmF0dXJlIjoiQmwxUG95c1RpU1g1T0lVSk93c1AvOXBQQUVDdFc2SE1wcjhGQTNNelp2aXdNZVRoeG9Sbm5zSDNmdWJEOWN6S3lqWUU5eFFNTlk1L1g2alpRYWQrQkE9PSIsImRldmljZVNpZ25hdHVyZSI6IlZCelBnUnk5aWRkWHZjVkpUc3JTdEtSZ1Z0K0Y5c2lyczl0aDNrMGxVU0V2Q05ROHFFdGtaNjAvLzVMeFczS1VncFFyUDBNdVp4NjYzR0E3eHZnVEJBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU2NzAzMDI1NTcxOjU1QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQldjVW9wbkJpQW5IcC9aR3duckcwSWp2Q1JFVUxmdmdGendMYTBiKy9PRXYifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjI4OTMxODUsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBSEY0In0=',
    PREFIXE: process.env.PREFIX || "/",
    OWNER_NAME: process.env.OWNER_NAME || "Ramadhanyusuf",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Ramadhanyusuf",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || '𝐑𝐀𝐌𝐀𝐃𝐇𝐀𝐍-𝐌𝐃',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/fd325a5fa01cb57c9e58f.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
