import React from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { Button } from 'react-native-elements';

export default class HomeScreen extends React.Component {
  static navigationOptions= { title:'Home',};

  constructor(props) {
    super(props);
    this.state = {teams: [], id: '', }
  }

  componentDidMount() {
    const url = 'https://statsapi.web.nhl.com/api/v1/teams';
    return fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({teams: responseJson.teams});
    })
    .catch((error) => {
      Alert.alert('error');
    });
  }

  render() {
    const{ navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={{padding:15}}>
          <Text style={{fontFamily:'sans-serif-medium', fontSize: 40, color: 'white'}}><Image source={{uri: 'https://seeklogo.com/images/N/nhl-logo-D867931D9B-seeklogo.com.png'}}
          style={{width: 200, height: 200}} />FactsApp</Text>
        </View>
          <FlatList data={this.state.teams} keyExtractor={item => item.id}
          renderItem={({item}) => <Button onPress={() => navigate('Team', {id: item.id})} title={item.name} />}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },

});
