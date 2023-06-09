import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ContactMenu = ({ onClose, route }) => {
    return (
      <View style={styles.container}>
        <Text>Contact Information</Text>
        <Text>Email: example@example.com</Text>
        <Text>Phone: 123-456-7890</Text>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text>Close</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
const styles = StyleSheet.create({
container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
},
closeButton: {
    marginTop: 8,
},
});

export default ContactMenu;
