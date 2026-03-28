// MongoDB initialization script
// Creates the ecohub database with initial indexes

db = db.getSiblingDB('ecohub');

// Create collections with validators
db.createCollection('users');
db.createCollection('transactions');
db.createCollection('budgets');

// Indexes for performance
db.users.createIndex({ email: 1 }, { unique: true });
db.transactions.createIndex({ date: -1 });
db.transactions.createIndex({ type: 1, category: 1 });
db.budgets.createIndex({ category: 1, month: 1, year: 1 }, { unique: true });

print('✅ EcoHub database initialized');
