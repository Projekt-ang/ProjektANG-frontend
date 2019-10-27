<template>

<div class="container">
    <div class="row">
        <div class='col-12 Main-Container'>
            <h1> Dodawanie nowego testu tekstowego / wideo</h1>
            <form @submit.prevent='changeValue' id="ReadVideoTest" class='col-12'>
                <div v-if="submitted">
                    <h4> {{ prepareJson() }} </h4>
                </div>
                <textarea class='form-control' placeholder="Proszę tu wpisać tekst bądź wstawić link do wideo" v-model="text">
                
                </textarea><br/><br/>
                
                <div class='row'>
                    <div class="col-6" v-for="(question,questionIdx) in questions" :key="questionIdx">
                        <div class='row'>
                        <input type="text" class="col-10 question-input form-control form-text" v-model="question.question"  placeholder="Pytanie">
                        <button type="button" class='btn btn-primary form-control col-1' title='usuń to pytanie' @click="removeQuestion(questionIdx)">X</button>
                        </div>
                        <div class="answers" v-for="(answer,answerIdx) in question.answers" :key="answerIdx">
                            <p class='row'>
                                <input type="radio" class='col-2 form-control' v-model="correctAnswers[questionIdx]" :name="question+questionIdx" :value="answerIdx">
                                <input type="text" class="col-8 answer_input form-control" v-model="answer.answer" placeholder="Odpowiedź">
                                <button class='btn btn-primary col-1 form-control' type="button" @click="removeAnswer(questionIdx,answerIdX)" title="Usuń tę odpowiedź">X</button>
                            </p>      
                        </div>            
                        <button @click="addAnswer(questionIdx)" class='new-answer btn btn-primary' type="button">Nowa odpowiedź</button>
                    </div>   
                </div>    
                <br/><br/>     
                <button type="button" class='btn btn-primary' @click="addQuestion">Nowe pytanie</button>
                
                <br/><br/>
                <button type="submit" class='form-control'>Zatwierdź test</button>
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
                submitted: false,
                correctAnswers: [],
                questions:[
                    {
                        question:"",
                        answers:[
                            {
                                answer:'',
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
            changeValue(){
                this.submitted = true;
    
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
                this.$req.post('http://localhost:8080/api/saveReadingVideoTest', fullTest).then(function(){
                    document.getElementById("ReadingVideoTest").reset();
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

.new-answer{
    margin-top:5%;
    margin-bottom:5%;
}

.question-input{
    margin-bottom:2%;
}
</style>