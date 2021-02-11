import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { priceDisplay } from '../Util';

const Dealitem = (props) => {
  const { deal } = props;  

  const handlePress = () => {
    props.onPress(deal.key);
  };

  return (
    <>
      <TouchableOpacity style={styles.container} onPress={handlePress}>
        <Image source={{uri: deal.media[0]}} style={styles.image}/>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{deal.title}</Text>  
          <Text>{priceDisplay(deal.price)}</Text> 
          <Text>{deal.cause.name}</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

Dealitem.propTypes = {
  deal: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  image: {
    width:  '100%',
    height: 150,
  },
  container: {
    borderWidth: 1,
    borderColor: 'black',
    margin: 10,
    backgroundColor: 'white',
  },
  textContainer: {
    paddingLeft: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default Dealitem;


