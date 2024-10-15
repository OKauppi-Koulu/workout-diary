import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { Calendar } from "react-native-calendars";
import { Button, SegmentedButtons, Text, TextInput } from "react-native-paper";
import { workoutList } from "../assets/workoutList";
import { WorkoutContext } from "../assets/myContext";
import { styles } from "../style/style";

export default function AddWorkout() {

    const { addWorkout } = useContext(WorkoutContext);
    const [workout, setWorkout] = useState('');
    const [distance, setDistance] = useState('');
    const [duration, setDuration] = useState('');
    const [selectedDate, setSelectedDate] = useState('');

    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [showInputError, setShowInputError] = useState(false);

    //Katsotaan onko tiedot valittu ja lisätty, jos ei niin lisäysnappi disabloituna
    useEffect(() => {
      if(workout === '' || distance === '' || duration === '' || selectedDate === '') {
        //Jos joku kenttä on tyhjä, kerrotaan se tallennusnapin yläpuolella ja tallennusnappi on disabloitu
        setButtonDisabled(true);
        setShowInputError(true);
      } else {      
        //Jos kentät on täytetty, tarkistetaan miten ne on täytetty
        if(!isNaN(distance) && distance >= 1) {
          //Jos distance on numero ja arvo 1 tai enemmän, napin disablointi puretaan ja virheilmoitus poistetaan
          setButtonDisabled(false);
          setShowInputError(false);
        } else {
          //Muuten nappi pysyy disabloituna ja ilmoitus näkyy
          setShowInputError(true);
          setButtonDisabled(true)
        }
      }
    }, [workout, distance, duration, selectedDate]);

    function saveWorkout() {
      const newWorkout = {
        id: Date.now(),
        workout,
        distance,
        duration,
        date: selectedDate
      };

      addWorkout(newWorkout);

      setWorkout('');
      setDistance('');
      setDuration('');
      setSelectedDate('');
    }

    return (
      <>
        <View style={styles.container}>
            <SegmentedButtons 
            value={workout}
            onValueChange={workout => setWorkout(workout)}
            buttons={workoutList}
            />
            <TextInput
                type="outlined"
                label="Distance (km)"
                keyboardType="numeric"
                value={distance}
                onChangeText={distance => setDistance(distance)}
            />
            
            <TextInput
                type="outlined"
                label="Duration (min)"
                keyboardType="numeric"
                value={duration}
                onChangeText={duration => setDuration(duration)}
            />
                       
            <Calendar 
              onDayPress={day => {
                setSelectedDate(day.dateString);
              }}
              markedDates={{
                [selectedDate]: {selected: true}
              }}
            />
            <Text style={[styles.alert, {display: showInputError ? 'flex' : 'none'}]}>Check inputs before saving</Text>
            <Button disabled={buttonDisabled} onPress={saveWorkout} mode="contained">Save workout</Button>
        </View>
      </>
    )
}