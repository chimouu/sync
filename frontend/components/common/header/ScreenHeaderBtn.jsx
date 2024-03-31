import React from 'react'
// import { View, Text } from 'react-native'
import { TouchableOpacity, Image} from 'react-native'

import styles from './screenheader.style'

const ScreenHeaderBtn = ({ iconUrl, dimesnion, handlePress }) => {
  return (
    <TouchableOpacity style={styles.btnContainer} onPress={handlePress}>
      <Image
      source={iconUrl}
      resizeMode="cover"
      style = {styles.btnImg(dimesnion)}
      />
    </TouchableOpacity>
  )
}

export default ScreenHeaderBtn