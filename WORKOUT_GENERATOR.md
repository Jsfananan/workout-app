# Workout Generator Documentation

## Overview

The workout generator creates personalized workouts based on user preferences using a sophisticated algorithm that ensures variety, proper muscle group targeting, and appropriate difficulty levels.

## User Input Structure

```javascript
{
  duration: 10 | 20 | 30 | 45,  // minutes
  fitness_level: 'beginner' | 'intermediate' | 'advanced',
  target_area: 'total_body' | 'upper_body' | 'lower_body' | 'abs' | 'booty' | 'arms' | 'legs',
  workout_type: 'hiit' | 'strength' | 'kickboxing' | 'yoga' | 'low_impact' | 'mixed',
  equipment_available: ['dumbbells', 'bands', 'bench', 'ball', 'none'],
  banned_exercises: [exercise_ids]  // exercises user never wants
}
```

## Generated Workout Structure

```javascript
{
  workout_id: string,
  total_duration: integer (minutes),
  structure: '3-2-1',
  warmup: {
    duration: 120,  // seconds
    exercises: [{ exercise_id, duration }]
  },
  circuits: [
    {
      circuit_number: 1,
      rounds: 1,
      sections: [
        {
          type: 'strength',
          duration: 180,  // 3 minutes
          exercises: [{ exercise_id, duration }]
        },
        {
          type: 'cardio',
          duration: 120,  // 2 minutes
          exercises: [{ exercise_id, duration }]
        },
        {
          type: 'abs',
          duration: 60,  // 1 minute
          exercises: [{ exercise_id, duration }]
        }
      ]
    }
  ],
  cooldown: {
    duration: 120,
    exercises: [{ exercise_id, duration }]
  },
  estimated_calories: integer
}
```

## Algorithm Details

### Step 1: Circuit Count Determination

- **10 min workout** = 1 circuit (3-2-1 once) + warmup/cooldown
- **20 min workout** = 2 circuits + warmup/cooldown
- **30 min workout** = 3 circuits + warmup/cooldown
- **45 min workout** = 5 circuits + warmup/cooldown

### Step 2: Exercise Filtering

The generator filters exercises based on:
1. **Equipment availability** - Only includes exercises that use available equipment
2. **Fitness level** - Matches difficulty level (beginner/intermediate/advanced)
3. **Target area** - Filters by muscle groups for targeted workouts
4. **Workout type** - Filters by category (HIIT, strength, kickboxing, yoga, low-impact)
5. **Banned exercises** - Removes user-specified exercises

### Step 3: 3-2-1 Circuit System

Each circuit follows the 3-2-1 structure:
- **3 minutes STRENGTH** - 3 exercises at 60 seconds each
- **2 minutes CARDIO** - 2 exercises at 60 seconds OR 4 exercises at 30 seconds
- **1 minute ABS** - 1 exercise at 60 seconds OR 2 exercises at 30 seconds

### Step 4: Muscle Group Balancing

For `total_body` workouts, the generator rotates muscle groups across circuits:
- **Circuit 1**: Upper body strength focus
- **Circuit 2**: Lower body strength focus
- **Circuit 3**: Upper body strength focus (rotates)
- Continues rotation for additional circuits

### Step 5: Warmup & Cooldown

**Warmup (2 minutes):**
- Selects 4 low-impact cardio exercises
- 30 seconds each
- Examples: Butt Kicks, March in Place, Jumping Jacks, High Knees

**Cooldown (2 minutes):**
- Selects 4 stretching/yoga exercises
- 30 seconds each
- Examples: Cobra Pose, Downward Dog, Sun Salutations

### Step 6: Exercise Variety

The generator ensures variety through:
1. **No repeats within workout** - Each exercise appears only once per workout
2. **Recent workout tracking** - Avoids exercises from last 5 workouts
3. **Smart pool management** - Removes used exercises from available pool as workout builds

### Step 7: Calorie Calculation

Calculates estimated calories based on:
- Exercise calorie burn rate (calories_per_minute)
- Exercise duration
- User weight (defaults to 150 lbs)
- Formula: `calories = (calories_per_minute × duration_minutes) × (user_weight / 150)`

## Usage Example

```javascript
import { generateWorkout, getWorkoutSummary } from './utils/workoutGenerator.js'

const userInputs = {
  duration: 20,
  fitness_level: 'intermediate',
  target_area: 'total_body',
  workout_type: 'mixed',
  equipment_available: ['dumbbells', 'none'],
  banned_exercises: []
}

const workout = generateWorkout(userInputs, 150) // 150 = user weight in lbs
const summary = getWorkoutSummary(workout)

console.log(summary)
// {
//   workout_id: 'workout_...',
//   total_duration: 20,
//   total_circuits: 2,
//   total_exercises: 18,
//   estimated_calories: 245,
//   structure: '3-2-1'
// }
```

## API Reference

### `generateWorkout(userInputs, userWeight = 150)`

Generates a complete workout based on user inputs.

**Parameters:**
- `userInputs` (object): User preferences (see structure above)
- `userWeight` (number): User weight in pounds (default: 150)

**Returns:**
- Complete workout object with all exercises, durations, and metadata

**Throws:**
- Error if no exercises match the criteria

### `filterExercises(userInputs)`

Filters the exercise database based on user criteria.

**Parameters:**
- `userInputs` (object): User preferences

**Returns:**
- Array of filtered exercise objects

### `calculateCalories(workout, userWeight = 150)`

Calculates estimated calories burned for a workout.

**Parameters:**
- `workout` (object): Generated workout object
- `userWeight` (number): User weight in pounds

**Returns:**
- Estimated calories (integer)

### `getWorkoutSummary(workout)`

Returns a summary of the workout.

**Parameters:**
- `workout` (object): Generated workout object

**Returns:**
- Summary object with key statistics

### `clearRecentWorkouts()`

Clears the recent workout history (useful for testing).

## Features

✅ **Smart Filtering** - Multi-criteria exercise selection
✅ **3-2-1 System** - Structured circuit format
✅ **Muscle Group Rotation** - Balanced total body workouts
✅ **Exercise Variety** - No repeats within or across recent workouts
✅ **Calorie Tracking** - Personalized calorie estimates
✅ **Flexible Equipment** - Works with any equipment combination
✅ **Multiple Workout Types** - HIIT, strength, kickboxing, yoga, low-impact, mixed

## Integration

The workout generator is ready to integrate with:
- Workout display components
- Workout tracking system
- User preference storage
- Workout history
- Progress tracking

## Future Enhancements

Potential improvements:
- Custom exercise durations
- Rest periods between circuits
- Progressive overload tracking
- Workout templates
- Favorite exercise prioritization
- Injury-specific modifications
