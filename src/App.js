import {useState} from 'react';
import './App.css';
import Game from './components/Game';

function App() {
  const HEX_MAX = getDecimalValue('FFFFFF');

  const [bgColor, setBgColor] = useState(generateRandomBgColor());
  const [firstColor, setFirstColor] = useState(bgColor);

  function generateRandomBgColor() {
    let hex = getHexValue(Math.floor(Math.random() * (HEX_MAX + 1)));
    return `#${hex.padStart(6, '0')}`;
  }

  function isCharacterANumber(char) {
    return (/[0-9]/).test(char);
  }

  function isCharacterALetter(char) {
    return (/[A-Z]/).test(char);
  }

  function getDecimalValue(hex) {
    // Homer's Rule
    let adjHex = hex.toUpperCase();
    let result = 0, base = 16;
    for (let i = 0; i < adjHex.length; i++)
    {
      let numToAdd;
      let char = hex.charAt(i);

      if (isCharacterANumber(char))
        numToAdd = char - '0';
      else if (isCharacterALetter(char)) {
        if (char === 'A')
          numToAdd = 10;
        else if (char === 'B')
          numToAdd = 11;
        else if (char === 'C')
          numToAdd = 12;
        else if (char === 'D')
          numToAdd = 13;
        else if (char === 'E')
          numToAdd = 14;
        else if (char === 'F')
          numToAdd = 15;
      }

      result *= base;
      result += numToAdd;
    }
    // console.log(result)
    return result;
  }

  function getHexValue(decimal) {
    console.log("decimal val: " + decimal)
    let hexValue = '';
    let quotient = decimal;
    
    while (quotient > 0) {
      let remainder = quotient % 16;
      quotient = Math.floor(quotient / 16);
      
      if (remainder === 10)
        hexValue += 'A';
      else if (remainder === 11)
        hexValue += 'B';
      else if (remainder === 12)
        hexValue += 'C';
      else if (remainder === 13)
        hexValue += 'D';
      else if (remainder === 14)
        hexValue += 'E';
      else if (remainder === 15)
        hexValue += 'F';
      else
        hexValue += remainder;
      
      console.log("hex val: " + hexValue);
      
    }
    console.log(hexValue.split("").reverse().join(""))
    return hexValue.split("").reverse().join("");
  }

  function createNewGame() {
    let newColor = generateRandomBgColor();
    setBgColor(newColor);
    setFirstColor(newColor);
  }

  return (
    <div 
      className='colored-bg' 
      style={{
        backgroundColor: bgColor, 
        backgroundImage: `linear-gradient(90deg, ${firstColor} 50%, ${bgColor} 50%)`
      }}
    >
      <h1 className='title'>Guess the Hex!</h1>
      <Game 
        changeColor={setFirstColor} 
        originalColor={bgColor}
        getDecimalValue={getDecimalValue}
        newGame={createNewGame}
      />
    </div>
  );
}

export default App;
