import {createStackNavigator} from 'react-navigation-stack';

import {Platform} from 'react-native';
import Splash from '../screen/Splash';
import MainView from '../screen/MainView';
import YoutubePage from '../screen/setting/YoutubePage';
import Setting1 from '../screen/setting/Setting1';
import Feedback from '../screen/setting/Feedback';
import AddPreset from '../screen/setting/AddPreset';

import GranularPage from '../screen/solid/GranularPage';
import LiquidPage from '../screen/liquid/LiquidPage';
import Journal from "../screen/journal/Journal";
import AddLiquid from "../screen/setting/AddLiquid";
import AddGranular from "../screen/setting/AddGranular";
import AddProject from "../screen/journal/AddProject";
import NewEntry from "../screen/journal/NewEntry";
import Tips from "../screen/Tips/Tips";
import SettingView from "../screen/setting/SettingView";
import LiquidEntry from "../screen/journal/LiquidEntry";

const StackNavigatorOptions = {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: 'transparent',
            borderBottomWidth: 0,
        },
        headerTintColor: 'transparent',
        headerTitleStyle: {
            textAlign: 'center',
            color: '#fff',
            fontSize: 18,
            fontWeight: 'bold',
            flexGrow: 1,
            alignSelf: 'center',
            marginRight: Platform.select({
                ios: 18,
                android: 76,
            }),
        },
        headerTransparent: true,
        drawerLockMode: 'locked-close',
    },
};

const NormalStackNavigator = createStackNavigator(
    {
        Home: {
            screen: MainView,
            navigationOptions: {
                drawerLockMode: 'locked-close',
                disableGestures: true,
            },
        },
        YoutubePage: {
            screen: YoutubePage,
            navigationOptions: {
                drawerLockMode: 'locked-close',
                disableGestures: true,
            },
        },
        Setting1: {
            screen: Setting1,
            navigationOptions: {
                drawerLockMode: 'locked-close',
                disableGestures: true,
            },
        },
        Feedback: {
            screen: Feedback,
            navigationOptions: {
                drawerLockMode: 'locked-close',
                disableGestures: true,
            },
        },
        AddPreset: {
            screen: AddPreset,
            navigationOptions: {
                drawerLockMode: 'locked-close',
                disableGestures: true,
            },
        },
        Granular: {
            screen: GranularPage,
            navigationOptions: {
                drawerLockMode: 'locked-close',
                disableGestures: true,
            },
        },
        Liquid: {
            screen: LiquidPage,
            navigationOptions: {
                drawerLockMode: 'locked-close',
                disableGestures: true,
            },
        },
        Journal: {
            screen: Journal,
            navigationOptions: {
                drawerLockMode: 'locked-close',
                disableGestures: true,
            },
        },
        AddLiquid: {
            screen: AddLiquid,
            navigationOptions: {
                drawerLockMode: 'locked-close',
                disableGestures: true,
            },
        },
        AddGranular: {
            screen: AddGranular,
            navigationOptions: {
                drawerLockMode: 'locked-close',
                disableGestures: true,
            },
        },
        AddProject: {
            screen: AddProject,
            navigationOptions: {
                drawerLockMode: 'locked-close',
                disableGestures: true,
            },
        },
        NewEntry:{
            screen: NewEntry,
            navigationOptions: {
                drawerLockMode: 'locked-close',
                disableGestures: true,
            },
        },
        LiquidEntry:{
            screen: LiquidEntry,
            navigationOptions: {
                drawerLockMode: 'locked-close',
                disableGestures: true,
            },
        },
        Tips:{
            screen: Tips,
            navigationOptions: {
                drawerLockMode: 'locked-close',
                disableGestures: true,
            },
        },
        SettingView:{
            screen: SettingView,
            navigationOptions: {
                drawerLockMode: 'locked-close',
                disableGestures: true,
            },
        },

    },
    StackNavigatorOptions,
);

export default NormalStackNavigator;
