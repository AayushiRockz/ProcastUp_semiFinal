import React , {Component} from 'react';
import {View,Text ,FlatList} from 'react-native';
import MyHeader from '../Component/MyHeader';
import AppHeader from '../Component/AppHeader';
import db from '../config';
import firebase from 'firebase';

export default class WorkDoneScreen extends Component{
    constructor(){
        super();
        this.state={
            workDoneList:[],
            userId:firebase.auth().currentUser.email
        }
    }

    getCompletedGoals=()=>{
        const ref = await db.collection
    }
    keyExtractor = (item, index) => index.toString();

    // //   render Item
      renderItem = ({ item, i }) => {
         return (
           <ListItem
             key={i}
             title={item.workDoneList}       
             titleStyle={{ color: "black", fontWeight: "bold" , fontSize:20 }}
             bottomDivider
         />
        );
      };
    //   //   render Item


    render(){
        return(

            <View>
                <AppHeader/>
                <MyHeader title="Completed Goals"/>

                <View>
                    <FlatList
                        keyExtractor={this.keyExtractor}
                        data={this.state.workDoneList}
                        renderItem={this.renderItem}
                    />
                </View>
            </View>
        )
    }

}