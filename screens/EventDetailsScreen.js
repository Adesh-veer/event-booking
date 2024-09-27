import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EventDetailsScreen = ({ route, navigation }) => {
  const { eventId } = route.params; // Get event ID from route
  const [bookingInfo, setBookingInfo] = useState(null);

  const fetchBookingInfo = async () => {
    try {
      const savedBooking = await AsyncStorage.getItem(`booking_${eventId}`);
      if (savedBooking !== null) {
        setBookingInfo(JSON.parse(savedBooking));
      }
    } catch (error) {
      console.error('Error retrieving booking:', error);
      Alert.alert('Error', 'Failed to retrieve booking information');
    }
  };

  useEffect(() => {
    fetchBookingInfo(); // Fetch booking information when the component mounts
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Event Details for Event {eventId}</Text>
      
      {bookingInfo ? (
        <View>
          <Text style={styles.bookingText}>Booking Info:</Text>
          <Text>Name: {bookingInfo.name}</Text>
          <Text>Email: {bookingInfo.email}</Text>
          <Text>Date: {new Date(bookingInfo.bookingDate).toLocaleString()}</Text>
        </View>
      ) : (
        <Text>No booking information available</Text>
      )}
      
      <Button
        title="Book Now"
        onPress={() => navigation.navigate('Booking', { eventId })}
      />
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
  bookingText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default EventDetailsScreen;
