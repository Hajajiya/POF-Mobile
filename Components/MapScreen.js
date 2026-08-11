
import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
  Text,
} from 'react-native';

import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

const MapScreen = ({navigation}) => {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#000000"
      />

      <View style={styles.container}>


        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          showsUserLocation={true}
          showsMyLocationButton={true}
          followsUserLocation={true}
          initialRegion={{
            latitude: 25.2048,
            longitude: 55.2708,
            latitudeDelta: 0.08,
            longitudeDelta: 0.08,
          }}>

          {/* POF Rental Dubai Location */}
          <Marker
            coordinate={{
              latitude: 25.2048,
              longitude: 55.2708,
            }}
            title="POF Rental"
            description="Luxury & Supercar Rental in Dubai, UAE">

            <View style={styles.markerContainer}>
              <View style={styles.markerCircle}>
                <Text style={styles.markerText}>
                  POF
                </Text>
              </View>

              <View style={styles.markerTriangle} />
            </View>

          </Marker>

        </MapView>


        <View style={styles.topCard}>

          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>
              POF
            </Text>
          </View>

          <View style={styles.headerTextContainer}>

            <Text style={styles.title}>
              POF Rental
            </Text>

            <Text style={styles.subtitle}>
              Luxury & Supercar Rental
            </Text>

            <View style={styles.locationRow}>

              <Image
                source={require('../Assets/locations.png')}
                style={styles.locationIcon}
              />

              <Text style={styles.locationText}>
                Dubai, UAE
              </Text>

            </View>

          </View>

        </View>


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


        <View style={styles.bottomCard}>

          <View style={styles.goldLine} />

          <Text style={styles.bottomTitle}>
            POF Rental
          </Text>

          <Text style={styles.bottomSubtitle}>
            Luxury & Supercar Rental in Dubai, UAE
          </Text>

          <Text style={styles.address}>
            Experience premium mobility with our
            collection of luxury, sports, exotic and
            supercars.
          </Text>

        </View>

      </View>
    </>
  );
};

export default MapScreen;

const styles = StyleSheet.create({

  /* =========================
     MAIN
  ========================= */

  container: {
    flex: 1,
    backgroundColor: '#050505',
  },

  map: {
    flex: 1,
  },

  /* =========================
     TOP CARD
  ========================= */

  topCard: {
    position: 'absolute',

    top: 55,
    left: 65,
    right: 20,

    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: 'rgba(10,10,10,0.94)',

    paddingHorizontal: 14,
    paddingVertical: 12,

    borderRadius: 16,

    borderWidth: 1,
    borderColor: '#D4AF37',

    elevation: 8,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },

  logoCircle: {
    width: 48,
    height: 48,

    borderRadius: 24,

    backgroundColor: '#D4AF37',

    justifyContent: 'center',
    alignItems: 'center',

    marginRight: 12,
  },

  logoText: {
    color: '#000000',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1,
  },

  headerTextContainer: {
    flex: 1,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },

  subtitle: {
    color: '#D4AF37',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },

  locationIcon: {
    width: 15,
    height: 15,
    tintColor: '#D4AF37',
    marginRight: 5,
  },

  locationText: {
    color: '#B8B8B8',
    fontSize: 11,
    fontWeight: '600',
  },

  /* =========================
     BACK BUTTON
  ========================= */

  backButton: {
    position: 'absolute',

    top: 60,
    left: 15,

    width: 45,
    height: 45,

    borderRadius: 23,

    backgroundColor: '#141414',

    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 1,
    borderColor: '#D4AF37',

    elevation: 8,
  },

  backIcon: {
    width: 22,
    height: 22,

    tintColor: '#D4AF37',
  },

  /* =========================
     MAP MARKER
  ========================= */

  markerContainer: {
    alignItems: 'center',
  },

  markerCircle: {
    width: 48,
    height: 48,

    borderRadius: 24,

    backgroundColor: '#D4AF37',

    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 3,
    borderColor: '#000000',

    elevation: 8,
  },

  markerText: {
    color: '#000000',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1,
  },

  markerTriangle: {
    width: 0,
    height: 0,

    borderLeftWidth: 7,
    borderRightWidth: 7,
    borderTopWidth: 12,

    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#D4AF37',

    marginTop: -2,
  },

  /* =========================
     BOTTOM CARD
  ========================= */

  bottomCard: {
    position: 'absolute',

    left: 15,
    right: 15,
    bottom: 25,

    backgroundColor: 'rgba(10,10,10,0.95)',

    borderRadius: 20,

    padding: 20,

    borderWidth: 1,
    borderColor: '#292929',

    elevation: 10,
  },

  goldLine: {
    width: 45,
    height: 4,

    borderRadius: 2,

    backgroundColor: '#D4AF37',

    marginBottom: 12,
  },

  bottomTitle: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: '800',
  },

  bottomSubtitle: {
    color: '#D4AF37',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 4,
  },

  address: {
    color: '#AFAFAF',
    fontSize: 13,
    lineHeight: 20,
    marginTop: 9,
  },
});

