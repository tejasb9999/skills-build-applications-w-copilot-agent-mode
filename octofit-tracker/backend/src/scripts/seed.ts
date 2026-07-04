import mongoose from 'mongoose';
import { User } from '../models/User';
import { Team } from '../models/Team';
import { Activity } from '../models/Activity';
import { LeaderboardEntry } from '../models/LeaderboardEntry';
import { Workout } from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await LeaderboardEntry.deleteMany({});
    await Workout.deleteMany({});

    await User.create([
      { name: 'Ava', email: 'ava@example.com', role: 'admin' },
      { name: 'Leo', email: 'leo@example.com', role: 'member' },
    ]);

    await Team.create([
      { name: 'Peak Performers', description: 'High-energy training group', members: ['Ava', 'Leo'] },
    ]);

    await Activity.create([
      { userId: 'ava', type: 'run', duration: 30, calories: 300, date: new Date() },
      { userId: 'leo', type: 'bike', duration: 45, calories: 400, date: new Date() },
    ]);

    await LeaderboardEntry.create([
      { userId: 'ava', score: 980, rank: 1 },
      { userId: 'leo', score: 910, rank: 2 },
    ]);

    await Workout.create([
      { title: 'HIIT Cardio', difficulty: 'intermediate', duration: 25, focus: 'endurance' },
      { title: 'Core Strength', difficulty: 'beginner', duration: 20, focus: 'core' },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
