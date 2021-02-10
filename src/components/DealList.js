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
            <DealItem deal={item}/>
          }
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#eee',
    flex: 1,
    paddingTop: 50,
    width: '100%'
  }
});

Deallist.propTypes = {
  deals: PropTypes.array.isRequireds
};

export default Deallist;