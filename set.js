const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'MAKAMESCO-MD<=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkhVODVXSEtKcUovZVUxSVRDZjNwR1FDQzU5Tnc5TmVxZnI4ZnhGd1UwND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNEtBT0VYN3NtbFZNa2lvRHo3RVpkb0w3dmlmalNTMnZ6T1F6QzVuYjUzbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0Q1NsRzhRVVZWaE1EMjF1bnZQUFQ3eWpxZml3WU9mVzU0QXJpSjFWM25nPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ4QVZtZGZEUCtNUXpuMEE1aUhpamVOTWpnY0lhM0lLS2I1Zm10RnVnTkNjPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik9HdDJOTlF3UElHYmNURm9vN3pMWC9UcnpmTWZaNFlGYk9aeWgxTDMzRnc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklBSDROTEtLY3JiZENDQVZtNGdVendSTXUyQTdIVlJrblJlN2VzLzNteU09In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0JCNHppeTFoWEZZSzdUSW9WaS9nZVpqVkYvVkl4L09ZT1RwYWhpeEQwUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib1g3ckUrQlFhemlrUEhUbzBPTWN5VGppTUZUa1gxK2JzMDVXVms1bm1YMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ijc2aWtBYi82VmVFOGhQQWEvRm9iVmlGbUI0VXcxblVaVFhMOGdob3FzeXJ6dHF3U2dWQzZWSG82ckk0L1hSLzVTWldrYkNLZnlxcTFvdm43eWU3NGdBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTQ0LCJhZHZTZWNyZXRLZXkiOiIrdmF6c2J5N0psQm4za2I0WXRLSmwzRlB2dnRoSFE4Sm0vc3pHcXdwdENVPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjUwOTQ4MzE2NDM5QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjEwRTQzMTk4Q0YyQ0U5QjhCMEJFOTEwRjA5MDFGMjE4In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTQzMTU4MTF9LHsia2V5Ijp7InJlbW90ZUppZCI6IjUwOTQ4MzE2NDM5QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjA5QUI5ODBBNEMzRDRFMTFGMUM0MDgzN0Q1NzRBN0Q5In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTQzMTU4MTF9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IkpLNzgyU01DIiwibWUiOnsiaWQiOiI1MDk0ODMxNjQzOTo3OEBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiLwnZGt8J2Sk/CdkobwnZKGIPCdkbvwnZKG8J2ShPCdkokg8J2RufCdkpDwnZKK4oiHzpQiLCJsaWQiOiIxMjE4MTg3NjE0MjA4NDQ6NzhAbGlkIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNQSDk0T1lGRUpQNHdzUUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJYRmtPRFJCdlNEQ2xNcnJ1NXo4RGlZdDRoeDAyZlp2T1ZFU1VzNVZ6ckVjPSIsImFjY291bnRTaWduYXR1cmUiOiJxQVVCcUNaSmNlRnRXZUhGUHlDMituQUlKYXV0MFFmVnl5Z25QRnJIa3ZxT1pla1ZmUDg1MDZDZEtuSkVDSmxaUGtIakJCWldXaktJMEkwMDFmSVVBdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiUVZUZGlqSm1CTWVUQmMzS0JoMzZsMVE4aGhRQ0xSWXVTSlBLbXZvakJaMnpkSWllWWxrQjZzYllhV1lRUHNmRmJsNmF5L1hNVXpkY3Q5akhwUEJTaGc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI1MDk0ODMxNjQzOTo3OEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJWeFpEZzBRYjBnd3BUSzY3dWMvQTRtTGVJY2RObjJiemxSRWxMT1ZjNnhIIn19XSwicGxhdGZvcm0iOiJzbWJhIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQTBJQlE9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NTQzMTU4MDcsImxhc3RQcm9wSGFzaCI6IjJQMVloZiIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBRk9BIn0=',
    PREFIXE: process.env.PREFIX || "+",
    GITHUB : process.env.GITHUB|| 'https://github.com/sesco001/Makamesco_md',
    OWNER_NAME : process.env.OWNER_NAME || "Makamesco",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254769995625",  
              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT: process.env.AUTO_REACTION || "non",  
     AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
    URL: process.env.URL || "https://files.catbox.moe/39n0nf.jpg",  
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || 'non',              
    CHAT_BOT: process.env.CHAT_BOT || "no",              
    AUTO_READ: process.env.AUTO_READ_MESSAGES || "no",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no', 
    GCF: process.env.GROUP_HANDLE || 'no', 
    AUTO_REPLY : process.env.AUTO_REPLY || "no", 
    AUTO_STATUS_TEXT: process.env.AUTO_STATUS_TEXT || 'your status have been viewed by Makamesco MD',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    AUTO_BIO: process.env.AUTO_BIO || 'yes',       
    ANTI_CALL_TEXT : process.env.ANTI_CALL_TEXT || '',             
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VbAEL9r5vKA7RCdnYG0S",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VbAEL9r5vKA7RCdnYG0S",
    CHANNEL :process.env.CHANNEL || "https://whatsapp.com/channel/0029VbAEL9r5vKA7RCdnYG0S",
    CAPTION : process.env.CAPTION || "✧MAKAMESCO MD✧",
    BOT : process.env.BOT_NAME || '✧MAKAMAKAMESCO MD✧⁠',
    MODE: process.env.PUBLIC_MODE || "yes",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Nairobi", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '1',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    LUCKY_ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTI_CALL: process.env.ANTI_CALL || 'no', 
    AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',             
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, 
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
