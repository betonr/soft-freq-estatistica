<template>
    <section>
        <p class="title-box">&#10149; Variáveis Discretas - insira os valores abaixo:</p>

        <form>
            <md-input-container>
                <label>Tema</label>
                <md-input placeholder="O que são os dados?" v-model="discreta.title"></md-input>
            </md-input-container>

            <md-input-container>
                <label>Valores separados por espaços</label>
                <md-textarea v-model="discreta.values"></md-textarea>
            </md-input-container>

            <md-button class="md-raised md-accent" style="float: right; color: white;" @click="generateTable">GERAR</md-button>
        
            <div class="clear"></div>
        </form>

        <article v-show="discreta.res">
            <hr>
            <h2 class="md-title" style="padding: 15px;">
                Resultado:
                <md-button class="md-raised md-warn" style="margin-top: -5px; color: white;" @click="viewMap">
                    <md-icon>search</md-icon> Ver Gráfico
                </md-button>
                <span style="float:right;">
                    Média: {{ discreta.media }} |
                    Moda: {{ discreta.moda }} |
                    Desvio Padrão: {{ discreta.desvio_padrao }}
                </span> 
            </h2>
            <md-table>
                <md-table-header>
                    <md-table-row>
                        <md-table-head md-numeric>I</md-table-head>
                        <md-table-head md-numeric>{{ discreta.title }}</md-table-head>
                        <md-table-head md-numeric>fi</md-table-head>
                        <md-table-head md-numeric>Fi.a</md-table-head>
                        <md-table-head md-numeric>Fri</md-table-head>
                        <md-table-head md-numeric>Fri.a</md-table-head>
                    </md-table-row>
                </md-table-header>

                <md-table-body>
                    <md-table-row v-for="(value, indice) in discreta.indice" :key="indice">
                        <md-table-cell>{{ indice+1 }}</md-table-cell>
                        <md-table-cell>{{ value }}</md-table-cell>
                        <md-table-cell>{{ discreta.fi[indice] }}</md-table-cell>
                        <md-table-cell>{{ discreta.fia[indice] }}</md-table-cell>
                        <md-table-cell>{{ discreta.fri[indice] }}</md-table-cell>
                        <md-table-cell>{{ discreta.fria[indice] }}</md-table-cell>
                    </md-table-row>
                    <md-table-row>
                        <md-table-cell></md-table-cell>
                        <md-table-cell></md-table-cell>
                        <md-table-cell class="total">&Sigma;fi = {{ discreta.fi.reduce((a, b) => a + b, 0) }}</md-table-cell>
                        <md-table-cell></md-table-cell>
                        <md-table-cell class="total">&Sigma;fri = {{ discreta.fri.reduce((a, b) => a + b, 0) }}</md-table-cell>
                        <md-table-cell></md-table-cell>
                    </md-table-row>
                </md-table-body>
            </md-table>
        </article>
    </section>
</template>

<script>
    import { mapState } from 'vuex'
    
    export default {
        computed: mapState([
            'discreta'
        ]),
        methods: {
            generateTable() {
                let values = this.discreta.values;
                let response = {}

                let numbers = (values.split(' ')).sort((a,b) => a-b);
                let indice = [...new Set(numbers)];

                //fi e fia
                let fi = [];
                let fia = [];
                var soma = 0;
                indice.forEach(val => {
                    let freq = 0;
                    numbers.map(values => {
                        if(val==values) freq++;
                    });
                    soma+=freq;
                    fia.push(soma);
                    fi.push(freq);
                })   
                
                //fri fria
                let fri = []
                let fria = []
                let total = fi.reduce((a, b) => a + b, 0);
                indice.forEach((item, indice, array) => {
                    fri.push( parseFloat((fi[indice]/total).toFixed(4)) );
                    fria.push( parseFloat((fia[indice]/total).toFixed(4)) );
                });

                //media, moda, desvio
                let moda = numbers.length%2 != 0 ? numbers[parseInt(numbers.length/2)] : 
                        (parseInt(numbers[parseInt(numbers.length/2)-1]) + parseInt(numbers[parseInt(numbers.length/2)]) )/2;

                response = {
                    ...this.discreta,
                    indice, fi, fia, fri, fria, moda, res: true
                }
                this.$store.commit('SET_DISCRETA', response)       
      
            },
            viewMap(){
                alert('o mapa está sendo gerado ...')
            }
        }
    }
</script>

<style>
    .clear {
        clear: both;
    }
    .title-box {
        font-size: 2em;
        color: #363636;
        padding: 15px;
    }
    form{
        margin-bottom: 35px;
    }
    .md-table-head {
        text-transform: uppercase;
        text-align: left !important;
    }
    .total {
        font-weight: 700 !important;
    }
</style>
