import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
export default class App extends Component {
  constructor() {
    super();
    this.operations = ['DELL', '+', '-', '*', '/'];
    this.state = {
      resultText: "", // bien chua ket qua nhap lieu
      calculationText: "", // bien chua ket qua tinh toan
    };
  }
  // viet cac ham
  // xu ly ham 1
  _onPressButton(text) { // ham xu ly su kien khi press
    console.log(text);
    if (text == "=") // khi click vao dau bang thi tra ve ket qua
    {
      return this.calculationResult(this.state.resultText)
    }
    // cap nhat lai ket qua nhap lieu
    this.setState({
      resultText: this.state.resultText + text
    });
  }
  // ham phu
  calculationResult() {
    const text = this.state.resultText;
    this.setState({
      calculationText: eval(text),
    })
  }
  // xu ly ham 2
  operate(operation) // ham dieu khien tinh toan
  {
    switch (operation) {
      case 'DELL': // click de xoa
        console.log(this.state.resultText);
        let text = this.state.resultText.split(''); // tach roi cac thanh phan text
        text.pop(); // bo ra mot phan tu ben phai
        this.setState({
          resultText: text.join('')
        });
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        this.setState({
          resultText: this.state.resultText+operation // them phep tinh vao ket qua
        })
    }
  }
  render() {
    let rows = [];
    let nums = [[1, 2, 3], [4, 5, 6], [7, 8, 9], ['.', 0, '=']];
    for (let i = 0; i < 4; i++) {
      let row = [];
      for (let j = 0; j < 3; j++) {
        row.push(
          <TouchableOpacity
            key={nums[i][j]}
            style={styles.btn}
            onPress={() => this._onPressButton(nums[i][j])}
          >
            <Text style={styles.btnText}>{nums[i][j]}</Text>
          </TouchableOpacity>
        );
      }
      rows.push(<View key={i} style={styles.row}>{row}</View>)
    }
    ////ops
    let ops = [];
    for (let i = 0; i < 5; i++) {
      ops.push(
        <TouchableOpacity
          style={styles.btn}
          key={this.operations[i]}
          onPress={() => this.operate(this.operations[i])}
        >
          <Text style={styles.btnText}>{this.operations[i]}</Text>
        </TouchableOpacity>
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.result}>
          <Text style={styles.resultText}>
            {this.state.resultText}
          </Text>
        </View>
        <View style={styles.calculation}>
          <Text style={styles.calculationText}>
            {this.state.calculationText}
          </Text>
        </View>
        <View style={styles.buttons}>
          <View style={styles.numbers}>{rows}</View>
          <View style={styles.operations}>{ops}</View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  result: {
    flex: 2,
    backgroundColor: '#D3D3D3',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  calculation: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  buttons: {
    flex: 7,
    flexDirection: 'row',
  },
  numbers: {
    flex: 3,
    backgroundColor: '#D3D3D3',
    justifyContent: 'space-around',
    alignItems: 'stretch',
  },
  operations: {
    flex: 1,
    backgroundColor: '#4682B4',
    justifyContent: 'space-around',
    alignItems: 'stretch',
  },
  resultText: {
    fontSize: 30,
    paddingRight: 10,
    color: 'black',
  },
  calculationText: {
    fontSize: 30,
    paddingRight: 10,
    color: 'black',
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 30,
    paddingRight: 10,
    color: 'black',
  },
  row: { // dinh nghia trong phan number
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'stretch',
  },
});