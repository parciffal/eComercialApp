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

