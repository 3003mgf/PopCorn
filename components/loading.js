import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import * as Progress from "react-native-progress";


const Loading = () => {

  const { width, height } = Dimensions.get("window");

  return ( 
    <View style={{width, height}} className="absolute flex-row justify-center items-center">
      <Progress.CircleSnail thickness={12} size={160} color={"#AE79E6"}/>
    </View>
   );
}
 
export default Loading;