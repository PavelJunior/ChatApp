import React, {useState, useEffect} from 'react'
import {StyleSheet, View, ActivityIndicator} from 'react-native'
import Sound from 'react-native-sound';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const AudioMessage = (props) => {
  const [audioPlayer, setAudioPlayer] = useState(null)
  const [isRecordPlaying, setIsRecordPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [playTime, setPlayTime] = useState(0)
  const [timeout, setTimeout] = useState(0)

  useEffect(() => {
    const getPlayer = async () => {
      const audioPlayer = await new Sound(props.file, null, (e) => {
        const duration = audioPlayer.getDuration()
        setDuration(duration)

        console.log('error loading track:', e)
      })

      setAudioPlayer(audioPlayer)
    }

    if (props.file != null) {
      getPlayer()
    }
  }, [props.file])

  const onRecordPlay = async () => {
    setIsRecordPlaying(true)
    await audioPlayer.play(() => {
      setIsRecordPlaying(false)
    })

    setTimeout(setInterval(() => {
      if(audioPlayer && audioPlayer.isLoaded()){
        audioPlayer.getCurrentTime((seconds) => {
          setPlayTime(seconds)
        })
      }
    }, 100));
  }

  const onRecordPause = async () => {
    setIsRecordPlaying(false)
    await audioPlayer.pause()
    clearInterval(timeout);
  };

  const getPlayedPercent = () => {
    return Math.floor(playTime / duration * 100)
  }

  const itemToDisplay = () => {
    if(props.file == null || audioPlayer == null || !audioPlayer.isLoaded()){
      return (<ActivityIndicator />)
    } else {
      return !isRecordPlaying ?
        <MaterialCommunityIcons name="play" size={28} color="black" onPress={onRecordPlay}/> :
        <MaterialCommunityIcons name="pause" size={28} color="black" onPress={onRecordPause}/>
    }
  }

  return (
    <View style={styles.container}>
      {itemToDisplay()}
      <View style={styles.audio}>
        <View style={[styles.audioPlayedBar, {width: `${getPlayedPercent()}%`}]}></View>
        <View style={styles.audioDurationBar}></View>
      </View>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  audio: {
    width: '85%',
    height: 4,
    flexDirection: 'column',
  },
  audioDurationBar: {
    width: '100%',
    height: 2,
    backgroundColor: 'gray'
  },
  audioPlayedBar: {
    height: 2,
    backgroundColor: 'black'
  }
})

export default AudioMessage;
