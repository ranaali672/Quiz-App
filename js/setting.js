import {Quiz} from './quiz.js'


export class Settings{
    constructor(){
        this.categoryElement=document.getElementById("category")
        this.difficultyElement=document.getElementsByName("difficulty")
        this.numberofQuestions =document.getElementById("amount")
        document.getElementById("start").addEventListener("click",this.startQuiz.bind(this))
    }
    async startQuiz(){
        let category = this.categoryElement.value
        let difficulty = Array.from(this.difficultyElement).filter((el)=>{return el.checked})[0].value;
        let numofQuestions =this.numberofQuestions.value;
        let API = `https://opentdb.com/api.php?amount=${numofQuestions}&category=${category}&difficulty=${difficulty}`
        let questions =await this.fetchApi(API)
   
        if(questions.length > 0){
            $("#setting").fadeOut(500,()=>{
                $("#quiz").fadeIn(500);
            });
          
             let quiz =new Quiz(questions);
         
        }
       
    }

    async fetchApi(API){
        let response =await fetch(API)
         response =await response.json()
        return response.results ;
    }
}

