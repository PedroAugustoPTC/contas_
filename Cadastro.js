import React, { Component } from 'react';
import contabilizarContas from './Grafico.js';
import { SafeAreaView, StyleSheet, Text, View, FlatList, Button, TextInput } from 'react-native';
import { firebaseApp, contasDB } from './firebase.js';
import { TextInputMask } from 'react-native-masked-text';

export default class Cadastro extends Component {
	
	state = {
		conta: "",
		valor: "",
		contas: [ ]
	}
	
	componentDidMount() {
		
		this.listarContas();
		
	}
	
	listarContas = () => {
		
		var contasTemp = [];
		
		contasDB.on("value", (contas) => {
			
			contas.forEach((conta) => {
				
				contasTemp.push({
					
					key: conta.key,
					conta: conta.val().conta,
					valor: conta.val().valor
					
				});
				
			});
			
			this.setState({ contas: contasTemp });
		});
		
	}
	
	adicionarConta = () => {
		
		if (true) {
			
			var contas = {
				conta: this.state.conta,
				valor: this.state.valor
			};
			
			contasDB.push(contas);
			
			this.setState({ conta: "", valor: "" });
			
			this.listarContas();
			
		}
		
	}
	
	excluirConta = (key) => {
		
		contasDB.child(key).remove();
		
		this.listarContas();
		
	}
	
	formatarValor(value) {
		const valor = value[value.length - 1];
	
		if ((valor >= 0 && valor <= 9) || valor == ".")
			return value;
	
		else return value.split(value[value.length - 1], 1);
	}
	render() {
		return (
			<SafeAreaView style={styles.container}>
				<FlatList style={styles.lista} data={this.state.contas} renderItem={
					({ item, index }) =>
						<View style={styles.itemContainer}>
							<Text style={styles.item}>{item.conta}</Text>
							<Text style={styles.item}>{item.valor}</Text>
							<Button style={styles.botao} title="X" color="#FF0000" onPress={() => this.excluirConta(item.key)} />
						</View>
				} />
				<View style={styles.itemContainer}>
					<TextInput style={styles.input} placeholder="Nova Conta" value={this.state.conta} 
						onChangeText={ (conta) => this.setState({conta: conta}) } />
					<TextInput style={styles.input} placeholder="Valor" value={this.state.valor} 
						onChangeText={ (valor) => this.setState({valor: this.formatarValor(valor)}) }	
					/>
					<Button style={styles.botao} title="+" onPress={() => this.adicionarConta()} />
				</View>
			</SafeAreaView>
		);
	}
	
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#FFFFFF",
		padding: 10
	},
	titulo: {
		paddingTop: 2,
		paddingBottom: 2,
		fontSize: 28,
		fontWeight: "bold"
	},
	lista: {
		width: "100%"
	},
	item: {
		paddingTop: 2,
		paddingBottom: 2,
		fontSize: 20,
		width: "45%"
	},
	itemContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 5
	},
	botao: {
		width: "5.5%"
	},
	input: {
		height: 35,
		padding: 2,
		borderColor: "#000000",
		borderWidth: 1,
		width: "40%"
	}
});
