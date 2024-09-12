let count = 1;
let index = -1;
let score = 0;
let isSelected = false;
let isCheck = false
let data;
let isDarkMode = false


let selectedAnswer = ''


const setFalse = () => {
  isSelected = false;
}

const setTrue = () => {
  isSelected = true;
}

const addErrorMessage = () => {
  document.querySelector("#error__message").classList.remove("hidden");
};

const removeErrorMessage = () => {
  document.querySelector("#error__message").classList.add("hidden");
}

const updateScore = () => {
  score++;
  document.querySelector(".score__count").textContent = score;
};

const updateQuestionCount = () => {
  count++;
  document.querySelector(".question__count").textContent = count;
};

const updateQuestion = () => {
  index++;
  console.log(index);
  const question = data.questions[index].question;
  document.querySelector(".question__question--text").textContent = question;
};

const updateProgressBar = () => {
  const progress = (count / data.questions.length) * 100;
  document.querySelector(".progress__bar").style.width = `${progress}%`;
};


const toggleDarkModeClasses = (element, classes, isDarkMode) => {
  classes.forEach(className => {
    if (isDarkMode) {
      element.classList.add(className);
    } else {
      element.classList.remove(className);
    }
  });
};


const updateQuestionChoices = (
  answerLetter,
  answer,
) => {
  const optionItem = document.createElement("div");
  optionItem.className = "option__item quiz__choice";

  const answerChoice = document.createElement("h4");
  answerChoice.className =
    "option__item--choice--background quiz__answer--choice heading-small";
  answerChoice.textContent = answerLetter;

  const answerText = document.createElement("p");
  answerText.className = "heading-small";
  answerText.textContent = answer;

  toggleDarkModeClasses(optionItem, ["darkModeQuestionBg"], isDarkMode);
  toggleDarkModeClasses(answerText, ["darkMode__text"], isDarkMode);

  optionItem.appendChild(answerChoice);
  optionItem.appendChild(answerText);
  return optionItem;
};

const quizAnswerContainer = document.querySelector(".quiz__answer");
const quizOptionContainer = document.querySelector(".quiz__option--container");

const updateAnswerChoices = (darkmode) => {
  const letters = ["A", "B", "C", "D"]
  quizOptionContainer.innerHTML = "";
  const optionArr = Object.values(data)[3][index].options;
  optionArr.forEach((option, index) => {
    const letter = letters[index]
    const optionItem = updateQuestionChoices(letter, option);
    quizOptionContainer.appendChild(optionItem);
  });
};


const setActive = (e) => {
  if(isCheck){
    return
  }
    removeActive(e);
    if (e.target.classList.contains("quiz__choice")) {
      e.target.firstElementChild.classList.add("active");
      selectedAnswer = e.target.lastElementChild.textContent;
      removeErrorMessage()
      setTrue()
    }

    if (e.target.parentElement.classList.contains("quiz__choice")){
      e.target.parentElement.classList.add("active");
      e.target.parentElement.firstElementChild.classList.add("active");
      selectedAnswer = e.target.parentElement.lastElementChild.textContent;
      removeErrorMessage()
      setTrue()
    }
    return selectedAnswer
};

const handleClick = (e) => {
  setActive(e);
};

const checkAnswer = (e) => {
  const correctAnswer = data.questions[index].answer;
  if (selectedAnswer === correctAnswer) {
    activeCorrect(e);
    updateScore();
    isSelected = false;
    console.log(isSelected);
  } else {
    showError(e);
  }

  document.querySelector("#error__message").innerHTML = "";
};

const correctIcon = () => {
  const answerIcon = document.createElement("img");
  answerIcon.className = "correct__icon";
  answerIcon.src = "./assets/images/icon-correct.svg";
  return answerIcon;
};

const incorrectIcon = () => {
  const answerIcon = document.createElement("img");
  answerIcon.className = "correct__icon";
  answerIcon.src = "./assets/images/icon-error.svg";
  return answerIcon;
};

const activeCorrect = (e) => {
  removeActive(e);
  const correctAnswer = data.questions[index].answer;
  const options = document.querySelectorAll(".quiz__choice");
  options.forEach((option) => {
    if (option.lastElementChild.textContent === correctAnswer) {
      console.log(option);
      option.classList.add("correct__answer");
      option.firstElementChild.classList.add(
        "correct__answer--item--background"
      );
      option.appendChild(correctIcon());
    }
  });
};

