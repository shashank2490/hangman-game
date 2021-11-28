import React, { useState, useEffect } from 'react';
import styles from './HangManGame.module.scss';

const alphabetMaster = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
    'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

// Array of topics
const categories = [
    ["everton", "liverpool", "swansea", "chelsea", "hull", "manchester-city", "newcastle-united"],
    ["alien", "dirty-harry", "gladiator", "finding-nemo", "jaws"],
    ["manchester", "milan", "madrid", "amsterdam", "prague"]
];

const hints = [
    ["Based in Mersyside", "Based in Mersyside", "First Welsh team to reach the Premier Leauge", "Owned by A russian Billionaire", "Once managed by Phil Brown", "2013 FA Cup runners up", "Gazza's first club"],
    ["Science-Fiction horror film", "1971 American action film", "Historical drama", "Anamated Fish", "Giant great white shark"],
    ["Northern city in the UK", "Home of AC and Inter", "Spanish capital", "Netherlands capital", "Czech Republic capital"]
];

const HangManGame = (props) => {
    const [resetCounter, setResetCounter] = useState(0);
    const [alphabetState, setAlphabetState] = useState(() => alphabetMaster.map(x => ({ letter: x, selected: false })));

    // Selected catagory
    const [chosenCategory, setChosenCategory] = useState(() => categories[Math.floor(Math.random() * categories.length)]);

    // Selected word
    const [word, setWord] = useState(chosenCategory[Math.floor(Math.random() * chosenCategory.length)].replace(/\s/g, "-"));

    // Guess
    const [guess, setGuess] = useState("");
    const [guesses, setGuesses] = useState([]);

    // Lives
    const [lives, setLives] = useState(10);

    // Count correct guesses
    const [counter, setCounter] = useState(0);

    // Number of spaces in word '-'
    const [space, setSpace] = useState(0);

    const [showLivesText, setShowLivesText] = useState("You have " + lives + " lives");
    const [categoryNameText, setCategoryNameText] = useState("");
    const [clueText, setClueText] = useState("Clue -");
    const [holdContainerContent, setHoldContainerContent] = useState([]);

    const onClickAlphabetButton = (index) => (event) => {
        let currentCounter = counter;
        let currentLives= lives;
        let holdContainerContentNew = [...holdContainerContent];
        let alphabetStateNew = [...alphabetState];

        let alphabetStateOfLetter = alphabetStateNew[index];
        let guess = alphabetStateOfLetter.letter;
        alphabetStateOfLetter.selected = true;

        for (var i = 0; i < word.length; i++) {
            if (word[i] === guess) {
                holdContainerContentNew[i] = <li className={styles.guess} key={`${i}${++i}`}>{guess}</li>;
                setCounter(++currentCounter);
            }
        }

        setAlphabetState(alphabetStateNew);
        setHoldContainerContent(holdContainerContentNew);

        let j = (word.indexOf(guess));
        if (j === -1) {
            currentLives = currentLives -1;
            setLives(currentLives);
            comments(currentLives);
            animate(currentLives);
        } else {
            comments(currentLives);
        }
    }

    const comments = (livesLeft) => {
        let text = "You have " + livesLeft + " lives";
        if (livesLeft < 1) {
            text = "Game Over";
            let alphabetStateNew = [...alphabetState];
            alphabetStateNew.forEach(x=>x.selected = true);
            setAlphabetState(alphabetStateNew);
        }
        for (var i = 0; i < guesses.length; i++) {
            if (counter + space === guesses.length) {
                text = "You Win!";
            }
        }

        setShowLivesText(text);
    }

    useEffect(() => {
        let holdContainerContent = [];
        let guesses = [];
        let spaces = 0;
        for (var i = 0; i < word.length; i++) {
            let guess;
            if (word[i] === '-') {
                guess = <li className={styles.guess} key={i}>-</li>;
                spaces++;
            } else {
                guess = <li className={styles.guess} key={i}>-</li>;
            }

            holdContainerContent.push(guess);
            guesses.push(guess);
        }

        setGuesses(guesses);
        setSpace(spaces);
        setHoldContainerContent(holdContainerContent);
        comments(lives);

        if (chosenCategory === categories[0]) {
            setCategoryNameText("The Chosen Category Is Premier League Football Teams");
        } else if (chosenCategory === categories[1]) {
            setCategoryNameText("The Chosen Category Is Films");
        } else if (chosenCategory === categories[2]) {
            setCategoryNameText("The Chosen Category Is Cities");
        }

        let myStickman = document.getElementById("stickman");
        let context = myStickman.getContext('2d');
        context.beginPath();
        context.strokeStyle = "#fff";
        context.lineWidth = 2;
    }, [resetCounter]);

    const head = () => {
        let myStickman = document.getElementById("stickman");
        let context = myStickman.getContext('2d');
        context.beginPath();
        context.arc(60, 25, 10, 0, Math.PI * 2, true);
        context.stroke();
    }

    const draw = ($pathFromx, $pathFromy, $pathTox, $pathToy) => {
        let myStickman = document.getElementById("stickman");
        let context = myStickman.getContext('2d');
        context.moveTo($pathFromx, $pathFromy);
        context.lineTo($pathTox, $pathToy);
        context.stroke();
    }

    const frame1 = () => {
        draw(0, 150, 150, 150);
    };

    const frame2 = () => {
        draw(10, 0, 10, 600);
    };

    const frame3 = () => {
        draw(0, 5, 70, 5);
    };

    const frame4 = () => {
        draw(60, 5, 60, 15);
    };

    const torso = () => {
        draw(60, 36, 60, 70);
    };

    const rightArm = () => {
        draw(60, 46, 100, 50);
    };

    const leftArm = () => {
        draw(60, 46, 20, 50);
    };

    const rightLeg = () => {
        draw(60, 70, 100, 100);
    };

    const leftLeg = () => {
        draw(60, 70, 20, 100);
    };

    const drawArray = [rightLeg, leftLeg, rightArm, leftArm, torso, head, frame4, frame3, frame2, frame1];

    const animate = (livesLeft) => {
        drawArray[livesLeft]();
    }

    const onClickHint = function () {
        var catagoryIndex = categories.indexOf(chosenCategory);
        var hintIndex = chosenCategory.indexOf(word);
        setClueText("Clue: - " + hints[catagoryIndex][hintIndex]);
    };

    const onResetClick = () => {
        let newLives = 10;
        let currentResetCounter = resetCounter;
        let chosenCategory = categories[Math.floor(Math.random() * categories.length)];
        setHoldContainerContent([]);
        setAlphabetState(alphabetMaster.map(x => ({ letter: x, selected: false })));
        setClueText("");
        setResetCounter(++currentResetCounter);
        setLives(newLives);
        setCounter(0);
        setSpace(0);
        setGuess("");
        setGuesses([]);
        comments(10);
        setChosenCategory(chosenCategory);
        setWord(chosenCategory[Math.floor(Math.random() * chosenCategory.length)].replace(/\s/g, "-"));
        setShowLivesText("You have " + newLives + " lives");
        setCategoryNameText("");
        setClueText("Clue -");
        
        let myStickman = document.getElementById("stickman");
        let context = myStickman.getContext('2d');
        context.clearRect(0, 0, 400, 400);
    }

    return (
        <div className={styles.body}>
            <div className={styles.wrapper}>
                <h1>Hangman</h1>
                <h2>Vanilla JavaScript Hangman Game</h2>
                <p>Use the alphabet below to guess the word, or click hint to get a clue. </p>
            </div>
            <div className={styles.wrapper}>
                <div id="buttons">
                    <ul className={styles.alphabet}>
                        {
                            alphabetState.map((x, i) => {
                                if (x.selected)
                                    return <li key={i} id={"letter" + i} className={styles.active}>{x.letter}</li>;
                                else
                                    return <li key={i} id={"letter" + i} onClick={onClickAlphabetButton(i)} >{x.letter}</li>
                            })
                        }
                    </ul>
                </div>
                <p id="categoryName">{categoryNameText}</p>
                <div id="hold">
                    {
                        holdContainerContent.length > 0 &&
                        <ul className={styles.my_word}>
                            {holdContainerContent}
                        </ul>
                    }

                </div>
                <p className={styles.mylives}>{showLivesText}</p>
                <p id="clue">{clueText}</p>
                <canvas className={styles.canvas} id="stickman">This Text will show if the Browser does NOT support HTML5 Canvas tag</canvas>
                <div className="container">
                    <button className={styles.button} id="hint" onClick={onClickHint}>Hint</button>
                    <button className={styles.button} id="reset" onClick={onResetClick}>Play again</button>
                </div>
            </div>
        </div>
    );
}

export default HangManGame;

// export default class HangManGame{

//     constructor(props){
//         super(props)
//     }


// }