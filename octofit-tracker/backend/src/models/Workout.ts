import mongoose, { Document, Schema } from 'mongoose';

export interface IWorkout extends Document {
  title: string;
  difficulty: string;
  duration: number;
  focus: string;
  createdAt: Date;
}

const WorkoutSchema = new Schema<IWorkout>({
  title: { type: String, required: true, trim: true },
  difficulty: { type: String, default: 'beginner' },
  duration: { type: Number, required: true },
  focus: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
});

export const Workout = mongoose.model<IWorkout>('Workout', WorkoutSchema);
