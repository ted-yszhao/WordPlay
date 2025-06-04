import { JSX, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "./states/store";
import {
	addLetter,
	deleteLetter,
	resetGame,
	submitGuess,
	setAnswer
} from "./states/slice/GameSlice";
import './App.css';


function App() {
	const gameState = useSelector((state: RootState) => state.game);
	const dispatch = useDispatch<AppDispatch>();

	const url = 'https://api.datamuse.com/words?sp=?????&max=1000'
	const fetchWord = async (action: ((arg0: string) => void)) => {
		const wordList: { word: string; score: string }[] = await fetch(url)
			.then((response) => response.json())
			.catch((error) => {
				alert(`Something went wrong: ${error}`)
			});

		const answer = wordList.filter((item) => /^[a-z]+$/.test(item.word))[Math.floor(Math.random() * wordList.length)].word;
		console.log(answer);
		action(answer);
	};

	useEffect(() => {
		fetchWord((answer: string) => (dispatch(setAnswer(answer))));
		const handleKeydown = (ev: KeyboardEvent) => {
			console.log(ev.key);
			if (ev.key === "=") {
				dispatch(resetGame());
				fetchWord((answer: string) => (dispatch(setAnswer(answer))));
			} else if (/^[A-Za-z]$/.test(ev.key)) {
				dispatch(addLetter(ev.key));
			} else if (ev.key === "Enter") {
				dispatch(submitGuess());
			} else if (ev.key === "Backspace") {
				dispatch(deleteLetter());
			}
		};
		window.addEventListener("keydown", handleKeydown);

		return () => {
			window.removeEventListener("keydown", handleKeydown);
		};
	}, [dispatch]);

	const getLine = (index: number) => {
		const res: JSX.Element[] = [];
		for (let i = 0; i < gameState.wordLength; i++) {
			let color: 'default' | 'unmatched' | 'matched' | 'matched exact' = 'default';

			if (index < gameState.guesses.length - 1 &&
				!gameState.answer.includes(gameState.guesses[index][i]))
				color = 'unmatched'
			if (index < gameState.guesses.length - 1 &&
				gameState.answer.includes(gameState.guesses[index][i]))
				color = 'matched';
			if (index < gameState.guesses.length - 1 &&
				gameState.answer[i] === gameState.guesses[index][i])
				color = 'matched exact'

			res.push(
				<div key={i} className={`tile ${color}`}>
					{(index < gameState.guesses.length && i < gameState.guesses[index].length) ?
						gameState.guesses[index][i] : " "}
				</div>
			);
		}
		return res;
	}

	return <div className="App">
		<h1> Word play game</h1>
		<div className="container">
			<div className="gameboard">
				{Array.from({ length: gameState.attempts }, (_, index) => (
					<div key={index} className="line">{getLine(index)}</div>
				))}
			</div>
		</div>


		{gameState.win && <h2>You won!</h2>}
		<h2>{gameState.over && `Game Over. The answer is ${gameState.answer}.`} Press '=' to reset.</h2>

	</div>;
}

export default App;
