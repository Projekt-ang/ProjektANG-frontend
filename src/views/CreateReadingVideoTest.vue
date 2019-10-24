<template>
<div class="Test">
<h1> Dodawanie nowego testu tekstowego / wideo</h1>
<div v-if="questions">
    <form @submit.prevent='Send_Test' id="ReadVideoTest">
        <textarea cols="100" rows="10" placeholder="Proszę tu wpisać tekst bądź wstawić link do wideo" v-model="text">
            
        </textarea><br/><br/>
        
        <p>
            <input type="text" v-model="tags" size="40" placeholder="Proszę otagować tekst ( tagi oddzielane średnikami)"/>
        </p>
        
        <div class="questions" v-for="(question,question_id) in questions" :key="question_id">
            <div class="question_label">Pytanie {{question_id+1}}   </div>
            <input type="text" class="question_input" v-model="question.text" size='30' placeholder="Proszę wpisać pytanie"></input>
            
            <div class="answers" v-for="(answer,answer_id) in question.answers" :key="answer_id">
                <p>
                    <div>Odpowiedź {{answer_id+1}} </div>
                    <input type="text" class="answer_input" v-model="answer.text" size='30' placeholder="Proszę wpisać odpowiedź"></input>
                </p>
            </div>            
            <p>
                <div>Poprawna odpowiedź</div>
                <input type="text" class="correct_answer" v-model="question.correct_answer" size='30' placeholder="Numer prawidłowej odpowiedzi"></input>
            </p>
            <button @click="new_answer(question_id)" type="button">Nowa odpowiedź</button>
            
        </div>            
        <button type="button" @click="new_question">Nowe pytanie</button>
        
        <button type="submit">Zatwierdź test</button>
    </form>
</div>
</div>
</template>

<script>
import axios from 'axios';


export default{
    name:"ReadingVideoTest",
    data(){
        return{
            text: undefined,
            tags:undefined,
            questions:[
                {
                    text:"",
                    correct_answer:"",
                    answers:[
                        {
                            text:''
                        }
                    ]
                }
            ]
        }
    },
    
    methods:{
        new_question(){
            this.questions.push({
                text:"",
                correct_answer:"",
                answers:[{text:""}]
            })
        },
        
        new_answer(question_id){
            this.questions[question_id].answers.push({ text:""})
        },
        
        prepare_json(){
            let full_test = {
                tags:this.tags,
                questions:this.questions
            }
            
            let link_regex = /(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
            
            if(link_regex.test(this.text)) full_test.link = this.text;
            else full_test.text = this.text;
            
            return full_test;
        },
        
        Send_Test(){
            let full_test = this.prepare_json();
            
            document.getElementById("ReadVideoTest").reset();
            alert("Poprawnie wysłano test");
            
        }
    }
}
</script>


<style>

.question_label{
    margin-bottom:1%;
}    
    
button{
    margin:2% auto;
    display:block;
    
}
</style>