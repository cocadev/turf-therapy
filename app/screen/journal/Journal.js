import React, {Component} from 'react';

import {
    StyleSheet,
    View,
    TextInput,
    ScrollView,
    Switch,
    Text, TouchableOpacity, Image, AsyncStorage, Alert,
} from 'react-native';

import {KeyboardAccessoryNavigation} from 'react-native-keyboard-accessory';

import JournalStyle from "./JournalStyle";
import Colors from "../../constants/Colors";
import {ListItem} from "react-native-elements";

class Journal extends Component {
    constructor(props) {
        super(props);

        const {params} = this.props.navigation.state;
        var isAdded = false;
        if(params!= undefined  && params.isAdded != undefined){
            isAdded = params.isAdded;
        }

        this.state = {
            liquidProjects: [],
            granularProjects: [],
            isAdded:isAdded,
        };
    }

    createNewProject = async (isGranular) => {

        var project = {
            totalN: '',
            totalP: '',
            totalK: '',
            totalCost: '',
            name: '',
            entries: [],
            isGranular: isGranular,
        };

        if(isGranular){
            this.setState({isAdded :false})

            this.props.navigation.navigate('AddProject', {
                onGoBack: () => this.addNewProjectRefreshG(),
                isUpdate: false,
                currentProject: {},
                FromEntry:true,
                isGranular: isGranular,
                isAdded: true,
            });
        }else{
            this.setState({isAdded :false})

            this.props.navigation.navigate('AddProject', {
                onGoBack: () => this.addNewProjectRefreshL(),
                isUpdate: false,
                FromEntry:true,
                currentProject: {},
                isGranular: isGranular,
                isAdded: true,
            });
        }
    }

    goToProjectG = (isUpdate,item) => {
        if(this.state.isAdded){
            const {params} = this.props.navigation.state;
            if(params.isGranular === true) {

                this.setState({isAdded :false})

                this.props.navigation.navigate('AddProject', {
                    onGoBack: () => this.addNewProjectRefreshG(),
                    isUpdate: isUpdate,
                    currentProject: item,
                    isGranular: true,
                    isAdded: true,
                    FromEntry:true,
                    entryN:params.entryN,
                    entryP:params.entryP,
                    entryK:params.entryK,
                });
            }else{
                Alert.alert(
                    '',
                    'You should select the Liquid project.',
                    [
                        {
                            text: 'OK',
                            onPress: () => console.log('Fail'),
                        },
                    ],
                    {cancelable: false},
                );
            }
        }else{
            this.props.navigation.navigate('AddProject', {
                onGoBack: () => this.addNewProjectRefreshG(),
                isUpdate: isUpdate,
                FromEntry:true,
                currentProject: item,
                isGranular: true,
            });
        }
    }

    goToProjectL = (isUpdate,item) => {

        if(this.state.isAdded) {
            const {params} = this.props.navigation.state;
            if( params.isGranular === false){
                this.setState({isAdded :false})
                this.props.navigation.navigate('AddProject', {
                    onGoBack: () => this.addNewProjectRefreshL(),
                    isUpdate: isUpdate,
                    currentProject: item,
                    isGranular: false,
                    FromEntry: true,
                    isAdded: true,
                    entryN:params.entryN,
                    entryP:params.entryP,
                    entryK:params.entryK,
                });
            }else{
                Alert.alert(
                    '',
                    'You should select the Granular project.',
                    [
                        {
                            text: 'OK',
                            onPress: () => console.log('Fail'),
                        },
                    ],
                    {cancelable: false},
                );
            }

        }else{
            this.props.navigation.navigate('AddProject', {
                onGoBack: () => this.addNewProjectRefreshL(),
                isUpdate: isUpdate,
                currentProject: item,
                FromEntry: true,
                isGranular: false,
            });
        }
    }

    addNewProjectRefreshG = async () => {
        this.refreshData()
        // await AsyncStorage.getItem('granularproject').then(data => {
        //     if (data !== null) {
        //         var project = JSON.parse(data);
        //         console.log(' journal  get project:', project);
        //         var granularProjects = this.state.granularProjects;
        //
        //         if (project.isUpdate && project.index != undefined && project.index != null) {
        //             granularProjects[project.index] = project;
        //             console.log('project update;', granularProjects);
        //         } else {
        //             project.index = granularProjects.length;
        //             granularProjects.push(project);
        //             console.log('new project add', granularProjects);
        //         }
        //         this.setState({granularProjects: granularProjects});
        //     }
        // });
    }

    addNewProjectRefreshL = async () => {
        this.refreshData()
        // await AsyncStorage.getItem('liquidproject').then( data => {
        //     if (data !== null) {
        //         var project = JSON.parse(data);
        //         console.log(' journal  get project:', project);
        //         var liquidProjects = this.state.liquidProjects;
        //
        //         if (project.isUpdate && project.index != undefined && project.index != null) {
        //             liquidProjects[project.index] = project;
        //             console.log('project update;', liquidProjects);
        //         } else {
        //             project.index = liquidProjects.length;
        //             liquidProjects.push(project);
        //             console.log('new project add', liquidProjects);
        //         }
        //         this.setState({liquidProjects: liquidProjects});
        //     }
        // });
    }


    saveBack = async () => {
        // var liquidProjectString = JSON.stringify(this.state.liquidProjects);
        // await AsyncStorage.setItem('liquidprojects', liquidProjectString);
        // var granularProjectsString = JSON.stringify(this.state.granularProjects);
        // await AsyncStorage.setItem('granularprojects', granularProjectsString);
        //
        // console.log('*************************************');
        // console.log('the back save in journal:',liquidProjectString)
        // console.log('the back save in journal:',granularProjectsString)
        this.props.navigation.goBack();
    }

