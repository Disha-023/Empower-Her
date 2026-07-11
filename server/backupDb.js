const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();

const backup = async () => {
  try {
    console.log('Connecting to database for backup...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected!');

    const db = mongoose.connection.db;
    const collectionName = 'schemes';
    const count = await db.collection(collectionName).countDocuments();
    console.log(`Current documents count in ${collectionName}: ${count}`);

    const documents = await db.collection(collectionName).find({}).toArray();

    const backupPath = path.join(__dirname, 'backup_schemes_before_migration.json');
    fs.writeFileSync(backupPath, JSON.stringify(documents, null, 2), 'utf-8');
    console.log(`Backup created successfully at: ${backupPath}`);

    // Verify backup integrity
    const backupContent = fs.readFileSync(backupPath, 'utf-8');
    const parsedBackup = JSON.parse(backupContent);
    console.log(`Backup integrity verified. Total records in backup: ${parsedBackup.length}`);
    if (parsedBackup.length !== count) {
      throw new Error(`Backup count mismatch! Database has ${count}, but backup has ${parsedBackup.length}`);
    }
    console.log('Backup integrity CHECK PASSED!');
  } catch (error) {
    console.error('Backup failed:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('Database disconnected.');
  }
};

backup();
