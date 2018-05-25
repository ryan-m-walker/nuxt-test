<template>
  <section>
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
    <a :href="`/docs/${pdf}`">View Document</a>
    <a :href="`/document/${link}`">More Details</a>
    <h4>Tags:</h4>
    <ul>
      <li v-for="tag in tags" :key="tag">
        {{ tag }}
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: [
    'title', 
    'description', 
    'pdf', 
    'link',
    'tags'
  ]
}
</script>

