<template>
    <form>
        <md-input-container>
            <label>Titulo</label>
            <md-input placeholder="O que são os dados?" v-model="title"></md-input>
        </md-input-container>

        <md-input-container>
            <label>Valores separados por espaços</label>
            <md-textarea v-model="values"></md-textarea>
        </md-input-container>

        <md-button class="md-raised md-accent" style="float: right; color: white;" @click="generateTable">GERAR</md-button>
    
        <div class="clear"></div>
    </form>
</template>

<script>
    export default {
        props: ['id'],
        data() {
            return {
                title: '',
                values: ''
            }
        },
        methods: {
            generateTable() {
                if(this.id == 'continua'){
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

                    console.log(indice, frequence)                
                }
            }
        }
    }
</script>

<style>
    .clear {
        clear: both;
    }   
</style>