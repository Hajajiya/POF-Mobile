
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';

const DetailsScreen = ({route, navigation}) => {
  const {car} = route.params;

  return (
    <View style={styles.container}>

      <StatusBar
        barStyle="light-content"
        backgroundColor="#050505"
      />

      <View style={styles.header}>

        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}>

          <Image
            source={require('../Assets/back.png')}
            style={styles.backIcon}
            resizeMode="contain"
          />

        </TouchableOpacity>

        <TouchableOpacity
          style={styles.favorite}
          activeOpacity={0.8}>

          <Text style={styles.favoriteText}>
            ♡
          </Text>

        </TouchableOpacity>

      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>


        <View style={styles.imageCard}>

          <Image
            source={{uri: car.image}}
            style={styles.carImage}
            resizeMode="contain"
          />

        </View>


        <View style={styles.detailsCard}>

          <Text style={styles.brand}>
            {car.brand}
          </Text>

          <Text style={styles.carName}>
            {car.name}
          </Text>

          <Text style={styles.price}>
            {car.price}
          </Text>

          <TouchableOpacity
            style={styles.locationButton}
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('MapScreen')
            }>

            <Image
              source={require('../Assets/locations.png')}
              style={styles.locationIcon}
              resizeMode="contain"
            />

            <Text style={styles.locationText}>
              Location Tracking
            </Text>

          </TouchableOpacity>


          <Text style={styles.sectionTitle}>
            Specifications
          </Text>

          <View style={styles.featureContainer}>

            <View style={styles.featureBox}>

              <View style={styles.featureHeader}>

                <Image
                  source={require('../Assets/speedometer.png')}
                  style={styles.detailIcon}
                  resizeMode="contain"
                />

                <Text style={styles.featureTitle}>
                  Speed
                </Text>

              </View>

              <Text style={styles.featureValue}>
                {car.topSpeed}
              </Text>

            </View>

            <View style={styles.featureBox}>

              <View style={styles.featureHeader}>

                <Image
                  source={require('../Assets/Fuel.png')}
                  style={styles.detailIcon}
                  resizeMode="contain"
                />

                <Text style={styles.featureTitle}>
                  Fuel
                </Text>

              </View>

              <Text style={styles.featureValue}>
                {car.fuel}
              </Text>

            </View>

          </View>

          <View style={styles.featureContainer}>

            <View style={styles.featureBox}>

              <View style={styles.featureHeader}>

                <Image
                  source={require('../Assets/Gear.png')}
                  style={styles.detailIcon}
                  resizeMode="contain"
                />

                <Text style={styles.featureTitle}>
                  Gear
                </Text>

              </View>

              <Text style={styles.featureValue}>
                {car.transmission}
              </Text>

            </View>

            <View style={styles.featureBox}>

              <View style={styles.featureHeader}>

                <Image
                  source={require('../Assets/seat.png')}
                  style={styles.detailIcon}
                  resizeMode="contain"
                />

                <Text style={styles.featureTitle}>
                  Seats
                </Text>

              </View>

              <Text style={styles.featureValue}>
                {car.seats} Seats
              </Text>

            </View>

          </View>


          <Text style={styles.aboutTitle}>
            About
          </Text>

          <Text style={styles.description}>
            Experience luxury driving with the{' '}
            <Text style={styles.descriptionGold}>
              {car.name}
            </Text>
            . Designed for premium comfort, breathtaking
            performance and cutting-edge technology. Enjoy
            every journey with elegance and confidence.
          </Text>


          <TouchableOpacity
            style={styles.bookButton}
            activeOpacity={0.8}
            onPress={() =>
              alert('Car Booked Successfully!')
            }>

            <Text style={styles.bookText}>
              Book Now
            </Text>

          </TouchableOpacity>

        </View>

      </ScrollView>

    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#050505',
  },

  scrollContent: {
    paddingBottom: 40,
  },

  header: {
    marginTop: 45,
    paddingHorizontal: 20,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    zIndex: 10,
  },

  backButton: {
    width: 42,
    height: 42,

    borderRadius: 21,

    backgroundColor: '#141414',

    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 1,
    borderColor: '#333333',

    elevation: 5,
  },

  backIcon: {
    width: 22,
    height: 22,
    tintColor: '#D4AF37',
  },

  favorite: {
    width: 42,
    height: 42,

    borderRadius: 21,

    backgroundColor: '#141414',

    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 1,
    borderColor: '#333333',

    elevation: 5,
  },

  favoriteText: {
    fontSize: 25,
    color: '#D4AF37',
    lineHeight: 28,
  },


  imageCard: {
    marginHorizontal: 15,
    marginTop: 15,

    height: 280,

    borderRadius: 25,

    backgroundColor: '#0D0D0D',

    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 1,
    borderColor: '#252525',

    overflow: 'hidden',

    elevation: 8,
  },

  carImage: {
    width: '100%',
    height: 250,
  },

  detailsCard: {
    backgroundColor: '#141414',

    marginTop: 15,

    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,

    paddingHorizontal: 25,
    paddingTop: 25,
    paddingBottom: 35,

    minHeight: 600,

    borderTopWidth: 1,
    borderColor: '#292929',
  },

  brand: {
    fontSize: 13,

    color: '#D4AF37',

    fontWeight: '800',

    textTransform: 'uppercase',

    letterSpacing: 1.5,

    marginBottom: 5,
  },


  carName: {
    fontSize: 29,

    fontWeight: '800',

    color: '#FFFFFF',

    marginTop: 2,
  },

  price: {
    fontSize: 27,

    fontWeight: '800',

    color: '#D4AF37',

    marginTop: 12,
  },


  locationButton: {
    marginTop: 15,

    flexDirection: 'row',

    alignItems: 'center',

    alignSelf: 'flex-start',

    backgroundColor: '#202020',

    paddingHorizontal: 14,
    paddingVertical: 10,

    borderRadius: 20,

    borderWidth: 1,
    borderColor: '#333333',
  },

  locationIcon: {
    width: 20,
    height: 20,

    tintColor: '#D4AF37',

    marginRight: 7,
  },

  locationText: {
    fontSize: 14,

    fontWeight: '700',

    color: '#D4AF37',
  },

  sectionTitle: {
    marginTop: 28,

    fontSize: 20,

    fontWeight: '800',

    color: '#FFFFFF',
  },



  featureContainer: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    marginTop: 15,
  },

  featureBox: {
    width: '48%',

    backgroundColor: '#1D1D1D',

    padding: 15,

    borderRadius: 16,

    borderWidth: 1,
    borderColor: '#2D2D2D',
  },

  featureHeader: {
    flexDirection: 'row',

    alignItems: 'center',
  },

  detailIcon: {
    width: 19,
    height: 19,

    marginRight: 7,

    tintColor: '#D4AF37',
  },

  featureTitle: {
    fontSize: 13,

    color: '#999999',

    fontWeight: '600',
  },

  featureValue: {
    marginTop: 9,

    fontWeight: '800',

    fontSize: 17,

    color: '#FFFFFF',
  },


  aboutTitle: {
    marginTop: 28,

    fontSize: 22,

    fontWeight: '800',

    color: '#FFFFFF',
  },

  description: {
    marginTop: 12,

    fontSize: 15,

    color: '#AFAFAF',

    lineHeight: 25,
  },

  descriptionGold: {
    color: '#D4AF37',

    fontWeight: '700',
  },


  bookButton: {
    marginTop: 30,

    backgroundColor: '#D4AF37',

    height: 60,

    borderRadius: 30,

    justifyContent: 'center',
    alignItems: 'center',

    elevation: 7,

    shadowColor: '#D4AF37',

    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.3,

    shadowRadius: 8,
  },

  bookText: {
    color: '#000000',

    fontSize: 19,

    fontWeight: '800',

    letterSpacing: 0.5,
  },
});
