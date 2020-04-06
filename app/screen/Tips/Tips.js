import React, {Component} from 'react';

import {
    StyleSheet,
    View,
    TextInput,
    ScrollView,
    Switch,
    Linking,
    Text, TouchableOpacity, Image, AsyncStorage, Alert, ImageBackground,
} from 'react-native';

import {KeyboardAccessoryNavigation} from 'react-native-keyboard-accessory';

import Colors from "../../constants/Colors";

import {ListItem} from "react-native-elements";
import TipsStyle from "./TipsStyle";
const LW = Layout.window.width;
const LH = Layout.window.height;

import ActivityIndicatorHelper from "../../components/ActivityIndicatorHelper";

import { TabView, SceneMap } from 'react-native-tab-view';
import { TabBar } from 'react-native-tab-view';
import Layout from "../../constants/Layout";

import SwitchSelector from 'react-native-switch-selector';


class Tips extends Component {


    constructor(props) {
        super(props);
        this.state = {
            apiServer: 'http://18.223.184.254/api/api.php',
            uploadURI: 'http://18.223.184.254/api/',
            loading: false,
            howToVideos: [
                            ],
            tipOfMonth: [],
            helpLinks: [],
            selectedIndex:0,
            routes:[
                { key: 'video', title: 'Videos' },
                { key: 'tips', title: 'Tips' },
                { key: 'helps', title: 'Helps Links' },]
        };
    }

    async componentDidMount(): void {
        this.loadingLinks();

    }

    loadingLinks() {
        let data = new FormData()
        // params
        data.append('action', 'get-all-videos')
        this.setState({loading: true});
        fetch(this.state.apiServer, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: data
        })
            .then(res => res.json())
            .then(res => {
                // console.log(res);
                if (res.result == 'ok') {
                    // console.log(JSON.stringify(res));
                    const data = res.data;
                    const videos = data['videos'];
                    const tips = data['tips'];
                    const helps = data['helplinks'];
                    this.setState(
                        {
                            howToVideos: videos,
                            tipOfMonth: tips,
                            helpLinks: helps
                        })

                } else {
                    Alert.alert(
                        '',
                        res,
                        [
                            {
                                text: 'OK', onPress: () =>
                                    console.log('Fail')
                            },
                        ],
                        {cancelable: false}
                    )
                }
                this.setState({
                    loading: false,
                });
            })
            .catch(error => {
                this.setState({
                    loading: false,
                });
                Alert.alert(
                    '',
                    error.message,
                    [
                        {
                            text: 'OK', onPress: () =>
                                console.log('failed')
                        },
                    ],
                    {cancelable: false}
                )
            })
    }

    setIndex(value) {
        console.log(value)
        this.setState({
            viewIndex:value,
        })
        return undefined;
    }
    tabIndexChange = index => {
        this.setState({
            ...this.state,
            selectedIndex: index,
        });
    };

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.title_container}>

                    <View style={styles.setting_header}>
                        <Text
                            style={[styles.setting_title, styles.fontforSubtitle]}>Tips & More</Text>
                    </View>
                    <View
                        style={styles.headerRightLogo}>
                        <View style={{width: '80%', height: '80%'}}>
                            <Image
                                style={styles.fit_image}
                                source={require('../../assets/images/logo.png')}
                            />
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.headerLeftBack}
                        onPress={() => {
                            this.props.navigation.goBack()
                        }}>
                        <View style={{width: '30%', height: '30%'}}>
                            <Image
                                style={styles.fit_image}
                                source={require('../../assets/images/left.png')}
                            />
                        </View>
                    </TouchableOpacity>
                </View>

                <SwitchSelector
                    initial={0}
                    style={{marginHorizontal:10}}
                    onPress={value => this.tabIndexChange(value)}
                    selectedColor={Colors.whiteColor}
                    buttonColor={Colors.lightGreenColor}
                    hasPadding
                    options={[
                        {label: 'Videos', value: 0},
                        {label: 'Tips', value: 1},
                        {label: 'Helps', value: 2},
                    ]}
                />

                <View style={styles.tips_container}>
                    {
                        this.state.selectedIndex == 0 &&
                        <View style={styles.row_center_container}>
                            <TouchableOpacity
                                style={styles.tips_title_container}
                                onPress={() => {
                                }}>
                                <Text style={styles.add_button}>How to Videos</Text>
                            </TouchableOpacity>
                        </View>
                    }

                    {
                        this.state.selectedIndex == 0 &&


                        <ScrollView style={styles.scroll_container} contentContainerStyle={styles.scroll_content_container}>
                            {this.state.howToVideos.map((item, i) => (
                                <TouchableOpacity
                                    style={styles.tips_item}
                                    onPress={() => {
                                        Linking.openURL(item.url);
                                    }}>
                                    <Image
                                        style={styles.tip_image}
                                        source={{uri: item.image}}
                                    />
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    }

                    {
                        this.state.selectedIndex == 1 &&

                        <View style={styles.row_center_container}>
                            <TouchableOpacity
                                style={styles.tips_title_container}
                                onPress={() => {
                                }}>
                                <Text style={styles.add_button}>TIP OF THE MONTH</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    {
                        this.state.selectedIndex == 1 &&
                        <ScrollView style={styles.scroll_container}>
                            {this.state.tipOfMonth.map((item, i) => (
                                <TouchableOpacity
                                    style={styles.tips_item}
                                    onPress={() => {
                                        Linking.openURL(item.url);
                                        // this.props.navigation.navigate('YoutubePage');
                                    }}>
                                    <Image
                                        style={styles.tip_image}
                                        source={{uri: item.image}}
                                    />
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    }

                    {
                        this.state.selectedIndex == 2 &&
                        <View style={styles.row_center_container}>
                            <TouchableOpacity
                                style={styles.tips_title_container}
                                onPress={() => {
                                }}>
                                <Text style={styles.add_button}>HELP LINKS</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    {
                        this.state.selectedIndex == 2 &&
                        <ScrollView style={styles.scroll_container}>
                            {this.state.helpLinks.map((item, i) => (
                                <TouchableOpacity
                                    style={styles.tips_item}
                                    onPress={() => {
                                        Linking.openURL(item.url);
                                        // this.props.navigation.navigate('YoutubePage');
                                    }}>
                                    <Image
                                        style={styles.tip_image}
                                        source={{uri: item.image}}
                                    />
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    }
                </View>
                {this.state.loading && <ActivityIndicatorHelper/>}
            </View>
        );
    }


}

const styles = StyleSheet.create(TipsStyle);
export default Tips;
