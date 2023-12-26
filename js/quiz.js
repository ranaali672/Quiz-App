export class Quiz{
    constructor(questions){
        this.questions =questions
        this.numberofQuestions =questions.length
        this.currentQuestion = 0;
        this.score =0;
        document.getElementById("nextQuestion").addEventListener("click",this.nextQuestion.bind(this))
        $("#end").click(()=>{
          $("#finsish").fadeOut(500,()=>{
            $("#setting").fadeIn(500)
          })
        })
        this.showQuestion()
    }

     shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex > 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
      }




    showQuestion(){
        document.getElementById("questionTitle").innerHTML =this.questions[this.currentQuestion].question
       
        document.getElementById("from").innerHTML=this.currentQuestion+1;
        document.getElementById("to").innerHTML=this.numberofQuestions;
        let answers = [this.questions[this.currentQuestion].correct_answer,...this.questions[this.currentQuestion].incorrect_answers]
        this.shuffle(answers)

        let answerRow =""
        for(let i =0;i<answers.length;i++){
            answerRow+=`<li class="my-3">
            <div class="pretty p-default p-round p-smooth p-plain">
               <input type="radio" name="answer" value="${answers[i]}" />
               <div class="state p-success-o">
                  <label> ${answers[i]}</label>
               </div>
            </div>
         </li>
            `
        }
        document.getElementById("rowAnswer").innerHTML =answerRow
       

    }
    nextQuestion(){
      let userAnswer=Array.from(document.getElementsByName("answer")).filter(el=>el.checked)[0].value;
      let correctAnswer=this.questions[this.currentQuestion].correct_answer;
      this.checkUserAnswer(correctAnswer,userAnswer)
      this.currentQuestion++
      if(this.numberofQuestions>this.currentQuestion){
        this.showQuestion();
      }else{
        $("#score").text(this.score)
        console.log(this.score);
        $("#quiz").fadeOut(500,()=>{
          $("#finsish").fadeIn(500)
        })
      }
      
    }
    checkUserAnswer(correctAnswer,userAnswer){
      if(correctAnswer==userAnswer){ 
        this.score=this.score+10;
        $("#correct").fadeIn(500).fadeOut(500)
       
      }else{
        $("#inCorrect").fadeIn(500).fadeOut(500)

      }
    }
}