import {API, graphqlOperation} from 'aws-amplify';
import {createMessage, updateChatRoom, deleteMessage} from '../graphql/mutations';
import {messagesByChatRoom, getChatRoom} from '../graphql/queries'

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

export const messageDelete = async (messageId) => {
  try {
    const deletedMessageData = await API.graphql(
      graphqlOperation(
        deleteMessage, {
          input: {
            id: messageId
          }
        }
      )
    )

    const chatRoomId = deletedMessageData.data.deleteMessage.chatRoomID
    await isLastMessageUpdateNeeded(chatRoomId)
  } catch (e) {
    console.log(e)
  }
}

const isLastMessageUpdateNeeded = async (chatRoomId) => {
  try {
    const lastMessage = await API.graphql(
      graphqlOperation(
        messagesByChatRoom, {
          chatRoomID: chatRoomId,
          limit: 1,
          sortDirection: 'DESC'
        }
      )
    )

    const lastMessageId = lastMessage.data.messagesByChatRoom.items.length ?
      lastMessage.data.messagesByChatRoom.items[0].id : ""

    const chatRoom = await API.graphql(
      graphqlOperation(
        getChatRoom, {
            id: chatRoomId
        }
      )
    )

    const markedAsLastMessage = chatRoom.data.getChatRoom.lastMessageID

    if (lastMessageId !== markedAsLastMessage){
      await updateChatRoomLastMessage(chatRoomId, lastMessageId)
    }

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
