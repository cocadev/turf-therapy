import {Dimensions, Platform, StatusBar} from 'react-native';

import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import GlobalStyle from '../constants/GlobalStyle';

const LW = Layout.window.width;
const LH = Layout.window.height;
const CW = LW;
const CH =
  Platform.OS === 'ios'
    ? LH - (Layout.statusHeight + Layout.menuHeight)
    : LH - Layout.menuHeight;

export default {
  ...GlobalStyle,

  mainContent: {
    flex: 1,
    width: CW,
    height: CH,
    flexDirection: 'column',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  main_bottom_action_container:{
    flexDirection: 'row',
    height:'80%',
    alignItems:'center',
    justifyContent: 'space-around',
    flex:1,
    width:'100%',
    marginBottom:'5%',
    paddingHorizontal: LW*0.1,
  },
  main_bottom_action_item:{
    width: '20%',
    height: '50%',
    alignItems: 'center',
    aspectRatio: 1,
  },
  mainSettingIcon: {
    // position: 'absolute',

    // right: 30,
    // bottom: '7%',
    width: '50%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerLeftIcon: {
    position: 'absolute',
    left: 15,
    top: 20,
    width: 25,
    height: 25,
  },

  headerRightIcon: {
    backgroundColor: 'red',
    width: '10%',
    aspectRatio: 1,
  },
  logoContainer: {
    justifyContent: 'center',
    width: '100%',
    height: '70%',
    alignItems: 'center',
    marginTop: 15,
    flexDirection: 'row',
  },
  logo_image: {
    width: '95%',
    aspectRatio: 463/800,
  },
  actionContainer: {
    marginTop: 10,
    height: '15%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  actionItem: {
    width: '20%',
    aspectRatio: 1,
  },
};
