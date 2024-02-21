import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import CountryFlag from 'react-native-country-flag';
import Crown from 'react-native-vector-icons/MaterialCommunityIcons';
import Verified from 'react-native-vector-icons/MaterialIcons';
const Card = ({
  imageSource,
  title,
  price,
  unit,
  buy,
  sell,
  img,
  isVerified,
  onPress,
  countryCode,
  currencySymbol,
}) => {
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      <View style={styles.mini}>
        <Image source={{uri: img}} style={styles.image} />
        <View style={styles.minicontainer}>
          <Text style={{fontWeight: 400, color: 'purple'}}>
            {buy ? 'B' : sell ? 'S' : ''}
          </Text>
        </View>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.infoContainer}>
          <Text
            style={styles.price}>{`${currencySymbol} ${price} / ${unit}`}</Text>
          <Crown name="crown-circle" size={20} />
          {isVerified == 1 && <Verified name="verified" size={19} />}
          {countryCode && (
            <CountryFlag
              isoCode={countryCode.toLowerCase()}
              size={13}
              style={{marginTop: 3}}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const windowWidth = Dimensions.get('window').width;
const cardWidth = (windowWidth - 35) / 2;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'column',
    marginStart: 8,
    marginTop: 8,
    margin: 8,
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
  },
  mini: {position: 'relative'},
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 10,
  },
  minicontainer: {
    position: 'absolute',
    backgroundColor: '#ffece0',
    right: 10,
    top: 10,
    fontSize: 14,
    padding: 3,
    borderRadius: 4,
    paddingHorizontal: 7,
  },
  cardContent: {
    padding: 8,
    flex: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  price: {
    flex: 2,
    fontSize: 17,
    color: 'purple',
  },
});

export default Card;
