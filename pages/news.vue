<template>
  <section>
    <h2>News</h2>
    <input type="text" v-model="query" v-on:keyup="onChange" placeholder="search">
    <ul>
      <li v-for="item in data" :key="item.postUrl">
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
        <a :href="`/posts/${item.postUrl}`">Read more</a>
      </li>
    </ul>
  </section>
</template>

<script>
  import Fuse from 'fuse.js';
  import data from '~/data/posts.json';


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
