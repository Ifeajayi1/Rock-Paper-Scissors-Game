    let result;
    let computerPick;
    let playerPick;



    const score = JSON.parse(localStorage.getItem('score')) ||
        {
            win: 0,
            lose: 0,
            tie: 0
        };


    document.querySelector('.js-result').innerHTML = 'Result: ';
    document.querySelector('.js-moves').innerHTML = 'Moves: ';
    
    updateScoreElement();

    function updateScoreElement(){
        document.querySelector('.js-score').innerHTML = `Win: ${score.win} Tie: ${score.tie} Lose: ${score.lose}`


    }


function resetWarning () {
    if (!resetOn) {
        resetWarningElement.innerHTML =
        `Are you sure you want to reset the score?
        <button class="reset-yes-button"
        onclick="
            resetScore();
            resetWarningElement.classList.add('hide-reset-warning');
        ">Yes</button>

        <button class="reset-no-button"
        onclick="
            resetWarningElement.classList.add('hide-reset-warning');
        ">No</button>`

        resetOn = true;

    } else {
        resetWarningElement.classList.remove('hide-reset-warning');
        resetWarningElement.innerHTML = 
        `Are you sure you want to reset the score?
        <button class="reset-yes-button"
        onclick="
            resetScore();
            resetWarningElement.classList.add('hide-reset-warning');
        ">Yes</button>

        <button class="reset-no-button"
        onclick="
            resetWarningElement.classList.add('hide-reset-warning');
        ">No</button>`

        resetOn = false;
    } 

}
    

    function resetScore () {
       
            score.win = 0;
            score.lose = 0;
            score.tie = 0;
            localStorage.removeItem('score');
            updateScoreElement();  

    }


    let intervalID;
    let isAutoPlay = false;

    document.body.addEventListener


    function autoplay() {
        if (!isAutoPlay) {
            intervalID = setInterval(() => {
               const playerPick = pickComputerMove();
               game(playerPick);
            }, 1000);
            autoPlayButton.innerHTML = 'Stop Playing';
            isAutoPlay = true;

        } else {
            clearInterval(intervalID);
            autoPlayButton.innerHTML = 'Auto Play';
            isAutoPlay = false;
        }
    }


    function pickComputerMove () {

        const randomNumber = Math.random();

        if (randomNumber >= 0 && randomNumber < 1/3){
            computerPick = 'Rock';
        } else if (randomNumber > 1/3 && randomNumber < 2/3) {
            computerPick = 'Paper';
        } else if (randomNumber >= 2/3 && randomNumber < 1) {
            computerPick = 'Scissors';
        }

        return computerPick;

    }



    function game(playerPick) {

        const computerPick = pickComputerMove();

        if (playerPick === computerPick) {
            result = 'Tie'
            score.tie += 1;
        } else if (playerPick === 'Rock' && computerPick === 'Paper'){
            result = 'You lose'
            score.lose += 1;
        } else if (playerPick === 'Rock' && computerPick === 'Scissors') {
            result = 'You win'
            score.win += 1;
        } else if (playerPick === 'Paper' && computerPick === 'Scissors') {
            result = 'You lose'
            score.lose += 1;
        } else if (playerPick === 'Paper' && computerPick === 'Rock') {
            result = 'You Win'
            score.win += 1;
        } else if (playerPick === 'Scissors' && computerPick === 'Paper') {
            result = 'You win'
            score.win += 1;
        } else if (playerPick === 'Scissors' && computerPick === 'Rock') {
            result = 'You lose'
            score.lose += 1;
        }

        localStorage.setItem('score', JSON.stringify(score))

        updateScoreElement();

        document.querySelector('.js-result').innerHTML = `Result: ${result}`;

        document.querySelector('.js-moves').innerHTML = `You
    <img class="move-icon" src='game-icons/${playerPick.toLowerCase()}-emoji.png'>
    <img  class = "move-icon" src ='game-icons/${computerPick.toLowerCase()}-emoji.png'>
    computer `;


    }

    document.querySelector('.js-rock-button').addEventListener('click', () => {
        game('Rock');
    });

    document.querySelector('.js-paper-button').addEventListener('click', () => {
        game('Paper');
    });

    document.querySelector('.js-scissors-button').addEventListener('click', () => {
        game('Scissors');
    });


    const resetWarningElement = document.querySelector('.js-reset-warning');

    let resetOn = false;

    document.querySelector('.js-reset-button').addEventListener('click', () => {
          resetWarning();
    });

    document.body.addEventListener('keydown', (event) => {
        if (event.key === 'r') {
            game('Rock');
        }else if (event.key === 'p') {
            game('Paper');
        }else if (event.key === 's') {
            game('Scissors');
        }else if (event.key === 'a') {
            autoplay();
        }else if (event.key === 'Backspace') {
            resetWarning();
    }});
    
    const autoPlayButton = document.querySelector('.js-auto-play-button');

    autoPlayButton.addEventListener('click', () => {
        autoplay();
    })


    /*document.body.addEventListener('keydown', (event) => {
        console.log(event);
    });*/


