const playAgain = document.querySelector('#reset')
console.log(playAgain)

const resetGame = () => {
    score = 0
    index = -1
    count = 1
    
    document.querySelector(".progress__bar").style.width = "10%";
    document.querySelector(".question__count").textContent = count ;
    document.querySelector(".score__count").textContent = score;
    document.querySelector(".results").classList.add("hidden")
    document.querySelector(".welcome").classList.remove("hidden")
    data = []
}

playAgain.addEventListener('click', resetGame)