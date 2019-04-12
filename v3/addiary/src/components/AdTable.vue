<template>
  <div class="container-fluid">
    <div v-if="regError" class="alert alert-danger" role="alert">{{ regError }}</div>
    TABLE!
  </div>
</template>

<script>
export default {
  name: "AdTable",
  props: {
    
  },
  data() {
    return {
      regError: null
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>