import {useState} from 'react';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';

export default function Game(props) {
    const [hexInput, setHexInput] = useState('');
    const [errorIsPresent, setErrorIsPresent] = useState(false);
    const [errorMsg, setErrorMsg] = useState('*there is an error');
    const [showingResult, setShowingResult] = useState(false);
    const [difference, setDifference] = useState(0);
    const { width, height } = useWindowSize();

    function handleChange(e) {
        let val = e.target.value.slice('1');
        if (val.length > 6)
            return;
        setHexInput(val.toUpperCase());
    }

    function validateGuess() {
        if (hexInput.length < 6) {
            setErrorIsPresent(true);
            setErrorMsg('*Please enter 6 characters');
        }
        else if (!(/[0-9A-F]{6}/).test(hexInput)) {
            setErrorIsPresent(true);
            setErrorMsg('*Please only enter valid characters: 0-9, A, B, C, D, E, F');
        }
        else {
            setErrorIsPresent(false);
            props.changeColor(`#${hexInput}`);
            setShowingResult(true);
            setDifference(calculateDifference());
        }
    }

    function calculateDifference() {
        let guessDecimal = props.getDecimalValue(hexInput);
        let originalDecimal = props.getDecimalValue(props.originalColor.slice('1'));

        let result = guessDecimal - originalDecimal;
        return result < 0 ? -(result) : result;
    }

    function prepNewGame() {
        setShowingResult(false);
        setHexInput('')
        props.newGame();
    }

    return (
        <div className='game-container'>
            {!showingResult && 
                <>
                    <p className='game--question'>What is the hex code for the color shown?</p>
                    <input 
                        type="text"
                        placeholder="148DD9"
                        className="game--input"
                        value={`#${hexInput}`}
                        onChange={handleChange}
                    />
                    <p className='game--example'>(e.g. #ABC123, #45B907)</p>
                    {errorIsPresent && <p className='game--error'>{errorMsg}</p>}
                    <button 
                        className="game--button"
                        onClick={validateGuess}
                    >
                        GUESS!
                    </button>
                </>}
            {showingResult && 
                <>
                    <div className='game-hex-codes-container'>
                        <p className='game--hex-codes left'>Your Hex Code<br/>(#{hexInput})</p>
                        <p className='game--hex-codes right'>The Right Hex Code<br/>({props.originalColor})</p>
                    </div>
                    {difference === 0 && <Confetti width={width} height={height} />}
                    <p className='game--result'>
                        {difference === 0 ? 'Congrats! You were spot on!' : `You were ${new Intl.NumberFormat("en-US").format(difference)} shades away`}
                    </p>
                    <button 
                        className="game--button"
                        onClick={prepNewGame}
                    >
                        {difference === 0 ? 'New Color!' : 'Try Again'}
                    </button>
                </>}    
        </div>
    )
}