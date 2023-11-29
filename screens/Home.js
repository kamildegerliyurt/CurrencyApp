import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View, ImageBackground, } from 'react-native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CurrencyItem } from '../components/';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const Home = () => {
  //--------------------------------------------------------
  const [currencyData, setCurrencyData] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [searchText, setSearchText] = useState('')
  const [filteredCurrencyData, setFilteredCurrencyData] = useState([])
  //--------------------------------------------------------
  useEffect(() => {
    axios.get('https://api.apilayer.com/currency_data/change', {
      headers:{'apikey': process.env.EXPO_PUBLIC_API_KEY}
       }
      )
      .then((res) => {const data = Object.entries(res.data.quotes)
                        setCurrencyData(data)
                        setFilteredCurrencyData(data)
                     })

      .catch((err) => setErrorMessage(err))

  }, []);
  //--------------------------------------------------------
  const handleSearch = (value) => {
    setSearchText(value)

  const filteredData = currencyData.filter(([currencyName]) =>
    currencyName.toLowerCase().includes(value.toLowerCase())
  )

  setFilteredCurrencyData(filteredData)

  }
  //--------------------------------------------------------
  return (
    <ImageBackground style={{flex: 1, resizeMode: 'cover',}}
                        source={require('../assets/trader.jpg')} 
                       >
      <KeyboardAwareScrollView >

        <SafeAreaView style={styles.container}>

          <TextInput style={styles.textInputContainer}
                    placeholder="Search..."
                    placeholderTextColor="gray"
                    onChangeText={handleSearch}
                    value={searchText}
                    />         

          <View style={styles.currencyContainer}>

            <View style={styles.headersContainer}>
              <Text style={styles.currencyText}>Currency</Text>
              <Text style={styles.buyText}>Buy</Text>
              <Text style={styles.sellText}>Sell</Text>
            </View>

            <View style={styles.flatListContainer}>
              <FlatList
                data={filteredCurrencyData}
                showsVerticalScrollIndicator={false}
                alwaysBounceVertical={false}
                snapToAlignment={"start"}
                decelerationRate={"fast"}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                  return (
                            <CurrencyItem data={item} />
                  )
                }}
              />
            </View>
          </View>
        </SafeAreaView>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInputContainer: {
    borderWidth: 0.2,
    borderColor:"white",
    width: '95%',
    marginVertical: 15,
    padding: 10,
    textAlign: 'center',
    borderRadius: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color:"#C4DFDF",
   
  },
  currencyContainer: {
    flex: 5,
    borderWidth: 0.2,
    borderRadius:10,
    borderColor:"#F4EEEE",
    marginVertical:5,
    width:'95%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  headersContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingRight: 30,
    width: '90%',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  currencyText: {
    fontSize: 16,
    fontWeight: 'bold',
    opacity: 0.5,
    color:"white",
  },
  buyText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'green',
  },
  sellText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'red',
  },
  flatListContainer: {
    width: '100%',
    height: 600,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
});

export default Home;
