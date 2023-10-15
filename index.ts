import inquirer from 'inquirer';

const minRange = 1;
const maxRange = 100;
const maxAttempts = 10;

function generateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function playGame() {
    const secretNumber = generateRandomNumber(minRange, maxRange);
    let attempts = 0;

    const askGuess = () => {
        inquirer
            .prompt([
                {
                    type: 'number',
                    name: 'guess',
                    message: `Guess the number (between ${minRange} and ${maxRange}):`,
                },
            ])
            .then((answers) => {
                const userGuess = answers.guess;
                attempts++;

                if (userGuess === secretNumber) {
                    console.log(`Congratulations! You guessed the number (${secretNumber}) in ${attempts} attempts.`);
                    playAgain();
                } else if (attempts >= maxAttempts) {
                    console.log(`You've reached the maximum number of attempts. The secret number was ${secretNumber}.`);
                    playAgain();
                } else if (userGuess < secretNumber) {
                    console.log('Try a higher number.');
                    askGuess();
                } else {
                    console.log('Try a lower number.');
                    askGuess();
                }
            });
    };

    console.log(`Welcome to the Number Guessing Game! You have a maximum of ${maxAttempts} attempts.`);

    askGuess();
}

function playAgain() {
    inquirer
        .prompt([
            {
                type: 'confirm',
                name: 'playAgain',
                message: 'Do you want to play again?',
            },
        ])
        .then((answers) => {
            if (answers.playAgain) {
                playGame();
            } else {
                console.log('Thanks for playing. Goodbye!');
                process.exit(0);
            }
        });
}

playGame();
