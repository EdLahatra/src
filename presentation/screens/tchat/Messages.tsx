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
  loadEarlier: boolean;
}

interface Props {
  navigation: any;
  route: any;
  users: any;
  sendMessages: any;
  etablishment: any;
  selected: any;
  getMessages: any;
  messages: any;
}

class Messages extends React.Component<Props> {
  public state: AppState;
  socket: any;
  constructor(props) {
    super(props);

    this.state = {
      userId: '',
      userName: '',
      userPhoto: '',
      recieverId: '',
      title: '',
      selected: {},
      loadEarlier: false,
      messages: [
        // {
        //   _id: 1,
        //   text: 'Hello developer',
        //   createdAt: new Date(),
        //   user: {
        //     _id: 2,
        //     name: 'React Native',
        //     avatar: 'https://facebook.github.io/react/img/logo_og.png',
        //   },
        // },
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
    const userId = `${
      this.props.users && this.props.users.user ? this.props.users.user._id : 1
    }`;
    const categorie =
      this.props.route && this.props.route.params
        ? this.props.route.params.categorie
        : 0;
    if (
      this.props.etablishment &&
      this.props.etablishment?.list &&
      Array.isArray(this.props.etablishment?.list[categorie]) &&
      this.props.etablishment.list[categorie].length > 0 &&
      this.props.route &&
      this.props.route.params &&
      this.props.route.params.id
    ) {
      const selected = this.props.etablishment.list[categorie].find(
        (res: any) => res._id === this.props.route.params.id,
      );
      if (selected && selected._id) {
        this.setState({selected});
        // if (this.props.messages && this.props.messages.list && this.props.messages.list[selected._id]) {
        //   this.setState({ messages: this.props.messages.list[selected._id] });
        // } else {
        //   this.setState({ loadEarlier: true });
        // }
      }
    } else {
      this.setState({loadEarlier: true});
    }

    this.props.getMessages(
      {
        id:
          this.props.route && this.props.route.params
            ? this.props.route.params.id
            : 0,
      },
      (res: any) => {
        if (res && res[userId]) {
          this.setState({messages: res[userId]});
        }
        this.setState({loadEarlier: false});
      },
      `${userId}/${
        this.props.route && this.props.route.params
          ? this.props.route.params.id
          : 0
      }`,
    );

    this.setState({
      userId:
        this.props.users && this.props.users.user
          ? this.props.users.user._id
          : 1,
      userName: 'senderName',
      userPhoto: 'senderPhoto',
      recieverId:
        this.props.route && this.props.route.params
          ? this.props.route.params.id
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
      messages: GiftedChat.append(previousState?.messages, messages1),
    }));

    const {selected, messages} = this.state;
    let formData = {
      isUser: true,
      // sender: userId,
      // sender: this.props.users && this.props.users.user ? this.props.users.user._id : 1,
      reciever: selected.onwer,
      text: messages[0].text,
    };

    this.props.sendMessages(formData, (_res: any) => {});
  }

  selectedUsers = (item: any) => {
    this.setState({selected: item});
    const userId = `${
      this.props.users && this.props.users.user ? this.props.users.user._id : 1
    }`;
    if (
      this.props.messages &&
      this.props.messages.list &&
      this.props.messages.list[item._id]
    ) {
      this.setState({messages: this.props.messages.list[item._id]});
    } else {
      this.setState({messages: [], loadEarlier: true});
    }
    this.props.getMessages(
      {id: userId},
      (res: any) => {
        if (res && res[userId]) {
          this.setState({messages: res[item._id]});
        }
        this.setState({loadEarlier: false});
      },
      `${userId}/${item._id}`,
    );
  };

  render() {
    const categorie =
      this.props.route && this.props.route.params
        ? this.props.route.params.categorie
        : 0;
    const dataMessage =
      this.props.messages?.list &&
      this.props.messages?.list[this.state?.selected?._id];

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
              {this.state.selected.name || ''}
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
              {this.props.etablishment &&
                this.props.etablishment?.list &&
                Array.isArray(this.props.etablishment?.list[categorie]) &&
                this.props.etablishment.list[categorie].length > 0 &&
                this.props.etablishment.list[categorie].map((item: any) => {
                  return (
                    <TouchableOpacity
                      key={item._id}
                      onPress={() => this.selectedUsers(item)}>
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
                        <Text style={{margin: 5, textAlign: 'center'}}>
                          {item.name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
            </ScrollView>
          </View>

          <GiftedChat
            loadEarlier={this.state.loadEarlier}
            listViewProps={{
              style: {
                backgroundColor: '#222',
                flex: 1,
                marginBottom: 10,
              },
            }}
            placeholder={'Ecrivez un message ...'}
            alwaysShowSend={true}
            messages={dataMessage || []}
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
                this.props.users && this.props.users.user
                  ? this.props.users.user.firstName
                  : 1,
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
