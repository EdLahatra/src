// importing libraries
import React from 'react';
import {
  View,
  StatusBar,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import {GiftedChat, Bubble, InputToolbar, Send} from 'react-native-gifted-chat';

import {reduxConnect} from '../../../controllers/profil';

interface AppState {
  selected: any;
  userId: string;
  userName: string;
  userPhoto: string;
  recieverId: string;
  messages: any;
  title: string;
  clients: any;
}

interface Props {
  navigation: any;
  route: any;
  users: any;
  adminMessages: any;
  etablishment: any;
  selected: any;
  getAdminMessages: any;
  sendMessages: any;
  getUsers: any;
  messages: any;
}

class Messages extends React.Component<Props> {
  public state: AppState;
  socket: any;
  constructor(props) {
    super(props);

    this.state = {
      clients: [],
      userId: '',
      userName: '',
      userPhoto: '',
      recieverId: '',
      title: '',
      selected: {},
      messages: [
        // {
        //   _id: 1,
        //   text: 'This is a quick reply. Do you love Gifted Chat? (radio) KEEP IT',
        //   createdAt: new Date(),
        //   quickReplies: {
        //     type: 'radio', // or 'checkbox',
        //     keepIt: true,
        //     values: [
        //       {
        //         title: '😋 Yes',
        //         value: 'yes',
        //       },
        //       {
        //         title: '📷 Yes, let me show you with a picture!',
        //         value: 'yes_picture',
        //       },
        //       {
        //         title: '😞 Nope. What?',
        //         value: 'no',
        //       },
        //     ],
        //   },
        //   user: {
        //     _id: 2,
        //     name: 'React Native',
        //   },
        // },
        // {
        //   _id: 2,
        //   text: 'This is a quick reply. Do you love Gifted Chat? (checkbox)',
        //   createdAt: new Date(),
        //   quickReplies: {
        //     type: 'checkbox', // or 'radio',
        //     values: [
        //       {
        //         title: 'Yes',
        //         value: 'yes',
        //       },
        //       {
        //         title: 'Yes, let me show you with a picture!',
        //         value: 'yes_picture',
        //       },
        //       {
        //         title: 'Nope. What?',
        //         value: 'no',
        //       },
        //     ],
        //   },
        //   user: {
        //     _id: 2,
        //     name: 'React Native',
        //   },
        // }
      ],
    };
  }

  //styling chat bubbles
  renderBubble = props => {
    return (
      <Bubble
        {...props}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
        wrapperStyle={{
          right: {
            backgroundColor: '#46CF76',
          },
          left: {
            backfroundColor: '#aaa',
          },
        }}
      />
    );
  };

  //syling input bar
  renderInputToolbar = props => {
    return (
      <>
        <InputToolbar
          {...props}
          containerStyle={{
            backgroundColor: '#111',
            borderTopWidth: 0,
            marginHorizontal: 10,
            marginLeft: '2%',
            borderRadius: 80,
            paddingBottom: 10,
            justifyContent: 'center',
          }}
          textInputProps={{
            style: {
              color: '#fff',
              flex: 1,
              alignItems: 'center',
              paddingHorizontal: 20,
            },
            multiline: false,
            returnKeyType: 'go',
            onSubmitEditing: () => {
              if (props.text && props.onSend) {
                let text = props.text;
                props.onSend({text: text.trim()}, true);
              }
            },
          }}
        />
        {/* <TouchableOpacity
          style={{
            position: 'absolute',
            marginLeft: '4%',
            marginBottom: '1%',
            bottom: 0,
            padding: 10
          }}
          onPress={this.handleChoosePhoto}>
          <Text style={{ marginRight: 10 }}>ddd</Text>
        </TouchableOpacity> */}
      </>
    );
  };

  //styling send button
  renderSend = props => {
    return (
      <>
        <Send {...props}>
          <Text style={{color: 'red'}}>Envoyer</Text>
        </Send>
      </>
    );
  };

  //choose photo fromgallery or camera
  handleChoosePhoto = () => {};

  componentDidMount() {
    this.props.getUsers(
      {},
      (res: any) => {
        const clients = res?.list || [];
        console.log({clients});
        if (clients && clients.length > 0 && clients[0]._id) {
          this.setState({clients, selected: clients[0]});
          if (
            this.props.messages &&
            this.props.messages.list &&
            this.props.messages.list[clients[0]._id]
          ) {
            this.setState({messages: this.props.messages.list[clients[0]._id]});
          } else {
            this.setState({loadEarlier: true});
          }
          this.props.getAdminMessages(
            {id: clients[0]._id},
            (messages: any) => {
              if (messages && messages.list && messages.list[clients[0]._id]) {
                this.setState({messages: messages.list[clients[0]._id]});
              }
              this.setState({loadEarlier: false});
            },
            `${clients[0]._id}`,
          );
        } else {
          this.setState({loadEarlier: false, messages: []});
        }
      },
      '/role/1',
    );

    this.setState({
      userId:
        this.props.users && this.props.users.user
          ? this.props.users.user._id
          : 1,
      userName: 'senderName',
      userPhoto: 'senderPhoto',
      recieverId:
        this.props.etablishment && this.props.etablishment
          ? this.props.etablishment._id
          : 0,
    });
  }

  getMessages = async () => {};

  componentWillUnmount() {
    // this.backHandler.remove();
  }

  handleBackPress = () => {
    this.props.navigation.goBack(); // works best when the goBack is async
    return true;
  };

  componentWillMount() {}

  async onSend(messages1 = []) {
    await this.setState((previousState: any) => ({
      messages: GiftedChat.append(previousState.messages, messages1),
    }));

    const {selected, messages} = this.state;
    let formData = {
      // sender: userId,
      // sender: this.props.etablishment && this.props.etablishment ? this.props.etablishment._id : 0,
      reciever: selected._id,
      text: messages[0].text,
    };

    this.props.sendMessages(formData, (res: any) => {
      console.log({formData, res});
    });

    // this.props.adminMessages(formData, (res: any) => {
    //   console.log({ res });
    // });
  }

  selectedUsers = (item: any) => {
    console.log({item});
    this.setState({selected: item});
    if (
      this.props.messages &&
      this.props.messages.list &&
      this.props.messages.list[item._id]
    ) {
      this.setState({messages: this.props.messages.list[item._id]});
    } else {
      this.setState({loadEarlier: true, messages: []});
    }
    this.props.getAdminMessages(
      {id: item._id},
      (messages: any) => {
        if (messages.list && messages.list[item._id]) {
          this.setState({messages: messages.list[item._id]});
        } else {
          this.setState({messages: []});
        }
        this.setState({loadEarlier: false});
      },
      `${item._id}`,
    );
  };

  render() {
    const clients = this.props.users?.list || [];
    return (
      <>
        <StatusBar backgroundColor="#111" barStyle="light-content" />
        <View style={{backgroundColor: '#222', flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              height: '8%',
              width: '100%',
              backgroundColor: '#111',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: '4%',
            }}>
            <TouchableOpacity
              style={{flex: 1}}
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              <Image
                source={require('../../resources/images/drawable/arrow_left.png')}
                style={{width: 30, height: 20}}
              />
            </TouchableOpacity>
            <Text
              style={{
                flex: 1,
                fontSize: 18,
                color: '#f2f2f2',
                textAlign: 'center',
              }}>
              {this.state.selected?.name || ''}
            </Text>
          </View>
          <View
            style={{
              marginLeft: 10,
              marginRight: 10,
              height: 100,
              width: '100%',
            }}>
            <ScrollView horizontal>
              {Array.isArray(clients) &&
                clients.length > 0 &&
                clients.map(({name, _id, photo}: any) => {
                  return (
                    <TouchableOpacity
                      key={_id}
                      onPress={() => this.selectedUsers({_id, name})}>
                      <View
                        style={{
                          width: 80,
                          height: 80,
                          borderRadius: 50,
                          backgroundColor: 'red',
                          margin: 5,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Image
                          style={{width: 80, height: 80, borderRadius: 50}}
                          source={{uri: photo}}
                        />
                        {/* <Text style={{ margin: 5, textAlign: 'center' }}>{item.name}</Text> */}
                      </View>
                    </TouchableOpacity>
                  );
                })}
            </ScrollView>
          </View>

          <GiftedChat
            loadEarlier={
              !this.state.messages || this.state.messages.length === 0
            }
            listViewProps={{
              style: {
                backgroundColor: '#222',
                flex: 1,
                marginBottom: 10,
              },
            }}
            placeholder={'Ecrivez un message ...'}
            alwaysShowSend={true}
            messages={this.state.messages}
            renderBubble={this.renderBubble}
            renderInputToolbar={this.renderInputToolbar}
            renderSend={this.renderSend}
            onSend={(messages: any) => this.onSend(messages)}
            user={{
              _id:
                this.props.users && this.props.users.user
                  ? this.props.users.user._id
                  : 1,
              name:
                this.props.etablishment && this.props.etablishment
                  ? this.props.etablishment.name
                  : 0,
              avatar: this.state.userPhoto,
            }}
          />
          <View
            style={{
              height: '2%',
              width: '100%',
            }}
          />
        </View>
      </>
    );
  }
}

export default reduxConnect(Messages);
