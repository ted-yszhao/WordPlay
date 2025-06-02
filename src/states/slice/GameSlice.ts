import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GameState {
  win : boolean;
  over: boolean;
  wordLength: number;
  attempts: number;
  answer: string;
  guesses: string[];
}

const initialState: GameState = {
  win : false,
  over: false,
  attempts: Number(process.env.REACT_APP_WORD_LENGTH),
  wordLength: Number(process.env.REACT_APP_WORD_LENGTH),
  answer: "apple",
  guesses: [""],
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    addLetter: (state, action: PayloadAction<string>) => {
      if (state.over) return;
      const currentGuess = state.guesses[state.guesses.length - 1];
      if (currentGuess.length >= state.wordLength) return;
      state.guesses[state.guesses.length - 1] = currentGuess + action.payload;
    },
    deleteLetter: (state) => {
      if (state.over) return;
      const currentGuess = state.guesses[state.guesses.length - 1];
      if (currentGuess.length > 0) {
        state.guesses[state.guesses.length - 1] = currentGuess.slice(0, -1);
      }
    },
    submitGuess: (state) => {
      if (state.over) return;
      const currentGuess = state.guesses[state.guesses.length - 1];
      if (currentGuess.length === state.wordLength){
        if (currentGuess === state.answer){
          state.over = true;
          state.win = true;
        }
        state.guesses.push('');
        if (state.guesses.length > state.attempts){
          state.over = true;
        }
      }
    },
    resetGame: (state) => {
      state.win = initialState.win;
      state.over = initialState.over;
      state.wordLength = initialState.wordLength;
      state.attempts = initialState.attempts;
      state.answer = initialState.answer;
      state.guesses = [...initialState.guesses];
    },
  },
});


export const {addLetter, deleteLetter , submitGuess , resetGame} = gameSlice.actions;
export default gameSlice.reducer;
