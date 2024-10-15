import { FlatList, View } from "react-native"
import { Surface, Card, Text } from "react-native-paper"
import { workoutList } from "../assets/workoutList";
import { useContext } from "react";
import { WorkoutContext } from "../assets/myContext";
import { format } from 'date-fns';
import { styles } from "../style/style";

export default function ViewWorkout() {
  const { workout } = useContext(WorkoutContext);

  if (!workout) {
    return <Text>Loading workouts...</Text>;
  }

  const sumDistance = (workoutType) => {
    const total = workout
      .filter(item => item.workout === workoutType) // Filter to include only 'run' workouts
      .reduce((acc, item) => acc + parseFloat(item.distance), 0); // Sum the distances
    return total;
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'dd-MM-yyyy');  // Change date format as needed
  };

  const sortedWorkouts = [...workout].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <>
      <View style={styles.container}>
        {workoutList.map((item, index) =>
          <Surface elevation ={5}>
            <Text key={index}>{item.label} - {sumDistance(item.value)}</Text>
          </Surface>
        )}
      </View>
      <FlatList 
          data={sortedWorkouts}  // Use the workout data from the context
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Card>
                <Text style={styles.container}>
                {item.workout} - {item.distance} km - {item.duration} min - {formatDate(item.date)}
              </Text>
            </Card>
          )}
        />
    </>
  )
}

