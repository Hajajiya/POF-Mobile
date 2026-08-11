
import React, {useState, useCallback} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  FlatList,
  Image,
  TextInput,
  StatusBar,
  BackHandler,
} from 'react-native';

import {signOut} from 'firebase/auth';
import auth from '../Services/FirebaseAuth';
import {useFocusEffect} from '@react-navigation/native';

const cars = [
  {
    id: '1',
    name: 'BMW M4 Competition',
    brand: 'BMW',
    price: '$180/day',
    seats: 4,
    transmission: 'Automatic',
    fuel: 'Petrol',
    color: 'Black',
    engine: '3.0L Twin Turbo',
    topSpeed: '290 km/h',
    image:
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
  },
  {
    id: '2',
    name: 'BMW M5 CS',
    brand: 'BMW',
    price: '$220/day',
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Petrol',
    color: 'Grey',
    engine: '4.4L V8 Twin Turbo',
    topSpeed: '305 km/h',
    image:
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800',
  },
  {
    id: '3',
    name: 'Mercedes AMG GT',
    brand: 'Mercedes',
    price: '$250/day',
    seats: 2,
    transmission: 'Automatic',
    fuel: 'Petrol',
    color: 'Yellow',
    engine: '4.0L V8',
    topSpeed: '315 km/h',
    image:
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800',
  },
  {
    id: '4',
    name: 'Mercedes G63 AMG',
    brand: 'Mercedes',
    price: '$350/day',
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Petrol',
    color: 'Black',
    engine: '4.0L V8 Biturbo',
    topSpeed: '240 km/h',
    image:
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&auto=format&fit=crop&q=80',
  },
  {
    id: '5',
    name: 'Audi R8',
    brand: 'Audi',
    price: '$280/day',
    seats: 2,
    transmission: 'Automatic',
    fuel: 'Petrol',
    color: 'White',
    engine: '5.2L V10',
    topSpeed: '330 km/h',
    image:
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800',
  },
  {
    id: '6',
    name: 'Audi RS7',
    brand: 'Audi',
    price: '$230/day',
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Petrol',
    color: 'Blue',
    engine: '4.0L V8',
    topSpeed: '305 km/h',
    image:
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800',
  },
  {
    id: '7',
    name: 'Porsche 911 Turbo S',
    brand: 'Porsche',
    price: '$400/day',
    seats: 4,
    transmission: 'Automatic',
    fuel: 'Petrol',
    color: 'Silver',
    engine: '3.8L Twin Turbo',
    topSpeed: '330 km/h',
    image:
      'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=800',
  },
  {
    id: '8',
    name: 'Porsche Taycan Turbo',
    brand: 'Porsche',
    price: '$300/day',
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Electric',
    color: 'White',
    engine: 'Electric',
    topSpeed: '260 km/h',
    image:
      'https://images.unsplash.com/photo-1494905998402-395d579af36f?w=800',
  },
  {
    id: '9',
    name: 'Lamborghini Huracan EVO',
    brand: 'Lamborghini',
    price: '$600/day',
    seats: 2,
    transmission: 'Automatic',
    fuel: 'Petrol',
    color: 'Orange',
    engine: '5.2L V10',
    topSpeed: '325 km/h',
    image:
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800',
  },
  {
    id: '10',
    name: 'Lamborghini Urus',
    brand: 'Lamborghini',
    price: '$550/day',
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Petrol',
    color: 'Yellow',
    engine: '4.0L V8 Twin Turbo',
    topSpeed: '305 km/h',
    image:
      'https://images.unsplash.com/photo-1502161254066-6c74afbf07aa?w=800',
  },
  {
    id: '11',
    name: 'Ferrari SF90 Stradale',
    brand: 'Ferrari',
    price: '$750/day',
    seats: 2,
    transmission: 'Automatic',
    fuel: 'Hybrid',
    color: 'Red',
    engine: '4.0L V8 Hybrid',
    topSpeed: '340 km/h',
    image:
      'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=800',
  },
  {
    id: '12',
    name: 'Ferrari Roma',
    brand: 'Ferrari',
    price: '$650/day',
    seats: 4,
    transmission: 'Automatic',
    fuel: 'Petrol',
    color: 'Red',
    engine: '3.9L Twin Turbo V8',
    topSpeed: '320 km/h',
    image:
      'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800',
  },
  {
    id: '13',
    name: 'McLaren 720S',
    brand: 'McLaren',
    price: '$700/day',
    seats: 2,
    transmission: 'Automatic',
    fuel: 'Petrol',
    color: 'Orange',
    engine: '4.0L Twin Turbo V8',
    topSpeed: '341 km/h',
    image:
      'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=800',
  },
  {
    id: '14',
    name: 'Rolls Royce Phantom',
    brand: 'Rolls Royce',
    price: '$900/day',
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Petrol',
    color: 'Black',
    engine: '6.75L V12',
    topSpeed: '250 km/h',
    image:
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800',
  },
  {
    id: '15',
    name: 'Bentley Continental GT',
    brand: 'Bentley',
    price: '$500/day',
    seats: 4,
    transmission: 'Automatic',
    fuel: 'Petrol',
    color: 'Green',
    engine: '6.0L W12',
    topSpeed: '333 km/h',
    image:
      'https://images.unsplash.com/photo-1493238792000-8113da705763?w=800',
  },
  {
    id: '16',
    name: 'Tesla Model S Plaid',
    brand: 'Tesla',
    price: '$240/day',
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Electric',
    color: 'White',
    engine: 'Electric',
    topSpeed: '322 km/h',
    image:
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800',
  },
  {
    id: '17',
    name: 'Range Rover Autobiography',
    brand: 'Land Rover',
    price: '$380/day',
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Diesel',
    color: 'Black',
    engine: '3.0L Diesel',
    topSpeed: '234 km/h',
    image:
      'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=800',
  },
  {
    id: '18',
    name: 'Jaguar F-Type',
    brand: 'Jaguar',
    price: '$260/day',
    seats: 2,
    transmission: 'Automatic',
    fuel: 'Petrol',
    color: 'Blue',
    engine: '5.0L V8',
    topSpeed: '300 km/h',
    image:
      'https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=800',
  },
  {
    id: '19',
    name: 'Maserati MC20',
    brand: 'Maserati',
    price: '$580/day',
    seats: 2,
    transmission: 'Automatic',
    fuel: 'Petrol',
    color: 'White',
    engine: '3.0L Twin Turbo V6',
    topSpeed: '325 km/h',
    image:
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&auto=format&fit=crop&q=80',
  },
  {
    id: '20',
    name: 'Chevrolet Corvette C8',
    brand: 'Chevrolet',
    price: '$320/day',
    seats: 2,
    transmission: 'Automatic',
    fuel: 'Petrol',
    color: 'Red',
    engine: '6.2L V8',
    topSpeed: '312 km/h',
    image:
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800',
  },
];

