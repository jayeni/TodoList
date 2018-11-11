/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import TodoList from './components/todolist'
import * as firebase from 'firebase'
import {Item,ListItem,Container,Header,Icon,Button,Text} from 'native-base';

const firebaseConfig = {
  
  apiKey: "AIzaSyAaUJYPzxk1haVdbxORM0a7gddS9TBl2g0",
    authDomain: "todolist-6febb.firebaseapp.com",
    databaseURL: "https://todolist-6febb.firebaseio.com",
    projectId: "todolist-6febb",
    storageBucket: "todolist-6febb.appspot.com"

};
firebase.initializeApp(firebaseConfig);
export default class App extends Component{
  constructor(){
    super()
    this.signoutFacebook  = this.signoutFacebook.bind(this);
  }
  state ={
    login: true,
    userid: '',
    dblist:[],
    db: null,
    maxId: 0

  }
  componentDidMount(){
    firebase.auth().onAuthStateChanged((user)=>{
      if(user != null){
        console.log(user)
        this.setState({
            login: false,
            userid:  firebase.auth().currentUser.uid.toString(),
          
           
            
        });
        let temp = this.state.dblist;
        var max = 0;
        firebase.database().ref(this.state.userid).once('value', snapshot => {
          snapshot.forEach(child =>{
            if(max < child.val().id ){
                max = child.val().id;
            }
            temp.push({id: child.val().id,value: child.val().value});
            this.setState({
              dblist: temp,
              maxId: ++max 
            });
        })})
        
      /* var key = firebase.database(this.state.userid).push().key
       firebase.database().ref(this.state.userid).set({
          id: 2,
          value: '3'
       })*/
      }
    })
  }
 async loginwithFacebook(){
    const {type,token} = await Expo.Facebook.logInWithReadPermissionsAsync('317070958880081',
    {permissions: ['public_profile'] })
    if(type == 'success'){
      const cred = firebase.auth.FacebookAuthProvider.credential(token)

      firebase.auth().signInAndRetrieveDataWithCredential(cred).catch(
        (error)=>{console.log(error)})
       
    }

 }
 signoutFacebook(){
   console.log("logout")

  firebase.auth().signOut();
  this.setState({
    login : true,
    dblist: []
  })
 }
  
  render() {

    var todomenu =  <Container >
              
                       <TodoList style={styles.container}  usid={this.state.userid} dbl = {this.state.dblist} max = {this.state.maxId} signout={()=> this.signoutFacebook()}/>
                    </Container>;
    var loginmenu =  <Container style={styles.container2} >
                      
                 
                     
                      <Text style={styles.welcome}>TodoList</Text>
                   
                     <Button   block style={styles.loginbutton} onPress= {()=>this.loginwithFacebook()}>
                        
                      <Text> Login with facebook</Text>
                      <Icon name='logo-facebook' />
                          </Button>
                          
                      
            
                         
                  </Container>;
    return (
      this.state.login ? loginmenu :todomenu
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
 
 
  },
  container2: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#00bfff',
    justifyContent: 'center',

  },
  welcome: {
    fontSize: 60,
    textAlign: 'center',
    marginBottom: 200,
    fontStyle: "italic",
    color: "white"
    
    
  },
  input: {
    textAlign: 'center',
    marginBottom: 5
  },
  loginbutton:{
    height: 40,
    marginBottom:20,
    alignSelf: 'center'
  }
});
