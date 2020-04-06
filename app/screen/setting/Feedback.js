import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  Alert,
  View,
  TextInput,
  Keyboard,
  Linking,
  ScrollView,
} from 'react-native';
import Layout from '../../constants/Layout';
import Colors from '../../constants/Colors';

import {
  Avatar,
  CheckBox,
  Input,
  Icon,
  ListItem,
  Overlay,
} from 'react-native-elements';
import SettingViewStyle from './SettingViewStyle';
import {NativeModules} from 'react-native';
// import Linking from 'react-native/Libraries/Linking/Linking';
import openURLInBrowser from 'react-native/Libraries/Core/Devtools/openURLInBrowser';

const LW = Layout.window.width;
const LH = Layout.window.height;
const RateWH = LH / LW;

export default class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbackFrom: '',
      feedbackSubject: 'Turf Therapy',
      feedbackContent: '',
    };
  }
  openMailApp() {
    if (Platform.OS === 'android') {
      NativeModules.UIMailLauncher.launchMailApp(); // UIMailLauncher is the
      return;
    }
    Linking.openURL('message:0'); // iOS
    return;
  }
  sendEmail() {
    if (
      this.state.feedbackFrom != '' &&
      this.state.feedbackSubject != '' &&
      this.state.feedbackContent != ''
    ) {
      Linking.openURL(
        'mailto:turftherapy357@gmail.com?subject=' +
          this.state.feedbackSubject +
          '&body=' +
          this.state.feedbackContent +
          '&cc=' +
          this.state.feedbackFrom,
      );
    } else {
      Alert.alert(
        'Content Empty',
        'Please input your feedback content',
        [
          {
            text: 'OK',
            onPress: () => console.log('Fail'),
          },
        ],
        {cancelable: false},
      );
    }
  }
  _handleFocusNextField = (nextField) => {

    // this.refs[nextField].refs.TextInput.focus();
  }

  render() {
    const toEmail = 'turftherapy357@gmail.com';
    return (
      <View style={styles.feedback_view}>
        <View style={styles.title_container}>

          <View style={styles.setting_header}>
            <Text style={[styles.setting_title, styles.fontTitleHarabara]}>Feedback</Text>
          </View>
          <View
            style={styles.headerRightLogo}>
            <View style={{width: '100%', height: '100%'}}>
              <Image
                style={styles.fit_image}
                source={require('../../assets/images/logo.png')}
              />
            </View>
          </View>

          <TouchableOpacity
              style={styles.headerLeftBack}
              onPress={() => {
                this.props.navigation.goBack();
              }}>
            <View style={{width: '40%', height: '80%'}}>
              <Image
                  style={styles.fit_image}
                  source={require('../../assets/images/left.png')}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.feedback_container}>
          <View style={styles.feedback_sub_container}>
            <Text style={styles.regular_text}>To :</Text>
            <Text style={{fontSize: Layout.font.btn_size}}>
              turftherapy357@gmail.com
            </Text>
          </View>

          <View style={styles.feedback_sub_container}>
            <Text style={styles.regular_text}>From :</Text>
            <View style={styles.feedback_input_container}>
              <TextInput
                ref="from"
                textAlignVertical="center"
                inputContainerStyle={{borderBottomWidth: 0}}
                labelStyle={styles.text_label_input}
                inputStyle={styles.text_input}
                keyboardType={'email-address'}
                fontSize={Layout.font.medium_size}
                value={this.state.feedbackFrom}
                returnKeyType={'next'}
                autoFocus={false}
                blurOnSubmit={false}
                onSubmitEditing={this._handleFocusNextField.bind(
                  this,
                  'subject',
                )}
                onChangeText={text => {
                  this.setState({
                    feedbackFrom: text,
                  });
                }}
                placeholder=""
              />
            </View>
          </View>

          {/*<View style={styles.feedback_sub_container}>*/}
          {/*  <Text style={styles.regular_text}>Subjects:</Text>*/}
          {/*  <View style={styles.feedback_input_container}>*/}
          {/*    <TextInput*/}
          {/*      ref="subject"*/}
          {/*      multiline={true}*/}
          {/*      inputContainerStyle={{borderBottomWidth: 0}}*/}
          {/*      labelStyle={styles.text_label_input}*/}
          {/*      inputStyle={styles.text_input}*/}
          {/*      fontSize={Layout.font.medium_size}*/}
          {/*      value={this.state.feedbackSubject}*/}
          {/*      returnKeyType={'next'}*/}
          {/*      autoFocus={false}*/}
          {/*      blurOnSubmit={false}*/}
          {/*      onSubmitEditing={this._handleFocusNextField.bind(*/}
          {/*        this,*/}
          {/*        'content',*/}
          {/*      )}*/}
          {/*      onChangeText={text => {*/}
          {/*        this.setState({*/}
          {/*          feedbackSubject: text,*/}
          {/*        });*/}
          {/*      }}*/}
          {/*      placeholder=""*/}
          {/*    />*/}
          {/*  </View>*/}
          {/*</View>*/}
          <TextInput
            ref="content"
            multiline={true}
            inputContainerStyle={{borderBottomWidth: 0,backgroundColor:'red'}}
            labelStyle={styles.text_label_input}
            inputStyle={styles.text_input}
            fontSize={Layout.font.medium_size}
            value={this.state.feedbackContent}
            returnKeyType={'Send'}
            autoFocus={false}
            blurOnSubmit={false}
            onSubmitEditing={Keyboard.dismiss}
            onChangeText={text => {
              this.setState({
                feedbackContent: text,
              });
            }}
            placeholder="Enter your feedback content"
          />
        </View>
        <TouchableOpacity
          style={styles.send_email_container}
          onPress={() => {
            this.sendEmail();
          }}>
          <Text style={styles.send_email_text}>Send Feedback</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create(SettingViewStyle);
