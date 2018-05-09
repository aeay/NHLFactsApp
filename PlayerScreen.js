import React from 'react';
import { StyleSheet, Text, View, FlatList, Image  } from 'react-native';

export default class PlayerScreen extends React.Component {
  static navigationOptions= { title:'Player',};

  constructor(props) {
    super(props);
    this.state = {playerdata: [], id: '',}
  }

  componentDidMount() {
    const { params } = this.props.navigation.state;
    const url = 'https://statsapi.web.nhl.com/api/v1/people/' + params.id ;
    return fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({playerdata: responseJson.people});
    })
    .catch((error) => {
      Alert.alert('error');
    });
  }

  render() {
  const { params } = this.props.navigation.state;

  return (
    <View style={styles.container}>
      <View style={{padding:15}}>
        <Text  style={{fontFamily:'sans-serif-medium', fontSize: 40, color: 'white'}}><Image source={{uri: 'https://seeklogo.com/images/N/nhl-logo-D867931D9B-seeklogo.com.png'}}
        style={{width: 200, height: 200}} />FactsApp</Text>
      </View>
      <View style={{flex: 2, backgroundColor: 'white', padding: 10, margin: 15, marginBottom: 300}}>
      <FlatList
      keyExtractor={item => item.id}
      renderItem={({item}) =>
      <Text style={{fontWeight: 'bold'}}>{item.fullName}{'\n'}
      Born: {item.birthDate} ({item.birthCity}, {item.birthStateProvince}, {item.birthCountry}){'\n'}
      Nationality: {item.nationality}{'\n'}
      Height: {item.height}{'\n'}
      Weight: {item.weight}{'\n'}
      Position: {item.primaryPosition.name}{'\n'}</Text>}
      data={this.state.playerdata} />
      </View>
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
