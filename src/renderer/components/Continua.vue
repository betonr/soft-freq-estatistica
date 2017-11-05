<template>
    <section>
        <p class="title-box">&#10149; Variáveis Continuas - insira os valores abaixo:</p>

        <md-input-container>
            <label>Titulo</label>
            <md-input placeholder="O que são os dados?"></md-input>
        </md-input-container>

        <md-input-container>
            <label>Valores separados por espaços</label>
            <md-textarea></md-textarea>
        </md-input-container>

        <md-button class="md-raised md-accent" style="float: right; color: white;">GERAR</md-button>
        <div class="clear"></div>

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
  export default {

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
