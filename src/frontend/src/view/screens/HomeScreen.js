import React, { useEffect, useState } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';
import {get_categories, get_products} from "../../api/home_api";

const width = Dimensions.get('window').width / 2 - 30;

const HomeScreen = ({navigation}) => {
  const [catergoryIndex, setCategoryIndex] = React.useState(0);
  const [data, setData] = React.useState([{"category": {"name": ""}}]);
  const [categories, setCategories] = useState([]);

  const [accessToken, setAccessToken] = useState();

  useEffect(() => {
    // Retrieve the value of AccessToken from AsyncStorage
    const getAccessToken = async () => {
      try {
        const value = await AsyncStorage.getItem('AccessToken');
        if (value !== null) {
          // Set the accessToken state if it exists in the AsyncStorage
          setAccessToken(value);
          get_products({accessToken})
            .then(response => {
                setData(response.data);
                console.log(response.data[0]['image'])
            })
            .catch(error => {
              console.error(error);
            });
          get_categories({})
            .then(response => {
              const cat = response.data.map(p => p.name)
              setCategories(cat);
            })
            .catch(error => {
              console.error(error);
            });    
        } else {
          navigation.navigate("LogIn")
        }
      } catch (e) {
        console.log('Error retrieving access token from AsyncStorage:', e);
        
      }
    };

    getAccessToken();
  }, []);


  // Function to filter the list of products based on the selected category
  const filteredProducts = () => {
    if (categories[catergoryIndex]== "All"){
      return data
    }
    else { 
      return data.filter(p => p.category['name'] == categories[catergoryIndex])
    } 
  }

  const CategoryList = () => {
    return (
      <View style={style.categoryContainer}>
        <FlatList
          contentContainerStyle={{
            marginTop: 10,
            paddingBottom: 50,
          }}
          horizontal={true}
          data={categories}
          renderItem={({item, index}) => {
            return <TouchableOpacity
                      style={
                        {
                          paddingLeft: 10
                        }
                      }
                      key={index}
                      activeOpacity={0.8}
                      onPress={() => setCategoryIndex(index)}>
                      <Text
                        style={[
                          style.categoryText,
                          catergoryIndex === index && style.categoryTextSelected,
                        ]}>
                        {item}
                      </Text>
                    </TouchableOpacity>;
          }}
        />
      </View>
    );
  };

  const Card = ({plant}) => {
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

  


  return (
    <SafeAreaView
      style={{flex: 1, paddingHorizontal: 20, backgroundColor: COLORS.white}}>
      <View style={style.header}>
        <View>
          <Text style={{fontSize: 25, fontWeight: 'bold'}}>Welcome to</Text>
          <Text style={{fontSize: 38, color: COLORS.green, fontWeight: 'bold'}}>
            Shopping App
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('User', )}>
          <Icon name='account-circle' size={50} color={COLORS.dark}/>
        </TouchableOpacity>
      </View>
      <CategoryList />
      <FlatList
        columnWrapperStyle={{justifyContent: 'space-between'}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 10,
          paddingBottom: 50,
        }}
        numColumns={2}
        data={filteredProducts()}
        renderItem={({item}) => {
          return <Card plant={item} />;
        }}
      />
    </SafeAreaView>
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
export default HomeScreen;
