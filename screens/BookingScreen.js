import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BookingScreen = ({ route, navigation }) => {
  const { eventId } = route.params; // Get eventId from params
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [tickets, setTickets] = useState(''); // New state for number of tickets

  const handleBooking = async () => {
    if (!name || !email || !tickets) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const ticketQuantity = parseInt(tickets);
    if (isNaN(ticketQuantity) || ticketQuantity <= 0) {
      Alert.alert('Error', 'Please enter a valid number of tickets');
      return;
    }

    const bookingData = {
      eventId,
      name,
      email,
      ticketQuantity,
      bookingDate: new Date().toISOString(),
    };

    try {
      // Store booking data in AsyncStorage
      await AsyncStorage.setItem(`booking_${eventId}`, JSON.stringify(bookingData));
      Alert.alert(
        'Booking Confirmed',
        `Thank you ${name}, your booking for event ${eventId} with ${ticketQuantity} ticket(s) has been confirmed!`
      );

      // Clear input fields
      setName('');
      setEmail('');
      setTickets('');
      
      // Navigate back to previous screen
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to save booking information');
      console.error('Error saving booking:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Booking Form</Text>
      <TextInput
        style={styles.input}
        placeholder="Your Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Your Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Number of Tickets"
        value={tickets}
        onChangeText={setTickets}
        keyboardType="numeric" // Ensure only numbers are entered
      />
      <Button title="Submit Booking" onPress={handleBooking} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
});

export default BookingScreen;