    refreshData = async () => {
        await AsyncStorage.getItem('granularprojects').then(data => {
            if (data !== null) {
                var projectarray = JSON.parse(data);
                this.setState({granularProjects: projectarray});
                console.log('get granular projects :',projectarray);
            }
        });

        await AsyncStorage.getItem('liquidprojects').then(data => {
            if (data !== null) {
                var projectarray = JSON.parse(data);
                console.log('get granular projects :',projectarray);
                this.setState({liquidProjects: projectarray});
            }
        });
    }


    async componentDidMount(): void {
       this.refreshData()
    }


    render() {
        return (
            <View style={styles.container}>

                <View style={styles.title_container}>

                    <View style={styles.setting_header}>
                        <Text
                            style={[styles.setting_title, styles.fontforSubtitle]}>Therapy Journal</Text>
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
                            this.saveBack();
                        }}>
                        <View style={{width: '30%', height: '30%'}}>
                            <Image
                                style={styles.fit_image}
                                source={require('../../assets/images/left.png')}
                            />
                        </View>
                    </TouchableOpacity>
                </View>


                <View style={styles.project_container}>
                    <View style={styles.row_center_container}>
                        <TouchableOpacity
                            style={styles.new_entry_btn}
                            onPress={() => {
                                this.createNewProject(true)
                                // this.goToProjectG(false,{})
                            }}
                        >
                            <Text style={styles.add_new_project_text}>New</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.project_add_button_container}
                            onPress={() => {
                                // this.goToProjectG(false,{})
                            }}>
                            <Text style={styles.add_button}>Granular Projects</Text>
                        </TouchableOpacity>
                    </View>


                    <ScrollView style={{width: '100%', marginTop:10,backgroundColor: Colors.whiteColor}}>
                        {this.state.granularProjects.map((item, i) => (
                            <ListItem
                                containerStyle={styles.project_item}
                                Component={TouchableOpacity}
                                onPress={() => {

                                    if (item != null) {
                                        this.goToProjectG(true,item)
                                    }
                                }}

                                key={i}
                                // title={i + 1 + '.  ' + item.name}
                                rightElement={
                                    <View style={styles.entry_list_btn_container}>
                                        <View style={styles.project_item_title}>
                                            <Text style={styles.fontProjectSubtitle}>{i + 1} . {item.name}</Text>
                                        </View>

                                        <View style={styles.project_item_total_title}>
                                            <Text style={styles.fontProjectSubtitle}> - Total ({item.totalN} - {item.totalP} - {item.totalK})</Text>
                                        </View>

                                        <TouchableOpacity
                                            style={styles.project_item_delete_title}
                                            onPress={async  () => {

                                                var array = this.state.granularProjects;
                                                console.log('select item before', array.length ,item.index);
                                                array.splice(item.index, 1);
                                                array.map((item, i) =>{
                                                    item.index = i;
                                                });
                                                console.log('after delete', array.length);
                                                this.setState({granularProjects: array});
                                                var granularProjectsString = JSON.stringify(array);
                                                await AsyncStorage.setItem('granularprojects', granularProjectsString);

                                            }}>
                                            <View>
                                                <Image style={{width: 30, height: 30, resizeMode: 'contain'}}
                                                       source={require('../../assets/images/trash.png')}
                                                />
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                }
                            />
                        ))}
                    </ScrollView>

                    <View style={styles.row_center_container}>
                        <TouchableOpacity
                            style={styles.new_entry_btn}
                            onPress={() => {
                                this.createNewProject(false)
                                // this.goToProjectL(false,{});
                            }}
                        >
                            <Text style={styles.add_new_project_text}>New</Text>
                        </TouchableOpacity>


                        <TouchableOpacity
                            style={styles.project_add_button_container}
                            onPress={() => {
                                // this.goToProjectL(false,{});
                            }}>
                            <Text style={styles.add_button}>Liquid Projects</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={{width: '100%',marginTop:10, backgroundColor: Colors.whiteColor}}>
                        {this.state.liquidProjects.map((item, i) => (
                            <ListItem
                                containerStyle={styles.project_item}
                                Component={TouchableOpacity}
                                onPress={() => {
                                    if (item != null) {
                                        this.goToProjectL(true,item);
                                    }
                                }}
                                key={i}
                                // title={i + 1 + '.  ' + item.name}
                                rightElement={
                                    <View style={styles.entry_list_btn_container}>
                                        <View style={styles.project_item_title}>
                                            <Text style={styles.fontProjectSubtitle}>{i + 1} . {item.name}</Text>
                                        </View>

                                        <View style={styles.project_item_total_title}>
                                            <Text style={styles.fontProjectSubtitle}> -Total ({item.totalN} - {item.totalP} - {item.totalK})</Text>
                                        </View>
                                        <TouchableOpacity
                                            style={styles.project_item_delete_title}
                                            onPress={ async () => {

                                                var array = this.state.liquidProjects;
                                                console.log('select item', array.length,item.index);
                                                array.splice(item.index, 1);
                                                console.log('after delete', array.length);

                                                array.map((item, i) =>{
                                                    item.index = i;
                                                });

                                                this.setState({liquidProjects: array});

                                                var liquidProjectString = JSON.stringify(array);

                                                await AsyncStorage.setItem('liquidprojects', liquidProjectString);



                                            }}>
                                            <View>
                                                <Image style={{width: 30, height: 30, resizeMode: 'contain'}}
                                                       source={require('../../assets/images/trash.png')}
                                                />
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                }
                            />
                        ))}
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create(JournalStyle);
export default Journal;