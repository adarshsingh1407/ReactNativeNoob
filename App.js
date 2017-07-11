import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput,
  FlatList,
  Alert,
  Platform
} from 'react-native';
import Greeting from './components/Greeting';
import Movies from './components/Movies';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eatable: '',
      eatables: ['Chips', 'Butter', 'Honey', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
    };
  }
  _addEatables() {
    if (this.state.eatable.length < 1) {
      Alert.alert('Pls give an eatable to add');
      return false;
    }
    this.setState((prevState) => {
      return {
        eatable: '',
        eatables: [
          ...prevState.eatables,
          this.state.eatable
        ]
      }
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          <Greeting name="Adarsh"/>{'\n'}
          Welcome to React Native!!!{'\n'}
          You are on {Platform.OS}
        </Text>
        <TouchableHighlight onPress={this._addEatables.bind(this)} underlayColor="white">
          <View style={styles.button}>
            <Text style={styles.buttonText}>Add Eatable</Text>
          </View>
        </TouchableHighlight>
        <TextInput style={{
          height: 40,
          textAlign: 'center',
        }} value={this.state.eatable} returnKeyType="done" onSubmitEditing={this._addEatables.bind(this)} placeholder="What do you like to eat?" onChangeText={(eatable) => this.setState({eatable})}/>
        <FlatList data={this.state.eatables} keyExtractor={(item, index) => item + '-' + index} renderItem={({item, index}) => {
          return (
            <Text key={index} style={styles.item}>{item}</Text>
          )
        }}/>
        <Movies/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4db6ac'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  },
  item: {
    fontSize: 18,
    height: 44,
    flex:1
  }
});

export default App
