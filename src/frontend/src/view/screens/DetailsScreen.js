import React from 'react';
import {View, SafeAreaView, 
        Image, Text, StyleSheet,
        TouchableOpacity,
        ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';
import ContactMenu from '../components/ContactMenu';

const DetailsScreen = ({navigation, route}) => {
  const plant = route.params.plant;
  const [showContactMenu, setShowContactMenu] = React.useState(false);

  const handleContactPress = () => {
    setShowContactMenu(true);
  };

  const handleCloseContactMenu = () => {
    setShowContactMenu(false);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      <ScrollView>
        <View style={style.header}>
          <Icon name="arrow-back" color={COLORS.dark} size={28} onPress={() => navigation.goBack()} />
        </View>
        <View style={style.imageContainer}>
          <Image source={{uri: plant.image}} style={{resizeMode: 'contain', flex: 1, width: 200, height: 400,}} />
        </View>
        <View style={style.detailsContainer}>
          <View
            style={{
              marginLeft: 20,
              flexDirection: 'row',
              alignItems: 'flex-end',
            }}>
          </View>
          <View
            style={{
              marginLeft: 20,
              marginTop: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 22,color: COLORS.dark, fontWeight: 'bold'}}>{plant.name}</Text>
            <View style={style.priceTag}>
              <Text
                style={{
                  marginLeft: 15,
                  color: COLORS.white,
                  fontWeight: 'bold',
                  fontSize: 16,
                }}>
                ${plant.price}
              </Text>
            </View>
          </View>
          
          <ScrollView style={{paddingHorizontal: 20, marginTop: 10}}>
            <Text style={{
                fontSize: 20,
                color: COLORS.dark, 
                fontWeight: 'bold'}}>About</Text>
            <Text
              style={{
                color: '#2d2d2d',
                fontSize: 16,
                lineHeight: 22,
                marginTop: 10,
              }}>
              {plant.about}
            </Text>
            <View
              style={{
                marginTop: 20,
                marginBottom: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity style={style.buyBtn} onPress={handleContactPress}>
                <Text>Contact</Text>
              </TouchableOpacity>
              {showContactMenu && <ContactMenu onClose={handleCloseContactMenu} />}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageContainer: {
    flex: 0.45,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContainer: {
    flex: 0.55,
    backgroundColor: COLORS.light,
    marginHorizontal: 7,
    marginBottom: 7,
    borderRadius: 20,
    marginTop: 30,
    paddingTop: 30,
  },
  line: {
    width: 25,
    height: 2,
    backgroundColor: COLORS.dark,
    marginBottom: 5,
    marginRight: 3,
  },
  borderBtn: {
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15
  },
  borderBtnText: {fontWeight: 'bold', fontSize: 28},
  buyBtn: {
    padding: 15,
    backgroundColor: COLORS.green,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  priceTag: {
    backgroundColor: COLORS.green,
    padding:12,
    justifyContent: 'center',
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
});

export default DetailsScreen;
