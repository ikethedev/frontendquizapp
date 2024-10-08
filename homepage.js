const options = document.querySelector(".options");
const changeQuizTitle = (data) => {
    document.querySelector(".current__quiz").classList.remove("hidden");   
    document.querySelector(".current__quiz--title").textContent = data.title;
}

const showQuestions = () => {
    document.querySelector(".welcome").classList.add("hidden");
    document.querySelector(".quiz").classList.remove("hidden");
}

const startQuiz = () => {
        changeQuizTitle(data);
        updateQuestion(data)
        showQuestions(data);
        updateAnswerChoices(index)
}


const addHoverHome = (e) => {
    console.log(e.target)
    if(e.target.classList.contains("option__item")){
      e.target.classList.add("option__item--hover")
    }
    if(e.target.parentElement.classList.contains("option__item")){
      e.target.parentElement.classList.add("option__item--hover")
    }
  }

  const removeHoverHome = (e) => {
    if(e.target.classList.contains("option__item")){
      e.target.classList.remove("option__item--hover")
    }
  
}

options.addEventListener("mouseover", addHoverHome);
options.addEventListener("mouseout", removeHoverHome);

options.addEventListener("click", async (e) => {
  
    if(e.target.tagName === "IMG") {
        data = await getData(e.target.parentElement.parentElement.lastElementChild.id)
        startQuiz()
        return await getData(e.target.parentElement.parentElement.lastElementChild.id)
    }

    if(e.target.classList.contains("heading-small")) {
        data = await getData(e.target.id);
        startQuiz();
        return await getData(e.target.id);
    }

    if (e.target.classList.contains("option__item") || e.target.parentElement.classList.contains("option__item") || e.target.parentElement.parentElement.classList.contains("option__item")) {
        data = await getData(e.target.lastElementChild.id);
        startQuiz()
        return await getData(e.target.lastElementChild.id);
    }

})



