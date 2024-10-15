import { StyleSheet } from "react-native";
import { WorkoutContext } from "../Context/myContext";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1,
        justifyContent: 'flex-start',
        padding: 20,
        backgroundColor: "#b6bbca",
    },
    headTitle: {
        fontSize: 20,
        marginBottom: 5,
        textAlign:'center',
    },
    chooseWorkout: {
        marginBottom: 30,
    },
    textInput: {
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#2f468ae5",
    },
    button: {
        marginTop: 20,
        padding: 5,
    },
    workoutContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#93a1cf",
        marginBottom: 15,
    },
    workoutTotal: {
        textAlign: 'center',
        paddingHorizontal: 10,
    },
    workoutTotalHeader: {
        textAlign: 'center',
        fontWeight: 'bold',
        paddingHorizontal: 10,
    },
    workoutInfo: {
        borderColor: "#2f468ae5",
        borderWidth: 1,
        paddingVertical: 10,
        textAlign: 'center',
        marginHorizontal: 20,
        marginVertical: 5,
    },
    workoutIcon: {
        fontSize: 30,
        verticalAlign: 'middle',
        margin: 0,
        paddingRight: 20,
    },
    modal: {
        flex: 1,
        justifyContent: 'center', // Center the modal content
        alignItems: 'center',
        zIndex: 1000,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        justifyContent: 'center', // Center the content
        borderRadius: 10, // Optional: round the corners
    },
    alert: {
        fontSize: 16,
        fontWeight: "bold",
        margin: 20,
        textAlign:'center',
        color: 'red',
    }, 
    saveOk: {
        fontSize: 16,
        fontWeight: "bold",
        margin: 20,
        textAlign:'center',
        color: 'green',
    },
});

export {styles};