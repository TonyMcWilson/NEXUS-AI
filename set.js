




const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUE0a1FKUyt0ampSM3hWVUUzMmxteUF2Z0lZNythRWJhNCtDRmJBTEJGbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ2xvalp3UlNWWEVtbTRaa1htK0RJbkNQTnJKSE12bUd3ajM5Mzh1NTRRST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXSlA4dEcxS1BhcTVlcmVNMHZXVFV6UGpENnBXZ05KMUd2WGlCNVRCRUZrPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJTEdZV3lxUGJsS0tVSCs0Y0NCa2xTM0djUTNNSHN6S05oVTBtRUFPMDE0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVCQ0wxR0lmS2Y1cEh6dWNkVk5QOUdKK0cvQml4MHhCL1hMNm03OHdORU09In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjlodUZLR3B2WGNMRjJTWmFVYUtNdFBvb1c5ZGRsTXlublNHclZnNjkzUXM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMFBXQzJXcGdONnZmM1dwamR2a1EyWmQ2emMxd3VrNXY2bk5tUHAyTVRYVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVm1FOG9qK290c3lNL0M1VlVBMk9QbjBpbjJ2a1pDWXZyZmhGdlB0QVVBYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjRWT3I1dmp6N3ExWmFCdjM3NGorNHlaSUZ0ZWUxVENUTFRNb29OUEIrMXUvbnU2azhVNW1YNE4vUFBOcTlRRXpmVnhqMnBEeHA2ZzFYS3Y4bTBPSEF3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTU5LCJhZHZTZWNyZXRLZXkiOiJkbFI0MFVrSkRTYlZVemFsSTBpZ2JSYmFXY2FCQnhDM0tlVFk3V2Zha3RBPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiItU1UxTmpsRlNEaUhiQXBhc1NLSDZnIiwicGhvbmVJZCI6IjdiN2UyNGQzLTM0NmEtNDZiOS05ODQwLWNmODMzNDc3YzEyYyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPY0hBeDRRekc3S3NzT0RocUU2U09QU3kxNWc9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0dOdjVMZ0dneHpKMnZHUWxwS2kvc1ZOWTdJPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IllTREREQ1pRIiwibWUiOnsiaWQiOiIyNTY3MDgyNTI1ODI6NjlAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0pPRDRiUUhFTzdDazhFR0dBSWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlhYV2FnVWJzZHNLTGVUN2VVbGk1dlM0WHlpMzRHbmNNU0JkOStqdkVWRVk9IiwiYWNjb3VudFNpZ25hdHVyZSI6Im4zdlZxbnd3N00xVGx3QkhobFpSeUhxNlJzdGFPSVk1MjRxSm96aTRpU0p3L2JQb2V1K3dmYU1sM2lCZ1ppQmYyZ2VaRHJ6L3RWeFN1VStOKzZNN0F3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJ5VDBBL1RkRXgzS2lidFQ5TnlnRVNDTFNoMVhrNFRGZFBsMEpZZHJVelJ5elFRT0FBb2ppRCtldHpteHQvTW1OR1lUUnRaTXNmRnVPSWRCa0ZyOWxDQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NjcwODI1MjU4Mjo2OUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJWMTFtb0ZHN0hiQ2kzayszbEpZdWIwdUY4b3QrQnAzREVnWGZmbzd4RlJHIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ3MjQ3NDg0fQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "𝙈𝙍_𝙐𝙋𝘿𝘼𝙏𝙀_𝘿𝘼𝙏𝘼",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "256708252582",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || 'typing',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTICALL : process.env.ANTICALL || 'no',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'yes',
                  CHATBOT : process.env.CHATBOT || "yes",
                  AUTO_BIO : process.env.AUTO_BIO || "yes",
                  AUTO_REACT : process.env.AUTO_REACT || "yes",
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
