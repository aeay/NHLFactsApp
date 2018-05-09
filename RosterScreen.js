import React from 'react';
import { StyleSheet, Text, View, FlatList, Image  } from 'react-native';
import { Button } from 'react-native-elements';

export default class RosterScreen extends React.Component {
  static navigationOptions= { title:'Roster',};

  constructor(props) {
    super(props);
    this.state = {roster: [], id: ''}
  }

  componentDidMount() {
    const { params } = this.props.navigation.state;
    const url = 'https://statsapi.web.nhl.com/api/v1/teams/' + params.id + '/roster' ;
    return fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({roster: responseJson.roster});
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
        <Text  style={{fontFamily:'sans-serif-medium', fontSize: 40, color: 'white'}}><Image source={{uri: 'https://seeklogo.com/images/N/nhl-logo-D867931D9B-seeklogo.com.png'}}
        style={{width: 200, height: 200}} />FactsApp</Text>
      </View>
        <FlatList data={this.state.roster} keyExtractor={item => item.person.id}
          renderItem={({item}) => <Button onPress={() => navigate('Player', {id: item.person.id})} title={item.jerseyNumber + '  ' + item.person.fullName} />}
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
