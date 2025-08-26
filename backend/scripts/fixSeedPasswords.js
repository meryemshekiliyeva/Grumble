const fs = require('fs');
const path = require('path');

// Read the seed file
const seedFilePath = path.join(__dirname, 'seedData.js');
let content = fs.readFileSync(seedFilePath, 'utf8');

// Companies that need passwords added
const companies = [
  'Bolt Food',
  'BiP',
  'Azersu',
  'Bakcell',
  'Nar Mobile',
  'Pasha Bank',
  'Rabitabank',
  'Bravo Supermarket',
  'Azərişıq',
  'Azəriqaz',
  'Wolt',
  'Uber',
  'Trendyol'
];

// Add password to each company
companies.forEach(companyName => {
  const regex = new RegExp(`(companyName: '${companyName}',\\s*email: '[^']+',)`, 'g');
  content = content.replace(regex, `$1\n        password: 'Company123!',`);
});

// Write the updated content back
fs.writeFileSync(seedFilePath, content);
console.log('Added passwords to all companies in seed file');
