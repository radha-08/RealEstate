const fs = require('fs');
const path = require('path');

const loginRaw = fs.readFileSync(path.join(process.env.TEMP, 'login_raw.js'), 'utf8');
const buyerRaw = fs.readFileSync(path.join(process.env.TEMP, 'signup_buyer_raw.js'), 'utf8');
const builderRaw = fs.readFileSync(path.join(process.env.TEMP, 'signup_builder_raw.js'), 'utf8');

console.log('=== LOGIN SLICE 0 to 4500 ===');
console.log(loginRaw.slice(0, 4500));

fs.writeFileSync(path.join(process.env.TEMP, 'buyer_clean.txt'), buyerRaw);
fs.writeFileSync(path.join(process.env.TEMP, 'builder_clean.txt'), builderRaw);
console.log('Saved buyer_clean and builder_clean');
