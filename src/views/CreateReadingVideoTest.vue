<template>

<div class="container">
    <div class="row">
        <div class="col-12">
            <h1> Dodawanie nowego testu tekstowego / wideo</h1>
            <form @submit.prevent="sendTest" id="ReadVideoTest" class="col-12">
                <textarea class="form-control" placeholder="Proszę tu wpisać tekst bądź wstawić link do wideo" v-model="text" required/>
                <h3 class="m-4">Pytania:</h3>
                <div class="row">
                    <div class="col-6" v-for="(question,questionIdx) in questions" :key="questionIdx">
                        <div class="row">
                        <input type="text" class="col-10 form-control mb-2" v-model="question.question" placeholder="Pytanie" required>
                        <button type="button" class="btn btn-danger form-control col-1" title="Usuń to pytanie" @click="removeQuestion(questionIdx)">X</button>
                        </div>
                        <div class="answers form-check" v-for="(answer,answerIdx) in question.answers" :key="answerIdx">
                            <p class="row">
                                <input type="radio" class="col-1 form-control" v-model="correctAnswers[questionIdx]" :name="question+questionIdx" :value="answerIdx" required>
                                <input type="text" class="col-7 form-control" v-model="answer.answer" placeholder="Odpowiedź" required>
                                <button class="btn btn-danger col-1 form-control" type="button" @click="removeAnswer(questionIdx,answerIdx)" title="Usuń tę odpowiedź">X</button>
                            </p>      
                        </div>            
                        <button @click="addAnswer(questionIdx)" class="new-answer btn btn-primary" type="button">Nowa odpowiedź</button>
                    </div>   
                </div>       
                <button type="button" class='btn btn-primary m-1' @click="addQuestion">Nowe pytanie</button>
                <br/>
                <button type="submit" class="col-3 form-control btn btn-success mt-1 mb-3">Zatwierdź test</button>
            </form>
        </div>
    </div>
</div>

 </template>
  
    <script>
    
    export default{
        name:"ReadingVideoTest",
        data(){
            return{
                text: undefined,
                correctAnswers: [],
                questions:[
                    {
                        question:"",
                        answers:[
                            {
                                answer:"",
                                correct: false
                            }
                        ]
                    }
                ]
            }
        },
        
        methods:{
            addQuestion(){
                this.questions.push({
                    question:"",
                    answers:[{answer: "", correct: false}]
                })
            },
           
            addAnswer(questionIdx){
                this.questions[questionIdx].answers.push({ answer:"", correct: false})
            },
            
            prepareJson(){
                this.questions.forEach((question, idx) => {
                    question.answers[this.correctAnswers[idx]].correct = true;
                })
                let fullTest = {
                    questions: this.questions
                }
                
                //let link_regex = /(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
                
                //if(link_regex.test(this.text)) fullTest.link = this.text;
                fullTest.text = this.text;
                return fullTest;
            },
            
            removeAnswer(question_id,answer_id){
                this.questions[question_id].answers.splice(answer_id,1); 
            },
            
            removeQuestion(question_id){
               this.questions.splice(question_id,1);
            },
            
            sendTest(){
                let fullTest = this.prepareJson();
                this.$req.post("http://18.195.242.27:8080/api/readingVideoTest", fullTest).then(function(){
                    //document.getElementById("ReadingVideoTest").reset()
                    alert("Test wysłano poprawnie");
                    
                }).catch(function(error){
                    
                    console.log(error);
                    alert("Wystąpił błąd podczas przesyłania testu. Proszę spróbować ponownie");
                    
                });
            }
        }
    }
    </script>
    
    
<style>
input[type=radio]{
  transform:scale(0.5);
}
</style>
