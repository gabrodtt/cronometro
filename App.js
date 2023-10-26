/* Passo 6 - Importar o useState */
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

/* Passo 7 - Declaração de Variáveis */
let timer = null;
let ss = 0;
let mm = 0;
let hh = 0;

export default function App() {
  /* Passo 8 - Declarar os estados utilizando o UseState*/
  const [numero, setNumero] = useState(0);
  const [botao, setBotao] = useState('INICIAR');
  const [ultimo, setUltimo] = useState(null);

/* Passo 9 - Criar a função vai, que controla o comportamento do botão de INICIAR/PARAR*/
  function vai() {
    if (timer !== null) {
      //aqui vai parar o timer
      clearInterval(timer);
      timer = null;
      setBotao('INICIAR');
    } else {
      //começa a girar o timer
      timer = setInterval(() => {
        ss++;

        if (ss == 60) {
          ss = 0;
          mm++;
        }

        if (mm == 60) {
          mm = 0;
          hh++;
        }

        let format =
          (hh < 10 ? '0' + hh : hh) +
          ':' +
          (mm < 10 ? '0' + mm : mm) +
          ':' +
          (ss < 10 ? '0' + ss : ss);

        setNumero(format);
      }, 1000);

      setBotao('PARAR');
    }
  }

/* Passo 10 - Criação da função limpar, responsável por resetar*/
  function limpar() {
    if (timer !== null) {
      //parar o timer
      clearInterval(timer);
      timer = null;
    }

    setUltimo(numero);
    setNumero(0);
    ss = 0;
    mm = 0;
    hh = 0;
    setBotao('INICIAR');
  }

  return (
    <View style={styles.container}>
      <Image source={require('./assets/MicrosoftTeams-image (3).png')} />

      <Text style={styles.timer}> {numero} </Text>

      <View style={styles.btnArea}>
        <TouchableOpacity style={styles.btn} onPress={vai}>
          <Text style={styles.btnTexto}> {botao} </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnPausa} onPress={limpar}>
          <Text style={styles.btnTexto}> LIMPAR </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.areaTempo}>
        <Text style={styles.textoCorrida}>
          {ultimo ? 'Ultimo Tempo: ' + ultimo : ''}
        </Text>
      </View>
    </View>
  );
}

/* Passo 11 - Passar os estilos da área que mostra o tempo corrido*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#423bc4',
  },
  timer: {
    marginTop: -160,
    fontSize: 45,
    fontWeight: 'bold',
    color: '#FFF',
  },
  btnArea: {
    flexDirection: 'row',
    marginTop: 130,
    height: 40,
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    height: 50,
    margin: 17,
    borderRadius: 7,
  },

  btnPausa: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'purple',
    height: 50,
    margin: 17,
    borderRadius: 7,
  },

  btnTexto: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#black',
  },
  areaTempo: {
    marginTop: 50,
  },
  textoCorrida: {
    fontSize: 25,
    color: '#FFF',
    fontStyle: 'italic',
  },
});
