# Workout App

A modern, user-friendly workout application inspired by Jillian Michaels' workout app. This app helps users track their fitness journey with guided workouts, timers, and progress tracking.

## Features

- 🏋️ **Workout Library**: Browse through a collection of curated workouts
- ⏱️ **Exercise Timer**: Built-in timer for each exercise with visual progress
- 📊 **Progress Tracking**: Visual progress indicators during workouts
- 🎯 **Difficulty Levels**: Workouts categorized by difficulty (Beginner, Intermediate, Advanced)
- 📱 **Responsive Design**: Works beautifully on desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory. You can preview the production build with:

```bash
npm run preview
```

## Project Structure

```
workout-app/
├── src/
│   ├── components/      # Reusable components (Timer, etc.)
│   ├── pages/          # Page components (Home, WorkoutList, WorkoutDetail)
│   ├── data/           # Workout data and configuration
│   ├── App.jsx         # Main app component with routing
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── index.html          # HTML template
├── package.json        # Dependencies and scripts
└── vite.config.js      # Vite configuration
```

## Customization

### Adding New Workouts

Edit `src/data/workouts.js` to add new workouts. Each workout should have:
- `id`: Unique identifier
- `name`: Workout name
- `duration`: Total duration in minutes
- `difficulty`: "Beginner", "Intermediate", or "Advanced"
- `description`: Brief description
- `emoji`: Emoji icon
- `exercises`: Array of exercise objects with name, duration, emoji, and instructions

### Styling

The app uses CSS modules and global styles. You can customize:
- Colors: Update the gradient colors in `index.css` and component CSS files
- Layout: Modify the grid and flexbox layouts in component CSS files
- Typography: Adjust font sizes and weights in the CSS files

## Technologies Used

- **React**: UI library
- **React Router**: Client-side routing
- **Vite**: Build tool and dev server
- **CSS3**: Styling with modern features (gradients, flexbox, grid)

## Future Enhancements

- User authentication and profiles
- Workout history and statistics
- Custom workout creation
- Exercise video demonstrations
- Sound cues and voice guidance
- Workout calendar and scheduling
- Social features and sharing

## License

This project is for personal use.
