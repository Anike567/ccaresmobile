import {TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';


const Usermanualheaderarrow = ({ navigation }) => {
    return (
      <View style={{flexDirection: 'row'}}>
        {/* Button for navigating back to the previous screen */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

      </View>
    );
  };

  export default Usermanualheaderarrow;