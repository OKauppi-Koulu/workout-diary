import React, { useContext, useEffect, useState } from "react";
import { View, TouchableWithoutFeedback, Modal } from "react-native";
import { Calendar } from "react-native-calendars";
import { Button, SegmentedButtons, Text, TextInput } from "react-native-paper";
import { workoutList } from "../assets/workoutList";
import { WorkoutContext } from "../Context/myContext";
import { styles } from "../style/style";

export default function AddWorkout() {

    const { addWorkout } = useContext(WorkoutContext);
    const [workout, setWorkout] = useState('');
    const [distance, setDistance] = useState('');
    const [duration, setDuration] = useState('');
    const [selectedDate, setSelectedDate] = useState('');

    const [calendarVisible, setCalendarVisible] = useState(false);

    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [showInputError, setShowInputError] = useState(false);
    const [showSaveOk, setShowSaveOk] = useState(false);

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
          setButtonDisabled(true)
          setShowInputError(true);
        }
      }
    }, [workout, distance, duration, selectedDate]);

    function toggleCalendar() {
      setCalendarVisible(!calendarVisible);
    }

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
      handleSave();
    }

    const handleSave = () => {
      // Set showSaveOk to true
      setShowSaveOk(true);
      
      // Set it back to false after 10 seconds
      setTimeout(() => {
        setShowSaveOk(false);
        setShowInputError(true);
      }, 5000); // 10 seconds in milliseconds
    };

    const today = new Date();
    const formattedToday = today.toISOString().split("T")[0]; // Format as 'YYYY-MM-DD'

    return (
      <>
        <View style={styles.container}>
            <Text style={styles.headTitle}>Choose workout:</Text>
            <SegmentedButtons style={styles.chooseWorkout}
              value={workout}
              onValueChange={workout => setWorkout(workout)}
              buttons={workoutList}
            />
            <Text style={styles.headTitle}>Set Distance:</Text>
            <TextInput
              style={styles.textInput}
              type="outlined"
              label="Distance (km)"
              keyboardType="numeric"
              value={distance}
              onChangeText={distance => setDistance(distance)}
            />    

            <Text style={styles.headTitle}>Set Duration:</Text>
            <TextInput
              style={styles.textInput}
              type="outlined"
              label="Duration (min)"
              keyboardType="numeric"
              value={duration}
              onChangeText={duration => setDuration(duration)}
            />
                       
            <Button style={styles.button} mode="contained" onPress={toggleCalendar}>
            {selectedDate ? `Selected Date: ${selectedDate}` : 'Select Date'}
            </Button>

            <Modal
              visible={calendarVisible}
              onRequestClose={toggleCalendar}
              animationType="slide"
              transparent={true}
            >
              <TouchableWithoutFeedback onPress={toggleCalendar}>
                  <View style={styles.overlay} />
              </TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                  <Calendar
                      onDayPress={day => {
                          setSelectedDate(day.dateString);
                          setCalendarVisible(false);
                      }}
                      markedDates={{
                          [selectedDate]: { selected: true },
                      }}
                      maxDate={formattedToday}
                  />
                  <Button mode="contained" onPress={toggleCalendar}>
                      Close
                  </Button>
              </View>
            </Modal>
                        
            <Button style={styles.button} disabled={buttonDisabled} onPress={saveWorkout} mode="contained">Save workout</Button>
            
            {showSaveOk && <Text style={styles.saveOk}>Workout saved!</Text>}
            {showInputError && !showSaveOk && (
              <Text style={styles.alert}>Save button is disable due to missing information.</Text>
            )}    
        </View>
      </>
    )
}