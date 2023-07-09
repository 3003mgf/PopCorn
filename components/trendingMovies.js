import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, Image, Text, TouchableWithoutFeedback, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { fallbackMoviePoster, image500 } from '../api/movieDb';

// Para hacer responsiva la image, es decir segun el dispositivo.
const { width, height } = Dimensions.get("window");
// It gets device dimensions, screen size.



const TrendingMovies = ({data}) => {

  const navigation = useNavigation();

  const handleClick = (movie) =>{
    navigation.navigate("Movie", movie);
  };

  return ( 
    <View className="mb-8 mt-5">
      <Text className="text-white font-bold text-xl mx-4 mb-5">Top Trending</Text>
      <Carousel
        data={data}
        renderItem={(item)=> <MovieCard item={item.item} handleClick={() => handleClick(item.item)}/>}
        firstItem={1}
        inactiveSlideOpacity={0.60}
        sliderWidth={width}
        itemWidth={width * 0.62}
        slideStyle={{display:"flex", alignItems:"center"}}
      />
    </View>
   );
}
 
export default TrendingMovies;


const MovieCard = ({item, handleClick}) =>{
  return(
    <TouchableWithoutFeedback onPress={handleClick}>
      <Image
        source={{uri: image500(item.poster_path) || fallbackMoviePoster}}
        style={{
          width: width  * 0.6,
          height: height * 0.4
        }}
        className="rounded-3xl"
      />
    </TouchableWithoutFeedback>
  )
};