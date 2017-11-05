<template>
  <div md-themes="primary">
    <md-toolbar>
      <md-icon class="md-default" style="flex:1" >assessment</md-icon>
      <h1 class="md-title" style="flex:16">Gerador de tabelas de Frequência</h1>
    </md-toolbar>
    
    <md-tabs md-fixed>
      <md-tab id="continua" md-label="Variavéis Continuas">
        <continua></continua>
      </md-tab>

      <md-tab id="discreta" md-label="Variavéis Discreta">
        <p></p>
      </md-tab>
    </md-tabs>

  </div>
</template>

<script>
  import Continua from './Continua.vue'
  
  export default {
    components: {
      'continua': Continua
    }
  }
</script>

<style>
  .clear {
    clear:both;
  }
</style>
