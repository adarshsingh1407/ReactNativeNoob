import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      movies: []
    }
  }
  componentDidMount() {
    this.getMoviesFromApi();
  }
  async getMoviesFromApi() {
    try {
      let response = await fetch('https://facebook.github.io/react-native/movies.json');
      let responseJson = await response.json();
      this.setState((prevState) => {
        return {
          isLoading: false,
          movies: responseJson.movies
        }
      })
    } catch(error) {
      this.setState((prevState) => {
        return {
          ...prevState,
          isLoading: false
        }
      })
      console.error(error);
    }
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <Text>Loading...</Text>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={{flex: 1, paddingTop: 20}}>
        <FlatList
          data={this.state.movies}
          keyExtractor={(item, index) => index}
          renderItem={({item, index}) => {
            return (
              <Text key={index}>{item.title}, {item.releaseYear}</Text>
            )
          }}
        />
      </View>
    );
  }
}

export default Movies
