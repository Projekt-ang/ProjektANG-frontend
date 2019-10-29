<template>
    <div class="about">
        <h1>Lista testów</h1>
        <router-link :to="'/CreateReadingVideoTest'">
            <button class="btn btn-success btn-lg m-4" >Dodaj test</button>
        </router-link>
        <table table class="table table-striped table-hover table-bordered w-50 mx-auto">
            <thead>
                
                <th>Nazwa</th>
                <th>Rodzaj testu</th>
                <th>Grupy</th>
                <th style="width: 15%"></th>
                
            </thead>
      <!--<button class="btn btn-danger m-1 btn-rounded" @click="apiTest()">Wyślij GET</button> -->
            <tbody>
                <template v-for="(test, idx) in this.testy">
                    <tr @click="expand(test.id)" :key="idx">
                        <td class="align-middle"> <router-link :to="'/about/'+test.id">nazwa testu reading {{test.id}}</router-link> </td>
                        <td class="align-middle">Reading</td>
                        <td class="align-middle">10</td>
                        <td class="align-middle">
                            <button class="btn-danger" @click.stop="deleteTest(test.id)">Usuń</button>
                            <router-link :to="'/about/editReadingVideoTest/'+test.id">
                                <button class="btn-primary" >Edytuj</button>
                            </router-link>      
                        </td>        
                    </tr>
                    <tr @click="expand(test.id)" v-if="test.id in expanded">
                        <td :colspan="4">
                            <div class="accordian-body">
                                <div class="row justify-content-md-center">
                                    <div class="col-11">
                                        <h3 class="m-2">Tekst</h3>
                                        <p class="text-justify">
                                            {{test.text}}
                                        </p>
                                    
                                        <div class="m-2">
                                            <div class="row justify-content-md-center">
                                                <div class="col-6" v-for="(question, questionIdx) in test.questions" :key="questionIdx">
                                                    <h4 class="m-3">Pytanie {{questionIdx + 1}}</h4>
                                                    <p class="m-1 font-weight-bolder">
                                                        {{question.question}}
                                                    </p>
                                                    <div class="row justify-content-md-center" v-for="(answer, answerIdx) in question.answers" :key="answerIdx">
                                                        <div class="col-8">
                                                            <p class="m-1 text-justify">
                                                                {{answer.answer}}
                                                            </p>
                                                        </div>
                                                    </div>   
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                </template>
                
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      testy: undefined,
      expanded: {}
    };
  },
  methods: {
    apiTest: function() {
      this.$req
        .get("/test")
        .then(response => {
          this.response = response.data;
        })
    },
    expand(id) {
      if (id in this.expanded)
        this.$delete(this.expanded, id);
      else
        this.$set(this.expanded, id, true);
    },
    deleteTest(id){
        if(confirm("Czy napewno chcesz usunac test "+ id)) {
            this.$req.delete("http://localhost:8080/api/readingVideoTest/" + id).then(function(){
                document.getElementById("ReadingVideoTest").reset();
                alert("Test usunięto poprawnie");
            
            }).catch(function(error){
                    
                console.log(error);
                alert("Wystąpił błąd podczas usuwania testu. Proszę spróbować ponownie");               
            });

        }
    },
  },
  mounted() {
    axios
        .get("http://77.55.210.216:3000/textTests")
        .then(response => {
          this.testy = response.data;
        })
  }
}
</script>
