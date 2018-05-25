<template>
  <section>
    <h2>Documents</h2>
    <input type="text" v-model="query" v-on:keyup="onChange" placeholder="search">
    <ul>
      <li v-for="item in data" :key="item.file">
        <doc-card
          :tags="item.tags"
          :description="item.description"
          :pdf="item.file"
          :link="item.articleUrl"
          :title="item.title">
        </doc-card>
      </li>
    </ul>
  </section>
</template>

<script>
  import Fuse from 'fuse.js';
  import data from '~/data/docs.json';
  import DocCard from '~/components/DocCard.vue';

  console.log(DocCard);

  export default {
    data() {
      return {
        query: '',
        data
      }
    },
    components: {
      DocCard
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