const brandLogos = {
  All: require('../Assets/Brand/all.png'),
  BMW: require('../Assets/Brand/bmw.png'),
  Mercedes: require('../Assets/Brand/mercedes.png'),
  Audi: require('../Assets/Brand/audi.png'),
  Porsche: require('../Assets/Brand/porsche.png'),
  Lamborghini: require('../Assets/Brand/lamborghini.png'),
  Ferrari: require('../Assets/Brand/ferrari.png'),
  McLaren: require('../Assets/Brand/mclaren.png'),
  'Rolls Royce': require('../Assets/Brand/rolls.png'),
  Bentley: require('../Assets/Brand/bentley.png'),
  Tesla: require('../Assets/Brand/tesla.png'),
  'Land Rover': require('../Assets/Brand/porsche.png'),
  Jaguar: require('../Assets/Brand/jaguar.png'),
  Maserati: require('../Assets/Brand/maserati.png'),
  Chevrolet: require('../Assets/Brand/chevrolet.png'),
};

const HomeScreen = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('All');

  useFocusEffect(
    useCallback(() => {
      const backAction = () => true;

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => subscription.remove();
    }, []),
  );

  const brands = ['All', ...new Set(cars.map(car => car.brand))];

  const filteredCars = cars.filter(car => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      car.name.toLowerCase().includes(searchText) ||
      car.brand.toLowerCase().includes(searchText);

    const matchesBrand =
      selectedBrand === 'All' ||
      car.brand === selectedBrand;

    return matchesSearch && matchesBrand;
  });

  const handleLogout = async () => {
    try {
      await signOut(auth);

      Alert.alert('Success', 'Logged Out');

      // navigation?.replace('Login');
    } catch (error) {
      Alert.alert('Logout Error', error.message);
    }
  };

  const renderCar = ({item}) => (
    <TouchableOpacity
      activeOpacity={0.92}
      style={styles.card}
      onPress={() =>
        navigation.navigate('DetailsScreen', {car: item})
      }>

      <View style={styles.leftContainer}>

        <Text style={styles.brand}>
          {item.brand}
        </Text>

        <Text
          style={styles.name}
          numberOfLines={2}>
          {item.name}
        </Text>

        <View style={styles.detailsRow}>

          <View style={styles.detailItem}>
            <Image
              source={require('../Assets/seat.png')}
              style={styles.detailIcon}
              resizeMode="contain"
            />

            <Text style={styles.detailText}>
              {item.seats} Seats
            </Text>
          </View>

          <View style={styles.detailItem}>
            <Image
              source={require('../Assets/speedometer.png')}
              style={styles.detailIcon}
              resizeMode="contain"
            />

            <Text style={styles.detailText}>
              {item.topSpeed}
            </Text>
          </View>

        </View>

        <Text style={styles.price}>
          {item.price}
        </Text>

        <TouchableOpacity
          style={styles.bookButton}
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate('DetailsScreen', {
              car: item,
            })
          }>

          <Text style={styles.bookText}>
            Book Now
          </Text>

        </TouchableOpacity>

      </View>

      <View style={styles.rightContainer}>

        <Image
          source={{uri: item.image}}
          style={styles.carImage}
          resizeMode="contain"
        />

        <TouchableOpacity
          style={styles.favorite}
          activeOpacity={0.7}>

          <Text style={styles.favoriteText}>
            ♡
          </Text>

        </TouchableOpacity>

      </View>

    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>

      <StatusBar
        barStyle="light-content"
        backgroundColor="#050505"
      />

      {/* Header */}
      <View style={styles.header}>

        <View>
          <Image
            source={require('../Assets/AppLogo.png')}
            style={styles.AppLogo}
            resizeMode="contain"
          />

          <Text style={styles.title}>
            Luxury Cars
          </Text>
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          activeOpacity={0.8}
          onPress={handleLogout}>

          <Image
            source={require('../Assets/logout.png')}
            style={styles.logoutIcon}
            resizeMode="contain"
          />

          <Text style={styles.logoutText}>
            Logout
          </Text>

        </TouchableOpacity>

      </View>

      {/* Search */}
      <View style={styles.searchContainer}>

        <Text style={styles.searchIcon}>
          ⌕
        </Text>

        <TextInput
          placeholder="Search luxury cars..."
          placeholderTextColor="#777"
          value={search}
          onChangeText={setSearch}
          style={styles.searchBar}
        />

      </View>

      {/* Brands */}
      <View style={styles.brandSection}>

        <Text style={styles.sectionTitle}>
          Brands
        </Text>

        <FlatList
          data={brands}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item}
          contentContainerStyle={styles.brandList}
          renderItem={({item}) => {

            const isSelected =
              selectedBrand === item;

            return (
              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  styles.brandCircle,
                  isSelected &&
                    styles.selectedBrandCircle,
                ]}
                onPress={() =>
                  setSelectedBrand(item)
                }>

                <Image
                  source={brandLogos[item]}
                  style={[
                    styles.brandLogo,
                    {
                      tintColor: isSelected
                        ? '#000000'
                        : '#D4AF37',
                    },
                  ]}
                  resizeMode="contain"
                />

                <Text
                  style={[
                    styles.brandText,
                    isSelected &&
                      styles.selectedBrandText,
                  ]}>

                  {item}

                </Text>

              </TouchableOpacity>
            );
          }}
        />

      </View>

      {/* Cars */}
      <FlatList
        data={filteredCars}
        keyExtractor={item => item.id}
        renderItem={renderCar}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.carList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>
              No Cars Found
            </Text>

            <Text style={styles.emptyText}>
              Try another car or brand.
            </Text>
          </View>
        }
      />

    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#050505',
    paddingTop: 50,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    marginBottom: 18,
  },

  smallTitle: {
    color: '#D4AF37',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 3,
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D4AF37',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 10,
    elevation: 5,
  },

  logoutIcon: {
    width: 15,
    height: 15,
    marginRight: 6,
    tintColor: '#000000',
  },
    AppLogo: {
    width: 65,
    height: 55,
    marginRight: 6,
  },

  logoutText: {
    color: '#000000',
    fontSize: 13,
    fontWeight: '800',
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 18,
    height: 52,
    backgroundColor: '#141414',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#292929',
    paddingHorizontal: 14,
    marginBottom: 22,
  },

  searchIcon: {
    color: '#D4AF37',
    fontSize: 25,
    marginRight: 8,
  },

  searchBar: {
    flex: 1,
    height: 50,
    color: '#FFFFFF',
    fontSize: 15,
  },

  brandSection: {
    marginBottom: 8,
  },

  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    paddingHorizontal: 18,
    marginBottom: 10,
  },

  brandList: {
    paddingHorizontal: 12,
    paddingBottom: 12,
  },

  brandCircle: {
    width: 86,
    height: 86,
    borderRadius: 14,

    backgroundColor: '#141414',

    justifyContent: 'center',
    alignItems: 'center',

    marginHorizontal: 5,

    borderWidth: 1,
    borderColor: '#2C2C2C',

    elevation: 4,
  },

  selectedBrandCircle: {
    backgroundColor: '#D4AF37',
    borderColor: '#E6C35C',

    elevation: 7,
  },

  brandLogo: {
    width: 34,
    height: 34,
    marginBottom: 5,
  },

  brandText: {
    fontSize: 9,
    fontWeight: '600',
    color: '#B8B8B8',
    textAlign: 'center',
  },

  selectedBrandText: {
    color: '#000000',
    fontWeight: '800',
  },

  carList: {
    paddingHorizontal: 15,
    paddingTop: 8,
    paddingBottom: 100,
  },

  card: {
    flexDirection: 'row',

    backgroundColor: '#141414',

    borderRadius: 20,

    padding: 15,

    marginBottom: 16,

    borderWidth: 1,
    borderColor: '#292929',

    minHeight: 175,

    elevation: 5,
  },

  leftContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingRight: 8,
  },

  rightContainer: {
    width: 145,
    height: 145,

    borderRadius: 18,

    backgroundColor: '#0D0D0D',

    justifyContent: 'center',
    alignItems: 'center',

    overflow: 'hidden',
  },

  carImage: {
    width: 155,
    height: 110,
  },

  brand: {
    fontSize: 12,
    color: '#D4AF37',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },

  name: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 4,
    marginBottom: 9,
  },

  detailsRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },

  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: '#202020',

    paddingHorizontal: 8,
    paddingVertical: 6,

    borderRadius: 8,

    marginRight: 6,
  },

  detailIcon: {
    width: 16,
    height: 16,
    marginRight: 4,
    tintColor: '#D4AF37',
  },

  detailText: {
    fontSize: 10,
    color: '#D0D0D0',
    fontWeight: '600',
  },

  price: {
    fontSize: 20,
    fontWeight: '800',
    color: '#D4AF37',
    marginBottom: 9,
  },

  bookButton: {
    backgroundColor: '#D4AF37',

    paddingVertical: 9,
    paddingHorizontal: 16,

    borderRadius: 9,

    alignSelf: 'flex-start',

    elevation: 5,
  },

  bookText: {
    color: '#000000',
    fontSize: 13,
    fontWeight: '800',
  },


  favorite: {
    position: 'absolute',

    top: 8,
    right: 8,

    width: 32,
    height: 32,

    borderRadius: 16,

    backgroundColor: 'rgba(0,0,0,0.7)',

    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 1,
    borderColor: '#333333',
  },

  favoriteText: {
    fontSize: 21,
    color: '#D4AF37',
    lineHeight: 23,
  },

  emptyContainer: {
    alignItems: 'center',
    paddingTop: 60,
  },

  emptyTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },

  emptyText: {
    color: '#777777',
    fontSize: 14,
    marginTop: 8,
  },
});
