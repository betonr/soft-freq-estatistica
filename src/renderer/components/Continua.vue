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

        <article v-show="continua.res">
            <hr>
            <h2 class="md-title" style="padding: 15px;">
                Resultado:
                <md-button class="md-raised md-warn" style="margin-top: -5px; color: white;" @click="viewMap">
                    <md-icon>search</md-icon> Ver Gráfico
                </md-button>
                <span style="float:right;">
                    Média: {{ continua.media }} |
                    Mediana: {{ continua.mediana }} 
                </span> 
            </h2>
            <md-table>
                <md-table-header>
                    <md-table-row>
                        <md-table-head md-numeric>I</md-table-head>
                        <md-table-head md-numeric>{{ continua.title }}</md-table-head>
                        <md-table-head md-numeric>fi</md-table-head>
                        <md-table-head md-numeric>Fi.a</md-table-head>
                        <md-table-head md-numeric>Fri</md-table-head>
                        <md-table-head md-numeric>Fri.a</md-table-head>
                    </md-table-row>
                </md-table-header>

                <md-table-body>
                    <md-table-row v-for="(value, indice) in continua.indice" :key="indice">
                        <md-table-cell>{{ indice+1 }}</md-table-cell>
                        <md-table-cell>{{ value }} |-----<span v-if="indice==continua.indice.length-1">| </span> {{ value+continua.amplitude }}</md-table-cell>
                        <md-table-cell>{{ continua.fi[indice] }}</md-table-cell>
                        <md-table-cell>{{ continua.fia[indice] }}</md-table-cell>
                        <md-table-cell>{{ (continua.fri[indice]).toFixed(4) }}</md-table-cell>
                        <md-table-cell>{{ (continua.fria[indice]).toFixed(4) }}</md-table-cell>
                    </md-table-row>
                    <md-table-row>
                        <md-table-cell></md-table-cell>
                        <md-table-cell></md-table-cell>
                        <md-table-cell class="total">&Sigma;fi = {{ continua.fi.reduce((a, b) => a + b, 0) }}</md-table-cell>
                        <md-table-cell></md-table-cell>
                        <md-table-cell class="total">&Sigma;fri = {{ (continua.fri.reduce((a, b) => a + b, 0)).toFixed(4) }}</md-table-cell>
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
        computed: mapState([
            'continua'
        ]),
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
        methods: {
            generateTable() {
                let values = this.continua.values.trim().replace(',','.').replace('  ',' ').replace('   ',' ').replace(/\n/g,' ');
                let response = {}

                let numbers = (values.split(' ')).sort((a,b) => a-b).map(parseFloat);
                let max = Math.max.apply(null, numbers);
                let min = Math.min.apply(null, numbers);

                //quantidade de classes e amplitude
                let i = (1+(3.3*(Math.log10(numbers.length)))).toFixed()
                let amplitude = (max-min)/i

                //calc indice
                let indice = []
                for(let cont=0; cont<i; cont++){
                    indice[cont] = min+(amplitude*cont)
                }          

                //fi e fia
                let fi = [];
                let fia = [];
                var soma = 0;
                indice.forEach((val, ind) => {
                    let freq = 0;
                    numbers.map(values => {
                        if(ind != i-1){
                            if(values >= val && values < (val+amplitude) ) freq++;
                        }else{
                            if(values >= val && values <= (val+amplitude) ) freq++;
                        }                        
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
                let xi = indice.map( (val) => val+(amplitude/2) )
                
                soma = 0;
                xi.forEach((item, indice, array) => {
                    soma+=item*fi[indice]
                });
                let media = soma/(fi.reduce((a, b) => a + b, 0) );

                let mediana = 0;
                
                response = {
                    ...this.continua,
                    indice, fi, fia, fri, fria, media, mediana, min, max, amplitude, res: true
                }
                this.$store.commit('SET_CONTINUA', response) 
            },
            viewMap(){
                this.rows = []
                
                this.options.title = this.continua.title;
                let indice = this.continua.indice;
                let fi = this.continua.fi;

                indice.forEach((item, ind, array) => {
                    let secValue = indice[ind]+this.continua.amplitude
                    let joinString = ind==this.continua.indice.length-1 ? " |----| " : " |---- ";
                    this.rows.push([indice[ind].toString()+joinString+secValue.toString(), fi[ind]])
                })
                this.graficoView = true;
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
