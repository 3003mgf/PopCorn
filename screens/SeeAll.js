import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView, ScrollView, StatusBar, Text, TouchableWithoutFeedback, View } from 'react-native';
import { fallbackMoviePoster, fetchMoviePage, image500 } from '../api/movieDb';
import { AntDesign } from '@expo/vector-icons';
import Loading from '../components/loading';


const SeeAll = () => {

  const { params } = useRoute();
  const { title, data } = params;
  const navigation = useNavigation();
  
  
  const [pages, setPages] = useState([]);

  let type = title === "Coming Soon" ? "upcoming" : "top_rated";

  const { width, height } = Dimensions.get("window");


  const handlePrev = () =>{
    fetchMoviePage(type, pages?.page - 1).then(data => {
      setPages(data);
    })
  };

  const handleNext = () =>{
    pages?.results?.length > 0 ? (
      fetchMoviePage(type, pages.page + 1).then(data => {
        setPages(data);
      })
    )
    :
      fetchMoviePage(type, data.page + 1).then(data => {
        setPages(data);
      })
  };

  useEffect(() => {
    console.log(pages);
  }, [pages]);



  return ( 
    <View className="pt-10 pb-20 bg-neutral-900 h-full">
      <SafeAreaView className="pb-14">
        <StatusBar backgroundColor="#171717" style="light"/>
        <Text className="mb-7 text-white mt-4 font-bold text-xl text-center">
          {title + " Movies"}
        </Text>
        <View className="mb-5 gap-7 flex-row items-center justify-center">
          <TouchableOpacity 
            disabled={pages.length === 0 || pages.page === 1 ? true : false }
            onPress={handlePrev}
          >
            <AntDesign name="caretleft" size={24} color={pages.length === 0 || pages.page === 1 ? "grey" : "#AE79E6"} />
          </TouchableOpacity>

          <TouchableOpacity 
            disabled={pages?.page === data.total_pages ? true : false}
            onPress={handleNext} 
          >
            <AntDesign name="caretright" size={24} color={pages?.page === data.total_pages ? "grey" : "#AE79E6"} />
          </TouchableOpacity>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 15}}
          className="space-y-3"
          >
            <Text className="mb-1 text-white font-semibold ml-1">
              Results ({data.total_results})
            </Text>
            
            <View className="flex-row justify-between flex-wrap">
              {
                pages?.results?.length > 0 ?
                  pages.results.map((el, index) => {
                    let movieName = el.title;
    
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
                  :
                  data.results && data.results.map((el, index) => {
                    let movieName = el.title;
    
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
      </SafeAreaView>
    </View>
   );
}
 
export default SeeAll;