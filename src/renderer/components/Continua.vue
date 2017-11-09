<template>
    <section>
        <p class="title-box">&#10149; Variáveis Continuas - insira os valores abaixo:</p>

        <form>
            <md-input-container>
                <label>Titulo</label>
                <md-input placeholder="O que são os dados?" v-model="continua.title"></md-input>
            </md-input-container>

            <md-input-container>
                <label>Valores separados por espaços</label>
                <md-textarea v-model="continua.values"></md-textarea>
            </md-input-container>

            <md-button class="md-raised md-accent" style="float: right; color: white;" @click="generateTable">GERAR</md-button>
        
            <div class="clear"></div>
        </form>

        <h2 class="md-title" style="padding: 15px;">Resultado:</h2>
        <md-table v-once>
            <md-table-header>
                <md-table-row>
                    <md-table-head md-numeric class="left_title">I</md-table-head>
                    <md-table-head class="left_title">{{continua.title}}</md-table-head>
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
    import { mapState } from 'vuex'
    
    export default {
        computed: mapState([
            'continua'
        ]),
        methods: {
            generateTable() {
                let numbers = (this.values.split(' ')).sort((a,b) => a-b);
                let indice = [...new Set(numbers)];

                let frequence = [];
                indice.forEach(val => {
                    let fr = 0;
                    numbers.map(values => {
                        if(val==values) fr++;
                    });
                    frequence.push(fr);
                })                  
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
</style>
