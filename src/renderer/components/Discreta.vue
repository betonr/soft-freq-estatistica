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
                    Mediana: {{ discreta.mediana }} 
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
                        <md-table-cell>{{ (discreta.fri[indice]).toFixed(4) }}</md-table-cell>
                        <md-table-cell>{{ (discreta.fria[indice]).toFixed(4) }}</md-table-cell>
                    </md-table-row>
                    <md-table-row>
                        <md-table-cell></md-table-cell>
                        <md-table-cell></md-table-cell>
                        <md-table-cell class="total">&Sigma;fi = {{ discreta.fi.reduce((a, b) => a + b, 0) }}</md-table-cell>
                        <md-table-cell></md-table-cell>
                        <md-table-cell class="total">&Sigma;fri = {{ (discreta.fri.reduce((a, b) => a + b, 0)).toFixed(4) }}</md-table-cell>
                        <md-table-cell></md-table-cell>
                    </md-table-row>
                </md-table-body>
            </md-table>
        </article>
        <div class="grafico" v-show="graficoView">
            <vue-chart
                chart-type="PieChart"
                :columns="columns"
                :rows="rows"
                :options="options"
            ></vue-chart>
            <md-button class="close" @click="graficoView=false">
                <md-icon>close</md-icon>
            </md-button>
        </div>
    </section>
</template>

<script>
    import { mapState } from 'vuex'
    
    export default {
        data() {
            return {
                graficoView: false,
                columns: [{
                    'type': 'string',
                    'label': 'tema'
                }, {
                    'type': 'number',
                    'label': 'frequência'
                }],
                rows: [],
                options: {
                    title: "",
                    width: 800,
                    height: 450,
                    is3D: true
                }
            }
        },
        computed: mapState([
            'discreta'
        ]),
        methods: {
            generateTable() {
                let values = this.discreta.values.trim().replace(',','.').replace('  ',' ').replace('   ',' ').replace(/\n/g,' ');
                let response = {}

                let numbers = (values.split(' ')).sort((a,b) => a-b).map(Number);
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

                //media, mediana
                let mediana = numbers.length%2 != 0 ? numbers[parseInt(numbers.length/2)] : 
                        (parseInt(numbers[parseInt(numbers.length/2)-1]) + parseInt(numbers[parseInt(numbers.length/2)]) )/2;
                let media = (numbers.reduce((a, b) => a + b, 0)/numbers.length).toFixed(1);

                response = {
                    ...this.discreta,
                    indice, fi, fia, fri, fria, mediana, media, res: true
                }
                this.$store.commit('SET_DISCRETA', response)       
            },
            viewMap(){
                this.rows = []
                
                this.options.title = this.discreta.title;
                let indice = this.discreta.indice;
                let fi = this.discreta.fi;

                indice.forEach((item, ind, array) => {
                    this.rows.push([indice[ind].toString(), fi[ind]])
                })
                this.graficoView = true;
            }
        }
    }
</script>

<style scoped>
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
    .grafico {
        background: rgba(0,0,0,0.5);
        position: absolute;
        top:0;
        left:0;
        right:0;
        bottom:0;
        padding: 50px 0 0 50px;
    }
    .close {
        position: absolute;
        top: 0;
        right: 0;
        color: white;
    }
</style>
