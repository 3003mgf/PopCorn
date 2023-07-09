import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Dimensions, Platform, SafeAreaView, ScrollView, StatusBar, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import MovieList from '../components/movieList';
import Loading from '../components/loading';
import { fallbackPersonImage, fetchMoviesWithThisActor, fetchPersonDetails, image185, image342, image500 } from '../api/movieDb';

const PersonScreen = () => {

  const { width, height } = Dimensions.get("window");
  const ios = Platform.OS == "ios";
  const verticalMargin = ios ? "" : "my-3";

  const navigation = useNavigation();
  const [isFav, setIsFav] = useState(false);
  const [personMovies, setPersonMovies] = useState([1, 2, 3, 4, 5]);
  const [loading, setLoading] = useState(true);
  const [personDetails, setPersonDetails] = useState([]);

  const { params: person } = useRoute();

  useEffect(() => {
    const getPersonDetails = async() =>{
      await fetchPersonDetails(person.id).then(data => {
        setPersonDetails(data);
      });

      await fetchMoviesWithThisActor(person.id).then(data =>{
        setPersonMovies(data)
      });

      setLoading(false);
    };
    getPersonDetails();
  }, [person]);

  return ( 
    loading ? 
    <SafeAreaView className="bg-neutral-800 flex-1 items-center">
      <Loading/>
    </SafeAreaView>
    :
    <ScrollView
      className="flex-1 bg-neutral-900"
      contentContainerStyle={{paddingBottom: 20}}
    >

      {/* BACK BUTTON */}
      <SafeAreaView className={`z-20 w-full flex-row justify-between items-center px-4 ${verticalMargin} pt-9`}>
          <StatusBar backgroundColor='transparent' style="light"/>
          <View className="flex items-center gap-2">
            <TouchableOpacity  className="rounded-3xl p-1 flex justify-center items-center" onPress={()=> navigation.goBack()}>
              <AntDesign name="leftcircle" size={25} color="white" />
            </TouchableOpacity>
            <TouchableOpacity  className="rounded-3xl p-1 flex justify-center items-center" onPress={()=> navigation.navigate("Home")}>
              <Entypo name="home" size={28} color="white" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={()=> setIsFav(!isFav)}>
              <AntDesign name="heart" size={24} color={isFav ? "#AE79E6" : "white"} />
            </TouchableOpacity>
      </SafeAreaView>

      {/* PERSON DETAILS */}
      <View>
        <View className="flex-row justify-center">
          {/* Image */}
          <View className="rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-400 items-center">
            <Image
              source={{uri: image500(personDetails?.profile_path) || fallbackPersonImage}}
              style={{height: height*0.43, width: width*0.74}}
            />
          </View>
        </View>

        {/* Name, Birth Place */}
        <View className="mt-6">
          <Text className="text-white text-3xl text-center font-bold">
            {personDetails?.name}
          </Text>
          <Text className="text-neutral-400 text-base text-center">
            {personDetails?.place_of_birth ? personDetails?.place_of_birth : "Not Available"}
          </Text>
        </View>
        {/* Other */}
        <View className="flex-row mx-3 mt-6 p-4 justify-between items-center bg-neutral-700 rounded-full">
            <View className="items-center px-2 border-r-2 border-neutral-400">
              <Text className="text-white font-semibold">Gender</Text>
              <Text className="text-neutral-300 text-sm">{personDetails?.gender === 1 ? "Female" : personDetails?.gender === 2 ? "Male" : personDetails?.gender === 3 ? "Non-binary" : personDetails?.gender === 0 ? "Not set" : "N/A"}</Text>
            </View>
            <View className="items-center px-2 border-r-2 border-neutral-400">
              <Text className="text-white font-semibold">Birthday</Text>
              <Text className="text-neutral-300 text-sm">{personDetails?.birthday ? personDetails?.birthday : "N/A"}</Text>
            </View>
            <View className="items-center px-2 border-r-2 border-neutral-400">
              <Text className="text-white font-semibold">Known for</Text>
              <Text className="text-neutral-300 text-sm">{personDetails?.known_for_department ? personDetails?.known_for_department : "N/A"}</Text>
            </View>
            <View className="items-center px-2">
              <Text className="text-white font-semibold">Popularity</Text>
              <Text className="text-neutral-300 text-sm">{personDetails?.popularity ? Math.ceil(personDetails?.popularity) + "%" : "N/A"}</Text>
            </View>
        </View>

      {/* BIOGRAPHY */}
      <View className="my-6 mx-4 space-y-2">
        <Text className="text-white text-lg">Biography</Text>
        <Text className="text-neutral-400 tracking-wide">
          {personDetails?.biography ? personDetails.biography : "Not Available"}
        </Text>
      </View>

      {/* PERSON MOVIES */}
        <MovieList title={"Movies with this Actor"} data={personMovies} hideSeeAll={true}/>
      </View>
      
    </ScrollView>

   );
}
 
export default PersonScreen;