import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';

import apis from '../Ajax';
import DealDetails from './DealDetail';
import Deallist from './DealList';
import Searchbar from './SearchBar';

const App = () => {
  const [deals, setDeals] = useState([]);
  const [currentDealId, setCurrentDealId] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  // Fetch deals and set in state
  const getDeals = async () => {
    const deals = await apis.fetchInitialDeals();
    setDeals(deals);
  };

  const setDealId = (dealId) => {
    setCurrentDealId(dealId);
  };

  const currentDeal = (dealId) => {
    return deals.find((deal) => deal.key === dealId);
  };

  const searchDeals = async (searchTerm) => {
    if (searchTerm) {
      const results = await apis.fetchDealsSearchResults(searchTerm);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  useEffect(() => {
    getDeals();
  }, []);


  if (currentDealId) {
    return ( 
      <DealDetails back={setDealId} initialDealData={currentDeal(currentDealId)}></DealDetails> 
    );
  }
  const dealsToDisplay = searchResults.length > 0 ? searchResults : deals;
  if (dealsToDisplay.length > 0 ) {
    return (
      <View style={styles.main}>
        <Searchbar searchDeals={searchDeals}></Searchbar>  
        <Deallist deals={dealsToDisplay} onItemPress={setDealId}></Deallist>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>BakeSale App</Text>
    </View>
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
  main: {
    marginTop: 30,
  }
});

export default App;
