import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';

import apis from '../Ajax';
import Deallist from './DealList';

const App = () => {
  const [deals, setDeals] = useState([]);

  // Fetch deals and set in state
  const getDeals = async () => {
    const deals = await apis.fetchInitialDeals();
    setDeals(deals);
  };

  useEffect(() => {
    getDeals();
  }, []);

  return (
    <>
      <View style={styles.container}>
        {deals.length > 0 ? (
          <Deallist deals={deals}></Deallist>
        ) : (
          <Text style={styles.header}>BakeSale App</Text>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 40,
  },
});

export default App;
