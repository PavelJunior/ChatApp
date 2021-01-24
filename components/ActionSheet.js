import React from 'react'
import ActionSheet from 'react-native-actionsheet'
import Entypo from 'react-native-vector-icons/Entypo/'
import {View, Text, TouchableOpacity} from 'react-native'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

class AttachmentActionSheet extends React.Component {
  state = {
    attachment: null
  }

  showActionSheet = () => {
    this.ActionSheet.show()
  }

  launchCameraOptions = {
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
    mediaType: 'photo'
  }

  launchImageLibraryOptions = {

  }

  onPress = (index) => {
    switch (index){
      case 0:
        console.log("Camera should launch")
        launchCamera(this.launchCameraOptions, response => {
          console.log(response)
      })
        break

      case 1:
        launchImageLibrary(this.launchImageLibraryOptions, response => {
          if (response.uri) {
            console.log(response.uri)
            this.setState({ photo: response })
          }
        })
        break
    }

  }

  render() {
    return (
      <View>
         <TouchableOpacity onPress={this.showActionSheet}>
           <Entypo name='attachment' size={24} color='gray' style={{marginHorizontal: 5}}/>
         </TouchableOpacity>
        <ActionSheet
          ref={o => this.ActionSheet = o}
          title={'Which one do you like ?'}
          options={['Take a picture', 'Choose from library', 'Cancel']}
          cancelButtonIndex={2}
          onPress={(index) => this.onPress(index)}
        />
      </View>
    )
  }
}

export default AttachmentActionSheet;

