import React from 'react';
import { StyleSheet, Text, View, FlatList, Image  } from 'react-native';
import { Button } from 'react-native-elements';

export default class TeamScreen extends React.Component {
  static navigationOptions= { title:'Team',};

  constructor(props) {
    super(props);
    this.state = {teamdata: [], id: ''}
  }

  componentDidMount() {
    const { params } = this.props.navigation.state;
    const url = 'https://statsapi.web.nhl.com/api/v1/teams/' + params.id ;
    return fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({teamdata: responseJson.teams,
      id: params.id });
    })
    .catch((error) => {
      Alert.alert('error');
    });
  }


    render() {
        const{ navigate } = this.props.navigation;

        return (
          <View style={styles.container}>
            <View style={{flex: 1, paddingTop: 15}}>
              <Text style={{fontFamily:'sans-serif-medium', fontSize: 40, color: 'white'}}><Image source={{uri: 'https://seeklogo.com/images/N/nhl-logo-D867931D9B-seeklogo.com.png'}}
              style={{width: 200, height: 200}} />FactsApp</Text>
            </View>
            <View style={{flex:2, backgroundColor: 'white', padding: 10, margin: 15}}>
              <FlatList keyExtractor={item => item.id} renderItem={({item}) =>
                <Text style={{fontWeight: 'bold'}}>{item.name} {item.abbreviation}{'\n'}
                Since: {item.firstYearOfPlay}{'\n'}
                Venue: {item.venue.name}, {item.venue.city}{'\n'}
                Division: {item.division.name}{'\n'}
                Conference: {item.conference.name}{'\n'}
                Official site: {item.officialSiteUrl}{'\n'}</Text>}
                data={this.state.teamdata} />
            </View>
            <View style={{flex:2, padding: 15}}>
              <Button onPress={() => navigate('Roster', {id: this.state.id})} title="Roster" />
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
