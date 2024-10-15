import { FlatList, View } from "react-native"
import { Surface, Card, Text } from "react-native-paper"
import { workoutList } from "../assets/workoutList";
import { useContext } from "react";
import { WorkoutContext } from "../Context/myContext";
import { format } from 'date-fns';
import { styles } from "../style/style";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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

  const sumDuration = (workoutType) => {
    const total = workout
      .filter(item => item.workout === workoutType) // Filter to include only 'run' workouts
      .reduce((acc, item) => acc + parseFloat(item.duration), 0); // Sum the distances
    return total;
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'dd-MM-yyyy');  // Change date format as needed
  };

  const sortedWorkouts = [...workout].sort((a, b) => new Date(b.date) - new Date(a.date));
  const workoutMapping = Object.fromEntries(workoutList.map(workout => [workout.value, { label: workout.label, icon: workout.icon }]));

  return (
    <>
    <Surface style={{marginTop: 20}} elevation ={5}>
      <View style={styles.workoutContainer}>
        {workoutList.map((item, index) => 
          <View key={index}>
            <MaterialCommunityIcons style={[styles.workoutTotalHeader, {fontSize: 30}]} name={item.icon} />
            <Text style={styles.workoutTotalHeader}>{item.label}</Text>
            <Text style={styles.workoutTotal}>{sumDistance(item.value)} km</Text>
            <Text style={styles.workoutTotal}>{sumDuration(item.value)} min</Text>  
          </View>
        )}
      </View>
    </Surface>
      
      <FlatList 
          data={sortedWorkouts}  // Use the workout data from the context
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card style={[styles.workoutInfo, { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialCommunityIcons style={styles.workoutIcon} name={workoutMapping[item.workout]?.icon} />
                <Text style={{ textAlign: 'center' }}>
                {workoutMapping[item.workout]?.label} - {formatDate(item.date)} -- {item.distance} km - {item.duration} min
                </Text>
              </View>
            </Card>
          )}
        />
    </>
  )
}