import { createContext, useState } from "react";

const WorkoutContext = createContext();

const demoData = [
    {
      id: 1,
      workout: "run",
      distance: "5.0",
      duration: "30",
      date: "2024-10-01",
    },
    {
      id: 2,
      workout: "walk",
      distance: "2.0",
      duration: "45",
      date: "2024-10-05",
    },
    {
      id: 3,
      workout: "drive",
      distance: "20.0",
      duration: "60",
      date: "2024-10-07",
    },
    {
      id: 4,
      workout: "drive",
      distance: "21.0",
      duration: "65",
      date: "2024-10-08",
    },
  ];


const WorkoutProvider = ({ children }) => {
    const [workout, setWorkout] = useState(demoData); // Manage the workout state
  
    // Function to add a workout
    const addWorkout = (newWorkout) => {
      setWorkout((prevWorkouts) => [...prevWorkouts, newWorkout]);
    };
  
    return (
      <WorkoutContext.Provider value={{ workout, addWorkout }}>
        {children}
      </WorkoutContext.Provider>
    );
  };

const SettingsContext = createContext();

export {WorkoutContext, WorkoutProvider, SettingsContext};