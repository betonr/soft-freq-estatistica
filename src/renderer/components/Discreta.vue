<template>
    <section>
        <p class="title-box">&#10149; Variáveis Discretas - insira os valores abaixo:</p>

        <formEnvio id="discreta"></formEnvio>

        <h2 class="md-title" style="padding: 15px;">Resultado:</h2>
        <md-table v-once>
            <md-table-header>
                <md-table-row>
                    <md-table-head>Titulo</md-table-head>
                    <md-table-head md-numeric>frequência</md-table-head>
                    <md-table-head md-numeric>frequência</md-table-head>
                    <md-table-head md-numeric>frequência</md-table-head>
                    <md-table-head md-numeric>frequência</md-table-head>
                </md-table-row>
            </md-table-header>

            <md-table-body>
                <md-table-row v-for="(row, index) in 3" :key="index">
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
</style>
