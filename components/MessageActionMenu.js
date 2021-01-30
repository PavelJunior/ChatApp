import React from 'react';

import { View, Text } from 'react-native';
import Menu, { MenuItem } from 'react-native-material-menu';
import {messageDelete} from './../utilities/messages'

class MessageActionMenu extends React.PureComponent {
  _menu = null;

  componentDidUpdate(prevProps) {
    if (prevProps.visible !== this.props.visible) {
      if (this.props.visible){
        this.showMenu()
      } else {
        this.hideMenu()
      }
    }
  }

  onMessageDelete = () => {
    this.hideMenu()
    messageDelete(this.props.messageId)
  }

  setMenuRef = ref => {
    this._menu = ref;
  };

  hideMenu = () => {
    this.props.setInvisible()
    this._menu.hide();
  };

  showMenu = () => {
    this._menu.show();
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
        <Menu
          ref={this.setMenuRef}
          button={<Text></Text>}
        >
          <MenuItem onPress={this.onMessageDelete}>Delete</MenuItem>
          <MenuItem onPress={this.hideMenu}>Edit</MenuItem>
        </Menu>
      </View>
    );
  }
}

export default MessageActionMenu;
