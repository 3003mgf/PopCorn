import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { fallbackMoviePoster, image185 } from '../api/movieDb';


const MovieList = ({title, data, hideSeeAll}) => {
  

  const navigation = useNavigation();
  const { width, height } = Dimensions.get("window");


  return ( 
    <View className="mb-8 mt-5 space-y-4">
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-white font-bold text-xl">{title}</Text>
        {!hideSeeAll && 
        <TouchableOpacity onPress={()=> navigation.navigate("SeeAll", {data, title})}>
          <Text style={{color:"peachpuff"}}>See All</Text>
        </TouchableOpacity>}
      </View>

      {/* MOVIE ROW */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 15}}
      >
        {
          data.results ? 
          data.results.map((el, index) =>{
            let movieName = el.title;

            return (
              <TouchableWithoutFeedback 
                key={index}
                onPress={()=> navigation.push("Movie", el)}
                // Push nos sirve para que si estamos en el screen movie, y clickeamos un May Like, nos abra esa nueva movie. Si no no abre.
              >
                <View className="mr-4 space-y-4 items-center">
                  <Image
                    source={{uri: image185(el.poster_path) || fallbackMoviePoster}}
                    className="rounded-3xl"
                    style={{width: width * 0.33, height: height * 0.22}}
                  />
                  <Text className="text-neutral-300 ml-1">
                    {
                      movieName?.length > 14 ? movieName.slice(0, 14) + "..." : movieName
                    }
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            )
          })
          :
          data.cast.map((el, index) =>{
            let movieName = el.title;

            return (
              <TouchableWithoutFeedback 
                key={index}
                onPress={()=> navigation.push("Movie", el)}
                // Push nos sirve para que si estamos en el screen movie, y clickeamos un May Like, nos abra esa nueva movie. Si no no abre.
              >
                <View className="mr-4 space-y-4 items-center">
                  <Image
                    source={{uri: image185(el.poster_path) || fallbackMoviePoster}}
                    className="rounded-3xl"
                    style={{width: width * 0.33, height: height * 0.22}}
                  />
                  <Text className="text-neutral-300 ml-1">
                    {
                      movieName?.length > 14 ? movieName.slice(0, 14) + "..." : movieName
                    }
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            )
          })
        }
      </ScrollView>
    </View>
   );
}
 
export default MovieList;