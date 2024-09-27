// components/EventCard.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const EventCard = ({ event, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={{ padding: 20, borderBottomWidth: 1 }}>
      <Text style={{ fontSize: 18 }}>{event.name}</Text>
      <Text>{event.date}</Text>
    </View>
  </TouchableOpacity>
);

export default EventCard;
