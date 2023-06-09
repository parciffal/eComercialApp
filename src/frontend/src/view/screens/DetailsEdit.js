import {React, useState, useEffect} from 'react';
import {View, 
        SafeAreaView, 
        Modal,
        Image, 
        Text, 
        TextInput,
        StyleSheet,
        TouchableOpacity,
        Dimensions,
        ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';

import {update_user_item} from '../../api/cart_items_api'

import AsyncStorage from '@react-native-async-storage/async-storage';

const width = Dimensions.get('window').width - 40;
const height = Dimensions.get('window').height / 2 - 30;

const DetailsScreen = ({navigation, route}) => {
  const [text, setText] = useState('');
  const [visible, setVisible] = useState(false);
  const [key, setKey] = useState('');
  const [accessToken, setAccessToken] = useState();

  const [editedPlant, setEditedPlant] = useState({
    "name": route.params.name,
    "price": route.params.price,
    "about": route.params.about
  })

  useEffect(() => {
    const a = getAccessToken()
  }, []);

  const getAccessToken = async () => {
    try {
      const value = await AsyncStorage.getItem('AccessToken');
      if (value !== null) {
        // Set the accessToken state if it exists in the AsyncStorage
        setAccessToken(value);
      } else {
        navigation.navigate("LogIn")
      }
    } catch (e) {
      console.log('Error retrieving access token from AsyncStorage:', e);
      
    }
  };

  
  const handleSave = () => {
    // Do something with the entered text, e.g. send it to a server
    console.log(`Entered text: ${text}`);
    const kes = editedPlant 
    kes[key]= text
    // Hide the modal and clear the text input
    setEditedPlant(kes)    
    setVisible(false);
    setText('');
    setKey('');
  };

  const editData = (key) => {
    setKey(key)
    setVisible(true)
  }

  const saveAndClose = () => {
    update_user_item(accessToken, route.params.id, editedPlant)
      .catch(error => {
        console.error(error)
      })
    
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      <ScrollView>
        <View style={style.header}>
          <Icon 
            name="arrow-back" 
            color={COLORS.dark} 
            size={28} 
            onPress={() => navigation.goBack()} />
        </View>
        <View style={style.imageContainer}>
          <Image 
            source={{uri: route.params.image}} 
            style={{resizeMode: 'contain', 
                    flex: 1, 
                    width, 
                    height}} />
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
            }}>
            <View
              style={{
                marginLeft: 10,
                flexDirection: 'row',
                alignItems: 'flex-end',
              }}>
                <Text 
                    style={{
                    paddingRight: 20,
                    fontSize: 22,
                    color: COLORS.dark, 
                    fontWeight: 'bold'}}>
                        {editedPlant.name}
                </Text>
                <TouchableOpacity>
                    <Icon 
                    name="edit" 
                    color={COLORS.dark} 
                    size={25} 
                    onPress={() => editData("name")} />
                </TouchableOpacity>
            </View>
            <View style={style.priceTag}>
                <TouchableOpacity>
                    <Icon 
                      name="edit" 
                      color={COLORS.white} 
                      size={25} 
                      onPress={() => editData("price")} />
                </TouchableOpacity>
                <Text
                style={{
                    marginLeft: 15,
                    color: COLORS.white,
                    fontWeight: 'bold',
                    fontSize: 20,
                }}>
                ${editedPlant.price}
                </Text>
            </View>
          </View>
          
          <ScrollView style={
            {paddingHorizontal: 20, 
             marginTop: 10}}>
            <View style={style.aboutTag}>
                <Text style={{
                    fontSize: 20,
                    marginRight: 40,
                    color: COLORS.dark, 
                    fontWeight: 'bold'}}>About</Text>
                <TouchableOpacity>
                    <Icon 
                      name="edit" 
                      color={COLORS.dark} 
                      size={25} 
                      onPress={() => editData("about")} />
                </TouchableOpacity>
            </View>
            
            <Text
              style={{
                color: '#2d2d2d',
                fontSize: 16,
                lineHeight: 22,
                marginTop: 10,
              }}>
              {editedPlant.about}
            </Text>
            <View
              style={{
                marginTop: 20,
                marginBottom: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity style={style.buyBtn} onPress={() => saveAndClose()}>
                <Text
                  style={{
                    color: COLORS.white, 
                    fontSize: 25, 
                    fontWeight: 'bold'}}>
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
      <Modal visible={visible} animationType='slide'>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TextInput
            style={style.input}
            placeholderTextColor={COLORS.dark}
            placeholder="Enter text here"
            value={text}
            onChangeText={setText}/>
          <View style={{
            flexDirection: 'row', 
          }}>
            <TouchableOpacity 
              style= {
                {
                  backgroundColor: COLORS.green,
                  padding: 15,
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }
              }
              onPress={handleSave}>
              <Text style={style.editIcon}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style= {
                {
                  backgroundColor: COLORS.red,
                  padding: 15,
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }
              }
              onPress={() => setVisible(false)}>
              <Text style={style.editIcon}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  editIcon: {
    color: COLORS.dark, 
    fontSize: 25, 
    fontWeight: 'bold'},
  header: {
    paddingHorizontal: 20,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    height: 50,
    borderColor: COLORS.dark,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: COLORS.dark,
    backgroundColor: COLORS.light
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
    flexDirection: 'row',
    padding:12,
    backgroundColor: COLORS.green,
    justifyContent: 'center',
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
  aboutTag: {
    flexDirection: 'row',
    padding: 12,
  }
});

export default DetailsScreen;
