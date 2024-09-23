import { StyleSheet, Text, View, TextInput, FlatList, Button, Picker } from 'react-native';
import { BarChart } from "react-native-chart-kit";
import { useState } from 'react';

export default function App() {

  const [transactions, setTransactions] = useState([]);
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('Cuenta 1');

  const addTransaction = () => {
    setTransactions([...transactions, {text, amount: parseFloat(amount), id: Math.random().toString, account: selectedAccount}])
    setText('');
    setAmount('');
  }

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.title}>Expense Tracker</Text>
        <Picker
          selectedValue = {selectedAccount}
          style = {styles.picker}
          onValueChange = {(itemValue) => setSelectedAccount(itemValue)}
        >
          <Picker.Item label = "Cuenta 1" value = "Cuenta 1" />
          <Picker.Item label = "Cuenta 2" value = "Cuenta 2" />
          <Picker.Item label = "Cuenta 3" value = "Cuenta 3" />
        </Picker>
      </View>

      <View style={styles.content}>
        <View style={styles.charts}>
        <Text style={styles.sectionTitle}>Estadisticas</Text>
          <BarChart
            data={{
              labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
              datasets: [{ data: [20, 45, 28, 80, 99, 43, 50, 100, 20, 45, 28, 80]}]
            }}
            width = {600}
            height={500}
            chartConfig = {{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#fb8c00",
              backgroundGradientTo: "#ffa726",
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {borderRqdius: 16}
            }}
            style = {{marginVertical: 8, borderRadius: 16}}
            />

        </View>

        <View style={styles.transactions}>
          <Text style={styles.sectionTitle}>Transactions</Text>
          <FlatList
            data = {transactions}
            renderItem = {({item}) => (
              <View style={styles.transactions}>
                <Text style={styles.transactionText}>{item.text} - {item.account}</Text>
                <Text style={styles.transactionText}>${item.amount.toFixed(2)}</Text>
              </View>
            )}
            keyExtractor = {item => item.id}
          />

          <TextInput 
            style = {styles.input}
            placeholder = "Nombre del gasto"
            value = {text}
            onChangeText = {setText}
          />

          <TextInput
            style = {styles.input}
            placeholder = "Cantidad"
            value = {amount}
            onChangeText = {setAmount}
          />

          <Button title="Añadir Gasto" onPress={addTransaction}/>

        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: 'rgb(19, 19, 19)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'rgb(19, 19, 19)',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  picker: {
    height: 50,
    width: 150,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  charts: {
    flex: 1,
    marginRight: 10,
  },
  transactions: {
    flex: 1,
    marginLeft: 10,
    color: 'rgb(255, 255, 255)',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'rgb(255, 255, 255)',
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 10,
    color: 'rgb(255, 255, 255)',
  },
  transaction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  transactionText: {
    color: 'rgb(255, 255, 255)',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    color: 'rgb(255, 255, 255)',
  },
});