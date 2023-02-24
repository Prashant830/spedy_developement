import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView,Button ,NativeModules} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';

export default function Store() {
const makePayment = () => {
  var options = {
    description: 'make payment to spedy',
    image: 'https://i.imgur.com/3g7nmJC.png',
    currency: 'INR',
    key: 'rzp_test_RTjVLXVD1MR3Rh', // Your api key
    amount: '5000',
    name: 'Spedy',
    prefill: {
      
    },
    theme: {color: '#F37254'}
  }
  RazorpayCheckout.open(options).then((data) => {
    // handle success
    alert(`Success: ${data.razorpay_payment_id}`);
  }).catch((error) => {
    // handle failure
    alert(`Error: ${error.code} | ${error.description}`);
  });
}



  return (
    <SafeAreaView style={styles.container}>
      <Button onPress={makePayment}
      title='Click here'>
        </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});