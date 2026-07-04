"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = require("../models/User");
const Team_1 = require("../models/Team");
const Activity_1 = require("../models/Activity");
const LeaderboardEntry_1 = require("../models/LeaderboardEntry");
const Workout_1 = require("../models/Workout");
const router = (0, express_1.Router)();
router.get(['/users', '/users/'], async (_req, res) => {
    const users = await User_1.User.find().sort({ createdAt: -1 });
    res.json(users);
});
router.post(['/users', '/users/'], async (req, res) => {
    const user = await User_1.User.create(req.body);
    res.status(201).json(user);
});
router.get(['/teams', '/teams/'], async (_req, res) => {
    const teams = await Team_1.Team.find().sort({ createdAt: -1 });
    res.json(teams);
});
router.post(['/teams', '/teams/'], async (req, res) => {
    const team = await Team_1.Team.create(req.body);
    res.status(201).json(team);
});
router.get(['/activities', '/activities/'], async (_req, res) => {
    const activities = await Activity_1.Activity.find().sort({ date: -1 });
    res.json(activities);
});
router.post(['/activities', '/activities/'], async (req, res) => {
    const activity = await Activity_1.Activity.create(req.body);
    res.status(201).json(activity);
});
router.get(['/leaderboard', '/leaderboard/'], async (_req, res) => {
    const leaderboard = await LeaderboardEntry_1.LeaderboardEntry.find().sort({ score: -1 });
    res.json(leaderboard);
});
router.post(['/leaderboard', '/leaderboard/'], async (req, res) => {
    const entry = await LeaderboardEntry_1.LeaderboardEntry.create(req.body);
    res.status(201).json(entry);
});
router.get(['/workouts', '/workouts/'], async (_req, res) => {
    const workouts = await Workout_1.Workout.find().sort({ createdAt: -1 });
    res.json(workouts);
});
router.post(['/workouts', '/workouts/'], async (req, res) => {
    const workout = await Workout_1.Workout.create(req.body);
    res.status(201).json(workout);
});
exports.default = router;
