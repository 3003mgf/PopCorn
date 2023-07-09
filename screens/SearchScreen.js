import React, { useCallback, useState } from 'react';
import { Dimensions, Image, Platform, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/loading';
import { debounce } from "lodash";
import { fallbackMoviePoster, fetchSearchMovie, image342, image500 } from '../api/movieDb';

const SearchScreen = () => {
  const ios = Platform.OS == "ios";
  const topMargin = ios ? "" : "my-3";

  const navigation = useNavigation();

  const { width, height } = Dimensions.get("window");

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);



  const handleChangeText = (value) =>{
    if(value.length > 2){
      setLoading(true);
      fetchSearchMovie(value).then(data =>{
       if(data && data.results){
        setResults(data.results);
       }else{
        setResults([]);
       };
       setLoading(false);
      })
    }else{
      setLoading(false);
      setResults([]);
    }
  };

  const handleSearchDebounce = useCallback(debounce(handleChangeText, 400), []);

  return ( 
    <SafeAreaView 
      className="bg-neutral-800 flex-1 pt-10"
    >
      <View className={`mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full ${topMargin}`}>
        <TextInput
          onChangeText={handleSearchDebounce}
          placeholder='Search Movie'
          placeholderTextColor={"lightgray"}
          className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wide"
        />
        <TouchableOpacity
          onPress={()=> navigation.navigate("Home")}
          className="rounded-full p-3 m-1 bg-neutral-500 items-center"
        >
           <Ionicons name="md-close-sharp" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {
        loading ?
        <Loading/>
        :
        results.length > 0 ? 
          <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 15}}
          className="space-y-3"
          >
            <Text className="text-white font-semibold ml-1">
              Results ({results.length})
            </Text>
            <View className="flex-row justify-between flex-wrap">
              {
                results && results.map((el, index) => {
                  let movieName = el.original_title;

                  return(
                    <TouchableWithoutFeedback
                      key={index}
                      onPress={()=> navigation.navigate("Movie", el)}
                    >
                      <View className="space-y-2 mb-4 items-center">
                        <Image
                          className="rounded-3xl"
                          source={{uri: image500(el.poster_path) || fallbackMoviePoster}}
                          style={{
                            width: width * 0.44,
                            height: height * 0.3
                          }}
                        />
                        <Text className="text-neutral-300 ml-1">
                          {movieName.length > 18 ? movieName.slice(0, 18) + "…" : movieName}
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  )
                })
              }
            </View>
          </ScrollView>
        :
          <View className="flex-row justify-center">
            <Image
              className="h-96 w-96"
              source={require("../assets/images/movieTime.png")}
            />
          </View>
      }
      
    </SafeAreaView>
   );
}
 
export default SearchScreen;