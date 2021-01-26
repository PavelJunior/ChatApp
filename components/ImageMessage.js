import React, {useState, useEffect} from 'react'
import {StyleSheet, View, ActivityIndicator, Image} from 'react-native';
import {Storage} from 'aws-amplify';


const AudioMessage = (props) => {
  const [loaded, setLoaded] = useState(false)

  return (
    <View>
      <Image source={{ url: props.file }} style={styles.image} onLoad={() => setLoaded(true)}/>
      {!loaded && <ActivityIndicator size="large" style={styles.activityIndicator}/>}
    </View>
  )

}

const styles = StyleSheet.create({
  image: {
    resizeMode: 'contain',
    flex: 1,
    aspectRatio: 1,
  },
  activityIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    margin: 'auto',



  }
})

export default AudioMessage;
