import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions
} from 'react-native';
import { TouchableOpacity} from 'react-native-gesture-handler';
import COLORS from '../../consts/colors';

const width = Dimensions.get('window').width / 2 - 30;


export const Card = (navigation, plant, accessToken ) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Details', {plant, accessToken})}>
        <View style={style.card}>
          <View
            style={{
              height: 100,
              alignItems: 'center',
              paddingBottom: 5
            }}>
            <Image
              source={{uri:plant['image']}}
              style={{flex: 1, resizeMode: 'contain', width: 200, height: 200,}}
            />
          </View>
          <View
              style={{
                paddingTop: 5,
                paddingBottom: 5,
                paddingLeft: 10,
                paddingRight: 10,
                backgroundColor: COLORS.green,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontWeight: 'bold', fontSize: 17}}>
                {plant.name}
              </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 5,
            }}>
            <View
              style={{
                paddingTop: 5,
                paddingBottom: 5,
                paddingLeft: 10,
                padding: 10,
                backgroundColor: COLORS.green,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 19, fontWeight: 'bold'}}>
                ${plant.price}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

const style = StyleSheet.create({
    logout: {
      padding: 20,
    },
    categoryContainer: {
      flexDirection: 'row',
      marginTop: 30,
      marginBottom: 20,
      justifyContent: 'space-between',
    },
    categoryText: {fontSize: 16, color: 'grey', fontWeight: 'bold'},
    categoryTextSelected: {
      color: COLORS.green,
      paddingBottom: 5,
      borderBottomWidth: 2,
      borderColor: COLORS.green,
    },
    card: {
      height: 225,
      backgroundColor: COLORS.light,
      width,
      marginHorizontal: 2,
      borderRadius: 10,
      marginBottom: 20,
      padding: 15,
    },
    header: {
      marginTop: 30,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    searchContainer: {
      padding: 5,
      backgroundColor: COLORS.light,
      borderRadius: 10,
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    input: {
      fontSize: 18,
      fontWeight: 'bold',
      flex: 1,
      color: COLORS.dark,
    },
    sortBtn: {
      marginLeft: 10,
      height: 50,
      width: 50,
      borderRadius: 10,
      backgroundColor: COLORS.green,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });