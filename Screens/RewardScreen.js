import React , {Component} from 'react';
import {View,Text, TextInput, TouchableOpacity, FlatList} from 'react-native';
import {ListItem} from 'react-native-elements';
import MyHeader from '../Component/MyHeader';
import AppHeader from '../Component/AppHeader';
import db from '../config';
import firebase from 'firebase';


export default class RewardScreen extends Component{
    constructor(){
        super();
        this.state={
            reward:'',
            rewardList:[],
            userId:firebase.auth().currentUser.email
        }
        this.rewardRef = null
    }

    addReward=()=>{
        db.collection("rewards").add({
            "reward":this.state.reward,
            "reward_status":"not given"
        })
        this.setState({
            reward:''
        })
    }

    getRewardList = () => {
        this.rewardRef = db
          .collection("rewards")
          .onSnapshot((snapshot) => {
            var rewardList = snapshot.docs.map((doc) => doc.data());
            this.setState({
                rewardList:rewardList,
            });
          });
      };

    keyExtractor = (item, index) => index.toString();

    // //   render Item
      renderItem = ({ item, i }) => {
         return (
           <ListItem
             key={i}
             title={item.rewardList}       
             titleStyle={{ color: "black", fontWeight: "bold" , fontSize:20 }}
             bottomDivider
         />
        );
      };
    //   //   render Item
    

    componentDidMount() {
        this.getRewardList();
      }
   
      componentWillUnmount() {
      this.rewardRef();
      }
   

    render(){
        return(

            <View>
             <View>
                <AppHeader/> 
                <MyHeader title="Rewards"/>
             </View>
                <TextInput placeholder={"What will you reward yourself for completing your tasks ?"} 
                    onChangeText={(text)=>{this.setState({reward:text})}}
                    value={this.state.reward}
                />

                <TouchableOpacity 
                    onPress={()=>{this.addReward(this.state.reward)}}
                >
                    <Text>Submit</Text>
                </TouchableOpacity>

                {this.state.goalList.length===0
            ?(
                <View>

                    <Text>Add your rewards</Text>
                </View>
            )
            :(
               
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.rewardList}
                renderItem={this.renderItem}
              />
                
            )
            }

            </View>
        )
    }

}