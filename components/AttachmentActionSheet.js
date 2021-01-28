import React from 'react'
import ActionSheet from 'react-native-actionsheet'
import Entypo from 'react-native-vector-icons/Entypo/'
import {View, TouchableOpacity} from 'react-native'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Storage} from 'aws-amplify';
import {sendMessage} from '../utilities/messages';


class AttachmentActionSheet extends React.Component {
  state = {
    attachment: null
  }

  showActionSheet = () => {
    this.ActionSheet.show()
  }

  uploadFile = async (data) => {
    try {
      this.props.addFakeMessageWhileUploading({
        type: 'photo',
        content: '',
        user: {id: this.props.userId, name: ""},
      })

      const response = await fetch(data.uri)
      const blob = await response.blob()
      const name = Math.random().toString(36).substring(7)

      Storage.put(`${name}.jpeg`, blob, {
        contentType: 'image/jpeg',
      }).then(async (r) => {
        sendMessage(r.key, this.props.chatRoomId, this.props.userId, 'photo')
      })
    } catch (err) {
      console.log(err)
    }
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
        launchCamera(this.launchCameraOptions, response => this.uploadFile(response))
        break

      case 1:
        launchImageLibrary(this.launchImageLibraryOptions, response => this.uploadFile(response))
        break
    }

  }

  render() {
    return (
      <View>
         <TouchableOpacity onPress={this.showActionSheet}>
           <Entypo name='attachment' size={24} style={{marginHorizontal: 5}} color="black"/>
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

