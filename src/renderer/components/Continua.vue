<template>
    <section>
        <p class="title-box">&#10149; Variáveis Continuas - insira os valores abaixo:</p>

        <formEnvio id="continua"></formEnvio>

        <h2 class="md-title" style="padding: 15px;">Resultado:</h2>
        <md-table v-once>
            <md-table-header>
                <md-table-row>
                    <md-table-head md-numeric class="left_title">I</md-table-head>
                    <md-table-head class="left_title">{{title}}</md-table-head>
                    <md-table-head md-numeric>fi</md-table-head>
                    <md-table-head md-numeric>fri</md-table-head>
                    <md-table-head md-numeric>Fi</md-table-head>
                    <md-table-head md-numeric>Fri</md-table-head>
                </md-table-row>
            </md-table-header>

            <md-table-body>
                <md-table-row v-for="(row, index) in 3" :key="index">
                    <md-table-cell>1</md-table-cell>
                    <md-table-cell>teste</md-table-cell>
                    <md-table-cell v-for="(col, index) in 4" :key="index" md-numeric>0,1520</md-table-cell>
                </md-table-row>
            </md-table-body>
        </md-table>
    </section>
</template>

<script>
    import FormEnvio from './FormEnvio.vue';
    
    export default {
        components: {
            formEnvio: FormEnvio
        },
        data (){
            return {
                title: 'idades'
            }
        }
    }
</script>

<style>
  .clear {
    clear:both; 
  }
  .title-box {
      font-size: 2em;
      color: #363636;
      padding: 15px;
  }
  .md-table-head {
      text-align: center !important;
      text-transform: uppercase;
  }
  .left_title {
      text-align: left !important;
  }
</style>
