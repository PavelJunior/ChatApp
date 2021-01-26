import {API, graphqlOperation} from 'aws-amplify';
import {createMessage, updateChatRoom} from '../graphql/mutations';

export const sendMessage = async (content, chatRoomId, userId, messageType) => {
  try {
    const newMessageData = await API.graphql(
      graphqlOperation(
        createMessage, {
          input: {
            content: content,
            chatRoomID: chatRoomId,
            userID: userId,
            type: messageType
          }
        }
      )
    )
    await updateChatRoomLastMessage(chatRoomId, newMessageData.data.createMessage.id)

  } catch (e) {
    console.log(e)
  }
}

const updateChatRoomLastMessage = async (chatRoomId, messageId) => {
  try {
    await API.graphql(
      graphqlOperation(
        updateChatRoom, {
          input: {
            id: chatRoomId,
            lastMessageID: messageId,
          }
        }
      )
    );
  } catch (e) {
    console.log(e);
  }
}
