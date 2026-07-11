const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const Scheme = require('./models/Scheme');

dotenv.config();

const seed = async () => {
  try {
    // 1. Mandatory Backup Check
    const backupPath = path.join(__dirname, 'backup_schemes_before_migration.json');
    if (!fs.existsSync(backupPath)) {
      throw new Error('Mandatory backup file backup_schemes_before_migration.json not found! Seeding aborted.');
    }
    const backupContent = fs.readFileSync(backupPath, 'utf-8');
    const parsedBackup = JSON.parse(backupContent);
    if (!Array.isArray(parsedBackup) || parsedBackup.length === 0) {
      throw new Error('Backup file is empty or invalid! Seeding aborted.');
    }
    console.log(`Backup file verified successfully. Found ${parsedBackup.length} records.`);

    // 2. Load and Combine New Schemes
    const file1 = path.join(__dirname, 'data/new_schemes.json');
    const file2 = path.join(__dirname, 'data/new_schemes_2.json');
    const file3 = path.join(__dirname, 'data/new_schemes_3.json');
    const file4 = path.join(__dirname, 'data/new_schemes_4.json');

    const schemesList = [
      ...JSON.parse(fs.readFileSync(file1, 'utf-8')),
      ...JSON.parse(fs.readFileSync(file2, 'utf-8')),
      ...JSON.parse(fs.readFileSync(file3, 'utf-8')),
      ...JSON.parse(fs.readFileSync(file4, 'utf-8'))
    ];

    console.log(`Loaded ${schemesList.length} new schemes from files.`);

    // 3. Connect to MongoDB
    console.log('Connecting to database...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected!');

    // 4. Clear Old Collection Records
    console.log('Clearing old schemes collection in MongoDB...');
    await Scheme.deleteMany({});
    console.log('Collection cleared!');

    // 5. Insert New Schemes
    console.log(`Inserting ${schemesList.length} new schemes into MongoDB...`);
    await Scheme.insertMany(schemesList);
    console.log('Seeding completed!');

    // 6. Validate Collection Count
    const finalCount = await Scheme.countDocuments();
    console.log(`Verification: Total documents in collection: ${finalCount}`);
    if (finalCount !== schemesList.length) {
      throw new Error(`Migration count mismatch! Expected ${schemesList.length}, but database has ${finalCount}`);
    }
    console.log('Count verification PASSED!');

    // 7. Write consolidated list to available_schemes.json for disk-based fallback
    const availableJsonPath = path.join(__dirname, 'data/available_schemes.json');
    fs.writeFileSync(availableJsonPath, JSON.stringify(schemesList, null, 2), 'utf-8');
    console.log(`Successfully updated local fallback file: ${availableJsonPath}`);

  } catch (error) {
    console.error('Seeding failed:', error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('Database disconnected.');
  }
};

seed();
