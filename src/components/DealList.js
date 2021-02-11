import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import PropTypes from 'prop-types';
import DealItem from './DealItem';

const Deallist = (props) => {
  return (
    <>
      <View style={styles.list}>
        <FlatList
          data={props.deals}
          renderItem={({item}) => 
            <DealItem deal={item} onPress={props.onItemPress}/>
          }
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#eee',
    width: '100%'
  }
});

Deallist.propTypes = {
  deals: PropTypes.array.isRequired,
  onItemPress: PropTypes.func.isRequired,
};

export default Deallist;