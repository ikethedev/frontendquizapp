const toggleBtn = document.querySelector('.toggle__button');

const body = document.querySelector('body');

const toggleMode = () => {
    isDarkMode = !isDarkMode;
    document.querySelector(".toggle__button--switch").classList.toggle('active');
    darkModeImages()
    darkModeBackground()
    darkModeBackgroundImage()
    darkModeMainText()
    darkModeProgressBar()
    darkModeQuestionBg()
}

const darkModeBackground = () => {
    body.classList.toggle("darkMode__background")
}

const darkModeImages = () =>{
    if(isDarkMode){
        document.querySelector(".toggle__light--mode").src = "./assets/images/icon-sun-light.svg"
        document.querySelector(".toggle__dark--mode").src = "./assets/images/icon-moon-light.svg"
    } else {
        document.querySelector(".toggle__light--mode").src = "./assets/images/icon-sun-dark.svg"
        document.querySelector(".toggle__dark--mode").src = "./assets/images/icon-moon-dark.svg"
    }
}

const darkModeProgressBar = () => {
    document.querySelector(".progress__bar--track").classList.toggle("darkModeQuestionBg")
}

const darkModeBackgroundImage = () => {
    body.classList.toggle("darkModeImage")
}

const darkModeMainText = () => {
    body.classList.toggle("darkMode__text")
    document.querySelectorAll("h1").forEach(el => {
        el.classList.toggle("darkMode__text")
    })
      document.querySelectorAll("h2.heading-small").forEach(el => {
        console.log(el)
        el.classList.toggle("darkMode__text")
    })
    
    document.querySelectorAll("p.heading-small").forEach(el => {
        el.classList.toggle("darkMode__text")
    })
    document.querySelector("#question__question--text").classList.toggle("darkMode__text")
}

const darkModeQuestionBg = () => {
    const quizSection = document.querySelector(".quiz");
    const wasHidden = quizSection.classList.contains("hidden");
    console.log(document.querySelectorAll(".quiz__choice"))

    console.log(wasHidden)
    if (wasHidden) {
        quizSection.classList.remove("hidden");
    }

    document.querySelectorAll(".option__item").forEach(el => {
        el.classList.toggle("darkModeQuestionBg")
    })

    
    document.querySelector(".score").classList.toggle("darkModeQuestionBg")

    if (wasHidden) {
        quizSection.classList.add("hidden");
    }
}

toggleBtn.addEventListener('click', toggleMode);

const getData = async (index) => {
    try{
        const response = await fetch('./data.json');
        const data = await response.json();
        return data.quizzes[index];
    }
    catch(error){
        console.log(error);
    }
}




