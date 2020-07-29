import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { SafeAreaView, StyleSheet, Text, View, FlatList, Button, TextInput } from 'react-native';
import { firebaseApp, contasDB } from "./firebase.js";
import { LineChart } from "react-native-chart-kit";
import { Dimensions} from "react-native";

export default class Grafico extends Component {
	
	contabilizarContas = () => {

        var contas1 = [];
        var valores = [];

        contasDB.on("value", (contas) => {

            contas.forEach((conta) =>{
				contas1[contas1.length] = conta.val().conta;
                valores[valores.length] = conta.val().valor;
            });
        });
        var data = {
                labels: contas1,
                datasets: [
					{ 
						data: valores,
						color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
						strokeWidth: 2
					}
				],
				legend: ["Contas Cadastradas"] // optional
            };
        console.log(data);
        return data;
    }
	
	render() {
		return(
			<SafeAreaView style={styles.container}>
				<LineChart
					data={this.contabilizarContas()}
					width={Dimensions.get("window").width}
					height={250}
					chartConfig={
						{color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`}
					}
				></LineChart>	
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		padding:10
	},
	titulo: {
		paddingTop: 2,
		paddingBottom: 2,
		fontSize: 28,
		fontWeight: "bold"
	}	
});

