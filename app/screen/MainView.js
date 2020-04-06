import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  Alert,
  View,
  ScrollView, Linking, ImageBackground,
} from 'react-native';
import Layout from '../constants/Layout';
import Colors from '../constants/Colors';
import {
  Avatar,
  CheckBox,
  Input,
  Icon,
  ListItem,
  Overlay,
} from 'react-native-elements';
import MainViewStyle from './MainViewStyle';
import openURLInBrowser from 'react-native/Libraries/Core/Devtools/openURLInBrowser';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

const LW = Layout.window.width;
const LH = Layout.window.height;
const RateWH = LH / LW;

export default class MainView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onSwipeUp(gestureState) {
    this.setState({myText: 'You swiped up!'});
  }

  onSwipeDown(gestureState) {
    this.setState({myText: 'You swiped down!'});
    this.setState({isShowContainer: false}, () => {
      this.props.navigation.goBack();
    });
    console.log('you swipe down');
  }

  onSwipeLeft(gestureState) {
    console.log('you swipe left');
    this.setState({myText: 'You swiped left!'});
  }

  onSwipeRight(gestureState) {
    console.log('you swipe right');
    this.setState({myText: 'You swiped right!'});
  }

  onSwipe(gestureName, gestureState) {
    const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    this.setState({gestureName: gestureName});
    switch (gestureName) {
      case SWIPE_UP:
        this.setState({backgroundColor: 'red'});
        break;
      case SWIPE_DOWN:
        this.setState({backgroundColor: 'green'});
        break;
      case SWIPE_LEFT:
        this.setState({backgroundColor: 'blue'});
        break;
      case SWIPE_RIGHT:
        this.setState({backgroundColor: 'yellow'});
        break;
    }
  }
  render() {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80,
    };
    return (
      <View
        // source={require('../assets/images/main_background.png')}
        style={styles.mainContent}>
        <View style={styles.logoContainer}>
          <View  style={styles.logo_image}>
            <Image
              style={styles.fit_image}
              source={require('../assets/images/mainlogo.png')}
            />
          </View>
        </View>

        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={styles.actionItem}
            onPress={() => {
              this.props.navigation.navigate('Granular');
            }}>
            <Image
              style={styles.fit_image}
              source={require('../assets/images/granular.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionItem}
            onPress={() => {
              this.props.navigation.navigate('Liquid');
            }}>
            <Image
              style={styles.fit_image}
              source={require('../assets/images/liquid.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionItem}
            onPress={() => {
              this.props.navigation.navigate('Journal');
            }}>
            <Image
              style={styles.fit_image}
              source={require('../assets/images/mainjournal.png')}
            />
          </TouchableOpacity>
        </View>
      <View style={styles.main_bottom_action_container}>
        <TouchableOpacity style={styles.main_bottom_action_item} onPress={()=>{ this.props.navigation.navigate('Setting1');}}>
          <View style={{width:'100%',height:'100%'}}>
          <Image  style={styles.fit_image} source={require('../assets/images/mainsetting.png')}/>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.main_bottom_action_item} onPress={()=>{ this.props.navigation.navigate('Tips');}}>
          <View style={{width:'100%',height:'100%'}}>
            <Image  style={styles.fit_image} source={require('../assets/images/tips1.png')}/>
          </View>
        </TouchableOpacity>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create(MainViewStyle);
