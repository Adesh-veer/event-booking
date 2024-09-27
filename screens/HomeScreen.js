import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Image, StyleSheet, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvents = async () => {
    try {
      const response = await fetch('https://66f4641277b5e88970995e08.mockapi.io/api/evnts/events');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log("Fetched data:", data);
      setEvents(data);
    } catch (err) {
      setError('Failed to load events');
      console.error(err);
    } finally {
      setLoading(false); // Set loading to false once data is fetched
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const renderEventItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('EventDetails', { eventId: item.id })}>
      <View style={styles.eventContainer}>
        {item.image ? (
          <Image
            source={{ uri: item.image }}
            style={styles.eventImage}
            onError={(e) => console.log("Image failed to load:", e.nativeEvent.error)}
          />
        ) : (
          <Text style={styles.noImageText}>No Image Available</Text>
        )}
        <View style={styles.eventTextContainer}>
          <Text style={styles.eventDescription}>
            {item.Description ? item.Description.substring(0, 50) : 'No Description'}...
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading events...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>{error}</Text>
        <Button title="Retry" onPress={fetchEvents} />
      </View>
    );
  }

  if (events.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text>No events available at this moment.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Event List</Text>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderEventItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#48d1cc',
    paddingHorizontal: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  eventImage: {
    width: 100,
    height: 100,
    marginRight: 15,
    borderRadius: 10,
    borderColor: '#e0e0e0',
    borderWidth: 1,
  },
  eventTextContainer: {
    flex: 1,
  },
  eventDescription: {
    fontSize: 14,
    color: '#666',
  },
  noImageText: {
    fontSize: 14,
    color: '#888',
  },
  header: {
    fontSize: 26,
    textAlign: 'center',
    marginVertical: 20,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default HomeScreen;
