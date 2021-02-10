import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import PropTypes from 'prop-types';

const Dealitem = (props) => {
  return (
    <>
      <View>
        <Image source={{uri: props.deal.media[0]}} style={styles.image}/>
        <Text>{props.deal.title}</Text>  
      </View>
    </>
  );
};

Dealitem.propTypes = {
  deal: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  image: {
    width:  '100%',
    height: 150,
  }
});

export default Dealitem;


