<template>
  <section>
    <h2>Documents</h2>
    <input type="text" v-model="query" v-on:keyup="onChange" placeholder="search">
    <ul>
      <li v-for="item in data" :key="item.file">
        {{ item.title }}
        <a :href="`/document/${item.articleUrl}`">Link</a>
        <a :href="'/docs/' + item.file">Doc</a>
      </li>
    </ul>
  </section>
</template>

<script>
  import Fuse from 'fuse.js';
  import data from '~/data/docs.json';

  console.log(Fuse);

  export default {
    data() {
      return {
        query: '',
        data
      }
    },
    methods: {
      onChange($event) {
        if (this.query) {
          const options = {
            shouldSort: false,
            threshold: 0.6,
            location: 0,
            distance: 100,
            maxPatternLength: 32,
            minMatchCharLength: 1,
            keys: [
              'title',
              'tags',
              'description',
              'data',
              'date_added'
            ]
          }
          const fuse = new Fuse(data, options);
          const result = fuse.search(this.query);
          this.data = result;
        } else {
          this.data = data;
        }
      }
    }
  }
</script>

<style>

</style>
