import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, PanResponder, Animated, Button, Linking, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { priceDisplay } from '../Util';
import ajax from '../Ajax';

const DealDetails = (props) => {

  const [deal, setDeal] = useState(props.initialDealData);
  const [imageIndex, setImageIndex] = useState(0);
  const [imageXPos, setImageXPos] = useState(0);

  const imagePanderResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gs) => {
      // TODO: imageXPos is being reset after set below. Look further into this.  
      console.log('Moving:  ', gs.dx); 
      setImageXPos(gs.dx);
    },
    onPanResponderRelease: (evt, gs) => {
      console.log('release');
    //   this.width = Dimensions.get('window').width;
    //   if (Math.abs(gs.dx) > this.width * 0.4) {
    //     const direction = Math.sign(gs.dx);
    //     // -1 for left, 1 for right
    //     Animated.timing(imageXPos, {
    //       toValue: direction * this.width,
    //       duration: 250,
    //     }).start(() => this.handleSwipe(-1 * direction));
    //   } else {
    //     Animated.spring(imageXPos, {
    //       toValue: 0
    //     }).start();
    //   }
    }
  });

//   handleSwipe = (indexDirection) => {
//     if (!this.state.deal.media[this.state.imageIndex + indexDirection]) {
//       Animated.spring(this.imageXPos, {
//         toValue: 0
//       }).start();
//       return;
//     }
//     this.setState((prevState) => ({
//       imageIndex: prevState.imageIndex + indexDirection
//     }), () => {
//       // Next image animation
//       this.imageXPos.setValue(indexDirection * this.width);
//       Animated.spring(this.imageXPos, {
//         toValue: 0
//       }).start();
//     });
//   };

  const getDealDetails = async () => {
    const fullDeal = await ajax.fetchDealDetails(deal.key);
    setDeal(fullDeal);
  };
  
  const openDealUrl = () => {
    Linking.openURL(deal.url);
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
        <Animated.Image
          {...imagePanderResponder.panHandlers}
          source={{uri: deal.media[imageIndex]}} 
          style={[{left: imageXPos}, styles.image]}
        />
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
        <Button title="Buy this deal" onPress={openDealUrl}></Button>
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


