import React from 'react';
import {GiftedChat, IMessage} from 'react-gifted-chat';

import {ConversationScreen} from './ConversationScreen';

interface AppState {
  userId: string;
  userName: string;
  userPhoto: string;
  recieverId: string;
  messages: IMessage[];
}

export class Messages extends React.Component<any> {
  public state: AppState;
  socket: any;
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      userName: '',
      userPhoto: '',
      recieverId: '',
      messages: [],
    };
  }

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        },
      ],
    });
  }

  onSend(messages: IMessage[] = []) {
    this.setState((previousState: any) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  render() {
    return (
      <ConversationScreen />
      // <GiftedChat
      //   messages={this.state.messages}
      //   onSend={(messages: IMessage[]) => this.onSend(messages)}
      //   user={{
      //     _id: 1,
      //   }}
      // />
    );
  }
}
