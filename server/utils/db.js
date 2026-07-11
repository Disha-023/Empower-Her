const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../data');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Ensure specific file exists
const ensureFileExists = (filePath) => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
  }
};

const readDB = (filename) => {
  const filePath = path.join(dataDir, filename);
  ensureFileExists(filePath);
  const data = fs.readFileSync(filePath, 'utf-8');
  return data ? JSON.parse(data) : [];
};

const writeDB = (filename, data) => {
  const filePath = path.join(dataDir, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

module.exports = {
  readDB,
  writeDB
};
