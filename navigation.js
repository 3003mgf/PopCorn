import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import MovieScreen from './screens/MovieScreen';
import PersonScreen from './screens/Person';
import SearchScreen from './screens/SearchScreen';
import SeeAll from './screens/SeeAll';

const Stack = createNativeStackNavigator();


const Navigation = () => {
  return ( 
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" options={{headerShown: false}} component={HomeScreen} />
        <Stack.Screen name="Movie" options={{headerShown: false}} component={MovieScreen} />
        <Stack.Screen name="Person" options={{headerShown: false}} component={PersonScreen} />
        <Stack.Screen name="Search" options={{headerShown: false}} component={SearchScreen} />
        <Stack.Screen name="SeeAll" options={{headerShown: false}} component={SeeAll} />
      </Stack.Navigator>
    </NavigationContainer>
   );
}
 
export default Navigation;