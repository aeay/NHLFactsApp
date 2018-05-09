import React from 'react';
import { StyleSheet, Text, View, FlatList, } from 'react-native';
import { StackNavigator } from 'react-navigation';
import HomeScreen from './HomeScreen';
import TeamScreen from './TeamScreen';
import RosterScreen from './RosterScreen';
import PlayerScreen from './PlayerScreen';

const NHLStatsApp = StackNavigator({
      Home: { screen: HomeScreen },
      Team: { screen: TeamScreen },
      Roster: { screen: RosterScreen },
      Player: { screen: PlayerScreen }
    });

  export default NHLStatsApp;
