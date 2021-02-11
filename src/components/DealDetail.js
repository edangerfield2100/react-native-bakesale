import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { priceDisplay } from '../Util';
import ajax from '../Ajax';

const DealDetails = (props) => {

  const [deal, setDeal] = useState(props.initialDealData);

  const getDealDetails = async () => {
    const fullDeal = await ajax.fetchDealDetails(deal.key);
    setDeal(fullDeal);
  };

  useEffect(() => {
    getDealDetails();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => props.back(null)}>
          <Text style={styles.backLink}>Back</Text>
        </TouchableOpacity>
        <Image source={{uri: deal.media[0]}} style={styles.image}/>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{deal.title}</Text>  
          <Text>{priceDisplay(deal.price)}</Text> 
          <Text>{deal.cause.name}</Text>
        </View>
        {
          deal.user && (
            <View style={styles.avatarContainer}>
              <Image source={{uri: deal.user.avatar}} style={styles.avatar}/>
              <Text>{deal.user.name}</Text>
            </View>
          )
        }
        <View>
          <Text>{deal.description}</Text>
        </View>
      </View>
    </>
  );
};

DealDetails.propTypes = {
  initialDealData: PropTypes.object.isRequired,
  back: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  image: {
    width:  '100%',
    height: 120,
  },
  container: {
    marginTop: 50,
    backgroundColor: 'white',
  },
  textContainer: {
    paddingLeft: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  avatar: {
    width: 60,
    height: 60,
  },
  avatarContainer: {
    marginTop: 25,
  },
  backLink: {
    marginBottom: 5,
    color: 'blue',
  }
});

export default DealDetails;


