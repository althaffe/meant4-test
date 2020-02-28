<template>
  <div id="app">
    <h1>Feedback Form</h1>
    <Form />
  </div>
</template>

<script>
import Form from "./components/Form.vue";

export default {
  name: "App",
  components: {
    Form
  }
};
</script>

<style>
html {
  box-sizing: border-box;
}
*,
*:before,
*:after {
  box-sizing: inherit;
}
body {
  background: aliceblue;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 5rem auto;
  max-width: 30rem;
  background: #fff;
  padding: 20px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
}
h1 {
  text-align: center;
  margin-top: 0;
}
</style>
