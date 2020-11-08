<template>
  <div class="cv-layout">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@master/devicon.min.css">

    <!-- .main-div is the block with white background -->
    <div class="main-div">
      <!-- <Content /> is to show the rendered markdown content of this page -->
      <Content class="content" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CVLayout',
}

</script>
