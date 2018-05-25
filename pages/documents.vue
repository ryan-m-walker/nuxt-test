<template>
  <section>
    <h2>Documents</h2>
    <ul>
      <li v-for="item in data" :key="item.file">
        {{ item.meta.title }}
        <a :href="'/docs/' + item.file">Doc</a>
      </li>
    </ul>
  </section>
</template>

<script>
  import data from '~/data/data.json';
  
  export default {
    data() {
      return { data }
    }
  }
</script>

<style>

</style>
