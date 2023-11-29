import { StyleSheet, Text, View } from 'react-native'
import React from 'react'



const CurrencyItem = (props) => {

const currencyName = props.data[0]
const currencyDetail = props.data[1]
const buyNumbers = (currencyDetail.end_rate).toFixed(2)
const sellNumbers = (currencyDetail.start_rate).toFixed(2)

  return (
    <View style={styles.currencyItemContainer}>
      <Text style={styles.currencyNameText}>{currencyName}</Text>
      <Text style={styles.buyNumberText}>{buyNumbers}</Text>
      <Text style={styles.sellNumbersText}>{sellNumbers}</Text>
    </View>
  )
}

export default CurrencyItem

const styles = StyleSheet.create({
    currencyItemContainer: {
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'transparent',
        borderBottomWidth:0.3,
        borderBottomColor:"white",
        marginVertical:5,
        paddingVertical:10,
        paddingHorizontal:5,
        borderRadius:5,
    },
    currencyNameText: {
        fontSize:15,
        fontWeight:"bold",
        color:"#C4DFDF",
    },
    buyNumberText: {
        color:'green',
    },
    sellNumbersText: {
        color:"red",
    }
})