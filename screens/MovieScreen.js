import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, Platform, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";
import Cast from '../components/cast';
import MovieList from '../components/movieList';
import Loading from '../components/loading';
import { fallbackMoviePoster, fetchMovieCast, fetchMovieDetails, fetchSimilarMovies, image185, image342, image500 } from '../api/movieDb';

const MovieScreen = () => {
  const ios = Platform.OS == "ios";
  const topMargin = ios ? "" : "mt-3" 
  const { width, height } = Dimensions.get("window");

  const navigation = useNavigation();
  const { params: item } = useRoute();

  const [isFav, setIsFav] = useState(false);
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const [movieDetails, setMovieDetails] = useState([]);

  let movieName = item?.original_title;



  useEffect(() => {
    const getMovieDetails = async() =>{
      await fetchMovieDetails(item.id).then(data =>{
        setMovieDetails(data);
      });

      await fetchSimilarMovies(item.id).then(data =>{
        setSimilarMovies(data);
      });

      await fetchMovieCast(item.id).then(data =>{
        setCast(data.cast);
        console.log(data.cast[5]);
      });

      
      setLoading(false);
    }
    getMovieDetails()
  }, [item]);

  return ( 
    loading ?
    <SafeAreaView className="bg-neutral-800 flex-1 items-center">
      <Loading/>
    </SafeAreaView>
    :

    <ScrollView
      contentContainerStyle={{paddingBottom: 20}}
      className="flex-1 bg-neutral-900"
    >
  
    {/* GO BACK AND POSTER */}
      <View className="w-full mt-10">
        <SafeAreaView className={`absolute z-20 w-full flex-row justify-between items-center px-4 ${topMargin}`}>
            <StatusBar backgroundColor='transparent' style="light"/>
            <View className="flex items-center gap-2">
              <TouchableOpacity  className="rounded-3xl p-1 flex justify-center items-center" onPress={()=> navigation.goBack()}>
                <AntDesign name="leftcircle" size={25} color="white" />
              </TouchableOpacity>
              <TouchableOpacity  className="rounded-3xl p-1 flex justify-center items-center" onPress={()=> navigation.navigate("Home")}>
                <Entypo name="home" size={28} color="white" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity className="p-2 rounded-3xl flex justify-center items-center" onPress={()=> setIsFav(!isFav)} style={{backgroundColor: isFav ? "white" : "transparent"}}>
              <AntDesign name="heart" size={24} color={isFav ? "#AE79E6" : "white"} />
            </TouchableOpacity>
        </SafeAreaView>
      
        <View>
          <Image
            source={{uri: image500(item.poster_path) || fallbackMoviePoster}}
            style={{width, height: height * 0.55}}
          />
          <LinearGradient
            colors={["transparent", "rgba(23,23,23,0.8)", "rgba(23,23,23,1)"]}
            style={{width, height: height * 0.40}}
            start={{x: 0.5, y:0}}
            end={{x: 0.5, y:1}}
            className="absolute bottom-0"
          />
        </View>
      </View>

      {/* MOVIE DETAILS */}
      <View style={{marginTop: -(height*0.09)}} className="space-y-3">
        {/* Title */}
        <Text className="text-white text-center text-3xl font-bold tracking-wider"> 
          {movieName && movieName}
        </Text>

        {/* Status, Release, Runtime */}
        <Text className="text-center  text-neutral-400 font-semibold text-base">
          {movieDetails?.status} • {movieDetails?.release_date.split("-")[0]} • {movieDetails?.runtime} min
        </Text>

        {/* Genres */}
        <View className="flex-row justify-center mx-4 flex-wrap items-center space-x-2">
          {
            movieDetails?.genres.map((el, index) => {
              return (
                <Text key={index} className="text-neutral-400 font-semibold text-base text-center">
                  {movieDetails.genres.length === index + 1 ? el.name : el.name + "  •"}
                </Text>
              )
            })
          }
        </View>

        {/* Description */}
        <Text className="text-neutral-400 tracking-wide mx-4">
          {movieDetails?.overview}
        </Text>
      </View>

      {/* Cast */}
      {
        cast.length > 0 &&
        
        <Cast cast={cast} navigation={navigation}/>
      }

      {/* Similar Movies */}
      {
        similarMovies && 

        <MovieList title="You may like" data={similarMovies} hideSeeAll={true}/>
      }
    </ScrollView>
   );
}
 
export default MovieScreen;