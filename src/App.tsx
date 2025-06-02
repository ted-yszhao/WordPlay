import  { useEffect } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { AppDispatch , RootState } from './states/store';
import {addLetter , deleteLetter , resetGame , submitGuess} from './states/slice/GameSlice'
function App() {

  const gameState = useSelector((state:RootState) => state.game);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const handleKeydown = (ev:KeyboardEvent) =>{
      console.log(ev.key)
      if (ev.key === '='){
        dispatch(resetGame())
      }
      else if (/^[A-Za-z]$/.test(ev.key)){
        dispatch(addLetter(ev.key))
      }
      else if (ev.key === 'Enter') {
        dispatch(submitGuess())
      }

      else if (ev.key === 'Backspace'){
        dispatch(deleteLetter())
      }

      
    };
    window.addEventListener('keydown',handleKeydown);

    return ()=>{
      window.removeEventListener('keydown',handleKeydown);
    };
  },[]);

  return (
    <div className="App">
     This is my app.
    </div>
  );
}

export default App;
