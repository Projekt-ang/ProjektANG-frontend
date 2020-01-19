<template>
  <div id="confirmDelete" class="modal fade" role="dialog">
    <div class="modal-dialog w-50">
      <div class="modal-content">
        <div class="modal-header">
          <a class="modal-title font-weight-bold text-center">Czy jesteś pewien? {{id}}</a>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
          <div class="modal-footer justify-content-center">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Anuluj</button>
            <button
              type="submit"
              class="btn btn-danger"
              data-dismiss="modal"
              @click="usun(id)"
            >Usuń</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>


export default {
  name: "ConfirmDeleteModal",
  props: {
  	id: {
        required: true
      },
    typ: {
      required: true
    },
  },
  methods: {
    usun: function(id) {
      if (this.typ === 'blank'){
        this.$req.delete("/api/BlankInsertTest/" + id)
        .then(function(){
          alert("Test usunieto poprawnie"); 
        })
        .catch(function(error){
          console.log(error);
          alert("Wystąpił błąd podczas usuwania testu. Proszę spróbować ponownie"); 
        });
      }
      else if (this.typ === 'readingvideo'){
        this.$req.delete("/api/ReadingVideoTest/" + id)
          .then(function(){
            alert("Test usunieto poprawnie"); 
          })
          .catch(function(error){     
            console.log(error);
            alert("Wystąpił błąd podczas usuwania testu. Proszę spróbować ponownie"); 
          });
      }
    },
  }
}
</script>