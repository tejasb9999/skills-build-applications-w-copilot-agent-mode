"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = require("../models/User");
const Team_1 = require("../models/Team");
const Activity_1 = require("../models/Activity");
const LeaderboardEntry_1 = require("../models/LeaderboardEntry");
const Workout_1 = require("../models/Workout");
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        await User_1.User.deleteMany({});
        await Team_1.Team.deleteMany({});
        await Activity_1.Activity.deleteMany({});
        await LeaderboardEntry_1.LeaderboardEntry.deleteMany({});
        await Workout_1.Workout.deleteMany({});
        await User_1.User.create([
            { name: 'Ava', email: 'ava@example.com', role: 'admin' },
            { name: 'Leo', email: 'leo@example.com', role: 'member' },
        ]);
        await Team_1.Team.create([
            { name: 'Peak Performers', description: 'High-energy training group', members: ['Ava', 'Leo'] },
        ]);
        await Activity_1.Activity.create([
            { userId: 'ava', type: 'run', duration: 30, calories: 300, date: new Date() },
            { userId: 'leo', type: 'bike', duration: 45, calories: 400, date: new Date() },
        ]);
        await LeaderboardEntry_1.LeaderboardEntry.create([
            { userId: 'ava', score: 980, rank: 1 },
            { userId: 'leo', score: 910, rank: 2 },
        ]);
        await Workout_1.Workout.create([
            { title: 'HIIT Cardio', difficulty: 'intermediate', duration: 25, focus: 'endurance' },
            { title: 'Core Strength', difficulty: 'beginner', duration: 20, focus: 'core' },
        ]);
        console.log('Database seeding complete');
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
