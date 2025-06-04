# WordPlay

WordPlay is a Wordle-style word guessing game built with React and Redux. Players have to guess a 5-letter word within a limited number of attempts, with visual feedback provided for each guess.

## Features

- **Word Guessing Game:** Classic Wordle-style gameplay with 5-letter words
- **Visual Feedback:** Color-coded tiles showing correct letters and positions
- **Dynamic Word Generation:** Fetches random words from the Datamuse API
- **Keyboard Support:** Full keyboard input support
- **Game State Management:** Built with Redux Toolkit for reliable state management
- **Responsive Design:** Clean, modern interface

## Getting Started

1. Clone the repository:
    ```bash
    git clone https://github.com/tedzhao/WordPlay.git
    ```
2. Navigate to the project directory:
    ```bash
    cd wordplay
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Create a `.env` file with your configuration:
    ```env
    REACT_APP_WORD_LENGTH=5
    REACT_APP_WORD_ATTEMPTS=6
    ```
5. Start the development server:
    ```bash
    npm start
    ```

## How to Play

- Type letters to make guesses
- Press **Enter** to submit your guess
- Press **Backspace** to delete letters
- Press **=** to reset the game
- Colors indicate:
  - **Gray**: Letter not in the word
  - **Yellow**: Letter in word but wrong position
  - **Green**: Letter in correct position

## Docker Support

Build and run with Docker:

```bash
# Build the image
docker build -t wordplay-app .

# Run the container
docker run -p 3000:80 wordplay-app
```

## Technologies

- **Frontend:** React 18, TypeScript
- **State Management:** Redux Toolkit
- **Styling:** CSS3
- **API:** Datamuse API for word generation
- **Build Tool:** Create React App
- **Deployment:** Docker with Nginx

## Project Structure

```
src/
├── states/
│   ├── slice/
│   │   └── GameSlice.ts    # Redux game state management
│   └── store.ts            # Redux store configuration
├── App.tsx                 # Main application component
├── App.css                 # Application styles
└── index.tsx              # Application entry point
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

