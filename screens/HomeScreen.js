import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Image, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TrendingMovies from '../components/trendingMovies';
import MovieList from '../components/movieList';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/loading';
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../api/movieDb';


const ios = Platform.OS == "ios";

const HomeScreen = () => {

  const [trending, setTrending] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();


  useEffect(() => {
    const getMovies = async() =>{
      await fetchTrendingMovies().then(data =>{
          setTrending(data.results);
      });

      await fetchUpcomingMovies().then(data => {
        setUpcomingMovies(data);
      });

      await fetchTopRatedMovies().then(data => {
        setTopRated(data);
      });

      setLoading(false)
    }

    getMovies();
  }, []);


  

  return ( 
    <View className="bg-neutral-800 flex-1">
      {/* SEARCH BAR & LOGO */}
      <SafeAreaView className={ios ? "-mb-2" : "mb-3"}>
        <StatusBar backgroundColor='#262626' style="light"/>
        <View className="flex-row justify-between items-center mx-4">
          <Ionicons name="md-menu-outline" size={30} color="white" />
          <Text className="text-white text-2xl font-bold">
            PopCorn
          </Text>
          <TouchableOpacity onPress={()=> navigation.navigate("Search")}>
           <Ionicons name="search-outline" size={25} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>


    {
      loading ?
        <Loading/>
      :
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 10}}
      >
        {/* TRENDING MOVIES */}
        {
          trending.length &&
          
          <TrendingMovies data={trending}/>
        }

        {/* UPCOMING MOVIES */}
        {
          upcomingMovies &&
          
          <MovieList title={"Coming Soon"} data={upcomingMovies}/>
        }

        {/* TOP RATED MOVIES */}
        {
          topRated &&

          <MovieList title={"Top Rated"} data={topRated}/>
        }
      
      </ScrollView>
    }
    
    </View>
   );
}
 
export default HomeScreen;