const showError = (e) => {
  const options = document.querySelectorAll(".quiz__choice");
  options.forEach((option) => {
    if (option.classList.contains("active")) {
      option.classList.add("incorrect__answer");
      option.firstElementChild.classList.add(
        "incorrect__answer--item--background"
      );
    }
    if (option.lastElementChild.textContent === data.questions[index].answer) {
      option.appendChild(correctIcon());
    }
  });
};

const incorrectAnswer = (e) => {
  const correctAnswer = data.questions[index].answer;
  const options = document.querySelectorAll(".quiz__choice");
  options.forEach((option) => {
    if (option.lastElementChild.textContent === correctAnswer) {
      option.appendChild(correctIcon());
    }
  });

  if (e.parentElement.classList.contains("active")) {
    console.log(e.target.parentElement);
  }
};

const activeIncorrect = (e) => {
  const correctAnswer = data.questions[index].answer;
  const options = document.querySelectorAll(".quiz__choice");
  
  options.forEach((option) => {
    if(selectedAnswer === option.lastElementChild.textContent){
      option.classList.add("incorrect__answer");
      option.firstElementChild.classList.add("incorrect__answer--item--background");
      option.appendChild(incorrectIcon());
    }
    if (option.lastElementChild.textContent === correctAnswer) {
      option.appendChild(correctIcon());
    }
  });
  removeActive(e);
};

const removeActive = (e) => {
  const options = document.querySelectorAll(".quiz__choice");
  options.forEach((option) => {
    option.firstElementChild.classList.remove("active");
    option.classList.remove("active");
  });
};



const createSubmitButton = (e) => {
  document.querySelector(".quiz__submit--button").innerHTML = "";
  const quizSubmitContainer = document.querySelector(".quiz__submit--button");
  const btn = document.createElement("button");
  btn.id = "submit_answer";
  btn.className = "btn heading-small";
  btn.textContent = "Submit Answer";
  quizSubmitContainer.appendChild(btn);
  document
    .querySelector("#submit_answer")
    .addEventListener("click", handleSubmit);
};

const createNextButton = () => {
  document.querySelector(".quiz__submit--button").innerHTML = "";
  const btn = document.createElement("button");
  btn.id = "next_question";
  btn.className = "btn heading-small";
  btn.textContent = "Next Question";
  btn.addEventListener("click", getNextQuestion);
  document.querySelector(".quiz__submit--button").appendChild(btn);
};

const getNextQuestion = () => {
  isSelected = !isSelected
  isCheck = false
  console.log(isSelected) 
  document.querySelector(".quiz__submit--button").innerHTML = "";
  createSubmitButton();
  updateQuestion();
  updateQuestionCount();
  updateAnswerChoices();
  updateProgressBar()
  removeErrorMessage();
};

const handleSubmit = (e) => {
  if(count === 10){
    document.querySelector(".quiz").classList.add("hidden");
    document.querySelector(".results").classList.remove("hidden");
  }
  const correctAnswer = data.questions[index].answer;
  if(!isSelected){
    addErrorMessage();
  } else {
    if(selectedAnswer === correctAnswer){
      activeCorrect()
      updateScore()
    } else {
      showError()
      activeIncorrect()
    }
    isCheck = true
    createNextButton();
    checkAnswer();
    removeErrorMessage()
  }
};


const optionContainer = document.querySelector(".quiz__option--container");

optionContainer.addEventListener("mouseover", (e) => {
  console.log(e.target)
  if(e.target.classList.contains("option__item")){
    e.target.classList.add("option__item--hover")
    e.target.firstElementChild.classList.add("option__item--choice--background--hover")
  }
  if(e.target.parentElement.classList.contains("option__item")){
    e.target.parentElement.classList.add("option__item--hover")
    e.target.parentElement.firstElementChild.classList.add("option__item--choice--background--hover")
  }
});


optionContainer.addEventListener("mouseout", (e) => {
  if(e.target.classList.contains("option__item")){
    e.target.firstElementChild.classList.remove("option__item--choice--background--hover")
    e.target.classList.remove("option__item--hover")
  }
  if(e.target.parentElement.classList.contains("option__item")){
    e.target.parentElement.firstElementChild.classList.remove("option__item--choice--background--hover")
    e.target.parentElement.classList.remove("option__item--hover")
  }
}
);




document
  .querySelector("#submit_answer")
  .addEventListener("click", handleSubmit);
quizAnswerContainer.addEventListener("click", handleClick);
