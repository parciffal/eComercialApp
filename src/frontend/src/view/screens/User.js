import {React, useEffect, useState} from 'react'
import { View, Text, StyleSheet,
         TouchableOpacity, Image, 
         FlatList, SafeAreaView,
         Dimensions } from 'react-native'
import { myColors } from '../../../utils/Colors';
import COLORS from '../../consts/colors';
import  Icon  from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {get_user_items} from '../../api/cart_items_api';
import {user_logout, 
        get_user_info } from '../../api/user_api';

const width = Dimensions.get('window').width / 2 - 30;

export default function User({ navigation }) {
  const [products, setProducts] = useState([]);
  const [accessToken, setAccessToken] = useState();
  const [userInfo, setUserInfo] = useState({"username": ""});
  const [refreshToken, setRefreshToken] = useState();

  useEffect(() => {
    getAccessToken();
    getRefreshToken();
    getDataFromDB();
  }, []);

  const getAccessToken = async () => {
    const value = await AsyncStorage.getItem('AccessToken').then(
      setAccessToken(value)
    ).then(get_user_info(value)
    .then((response) => {
      setUserInfo(response.data);
    })
    .catch((error) => {
      console.error(error);
    })).then(
      get_user_items( value)
        .then((response) => {
          setProducts(response.data);
          console.log(products);
        })
        .catch((error) => {
          console.error(error);
        })
    );
    
  };

  const getRefreshToken = async () => {
    const value = await AsyncStorage.getItem('RefreshToken');
    setRefreshToken(value);
  };

  const getDataFromDB = () => {
    get_user_items({accessToken: accessToken})
      .then((response) => {
        setProducts(response.data);
        console.log(products);
      })
      .catch((error) => {
        console.error(error);
      });
  };


  const deleteItem = (e) => {
    const newList = products.filter(
      (item, index) => item.id !== e.id);
    setProducts(newList)
  }

  const Card = ({plant}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('DetailsEdit', plant)}>
        <View style={styles.card}>
          <View
            style={{
              height: 100,
              alignItems: 'center',
              paddingBottom: 5
            }}>
            <Image
              source={{uri: plant.image}}
              style={{flex: 1, 
                      resizeMode: 'contain', 
                      width: 200, 
                      height: 200, }}
            />
          </View>
          <View
              style={{
                backgroundColor: COLORS.green,
                padding:5,
                marginRight: 50,
                justifyContent: 'center',
                alignContent: 'center',
                borderTopRightRadius: 25,
                borderBottomRightRadius: 25,
              }}>
              <Text style={{fontWeight: 'bold', 
                            fontSize: 15, 
                            color: 'white'}}>
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
                backgroundColor: COLORS.green,
                padding:10,
                paddingRight: 20,
                marginRight: 50,
                justifyContent: 'center',
                alignContent: 'center',
                borderTopRightRadius: 25,
                borderBottomRightRadius: 25,
              }}>
              <Text style={{fontSize: 19, 
                            fontWeight: 'bold', 
                            color: 'white'}}>
                ${plant.price}
              </Text>
            </View>
            <TouchableOpacity onPress={() => deleteItem(plant)}>
              <Icon name='delete' size={40} color={myColors.red}/>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const handleLogout = () => {
    const data = {'refresh_token': refreshToken}
    user_logout(accessToken, data)
    .catch(error => {
      console.error(error);
    })
  }

  return (
      <SafeAreaView style={styles.container}>
        <Image 
          source={{ uri: "https://img.freepik.com/free-icon/user_318-804790.jpg"}}
          style={{ width: 100, height: 100 }}
        />
        <Text style={styles.username}></Text>
        
        <FlatList
          columnWrapperStyle={{justifyContent: 'space-between'}}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: 10,
            paddingBottom: 50,
          }}
          numColumns={2}
          data={products}
          renderItem={({item}) => {
            return <Card plant={item} />;
          }}
        />
        <View style={{
          flexDirection: 'row',
          alignContent: 'space-between',
          justifyContent: 'space-between',
          padding: 20,
          borderRadius: 10,
          width: '100%',
          backgroundColor: COLORS.light

        }}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.navigate('Home')}>
            <Icon name='chevron-left' size={50} color={COLORS.dark}/>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.addButton} 
            onPress={() => navigation.navigate('AddProduct')}>
            <Icon name='add' 
                  size={50} 
                  color={COLORS.green} 
                  backgroundColor={COLORS.light} 
                  borderRadius={20}/>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.registerButton} 
            onPress={() => handleLogout()}>
            <Icon name='logout' size={50} color={myColors.red}/>
          </TouchableOpacity>
        </View>
        
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    itemContainer: {
      flexDirection: 'row',
      backgroundColor: '#eee',
      padding: 20,
      marginVertical: 8,
      borderRadius: 10,
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
    list: {
      padding: 20
    },
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    itemText:{
        width: '100%',
        height: 50,
        backgroundColor: myColors.green,
        borderRadius: 5,
        margin: 10
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
      },
    username: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: myColors.bg0
    },
    button: {
      width: '80%',
      height: 50,
      backgroundColor: myColors.green,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    listButton: {
        width: '80%',
        height: 50,
        backgroundColor: myColors.green,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
      },
    registerButton: {
      backgroundColor: myColors.light,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    backButton: {
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    addButton: {
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
    }
  });
