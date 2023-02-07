import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Tarjetitas from './Tarjetitas';
import { Button } from 'react-native';


const tarjetas= [
  "🦓",
  "🦉",
  "🐠",
  "🐧",
  "🦕",
  "🐭",
];

export default function App() {
  const [board, setBoard] = React.useState(()=> desordenar([...tarjetas, ...tarjetas]));
  const [selectedCards, setSelectedCard] = React.useState([]);
  const [matchedCards, setMatchedCards] = React.useState([]);
  const [score, setScore] = React.useState(0);

  React.useEffect(()=>{
    if(selectedCards.length < 2)return;
    if(board[selectedCards[0]] === board[selectedCards[1]]){
      setMatchedCards([...matchedCards, ...selectedCards]);
      setSelectedCard([]);
    }else{
      const timeoutId = setTimeout(()=>setSelectedCard([]),1000);
      return ()=> clearTimeout(timeoutId);
    }
  }, [selectedCards]);
  
  const handleTapCard= index=>{
    if(selectedCards.length >=2 || selectedCards.includes(index)) return;
    setSelectedCard([...selectedCards, index]);
    setScore(score +1);
  };

  const didPlayerWin = () => matchedCards.length === board.length;

  const resetGame= () => {
    desordenar([...tarjetas, ...tarjetas]);
    setMatchedCards([]);
    setScore(0);
    setSelectedCard([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{didPlayerWin()? "Ganaste!!":"Memoria"}</Text>
      <Text style={styles.title}>Puntos: {score}</Text>

      <View style={styles.board}>
        {board.map((card, index) => {
          const isTurnedOver = selectedCards.includes(index) || matchedCards.includes(index)
          return(
            <Tarjetitas
            key={index}
            isTurnedOver={isTurnedOver}
            onPress={()=> handleTapCard(index)}
            >{card}</Tarjetitas>
          )
        })}
      </View>
      {didPleyerWin() && <Button onPress={resetGame} title= "Otra vez"/>}
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title:{
    fontSize: 32,
    color: 'white',
    fontWeight: '900',
  },
  board:{
    flexDirection: 'row',
    flexWrap:'wrap',
    justifyContent:'center'
  }
});

function desordenar(array) {
  for(let i= array.length -1; i > 0; i--){
    const randomIndex = Math.floor(Math.random() * (i+1));
    [array[i], array[randomIndex]]= [array[randomIndex], array[i]];
  }
  return array;
}
