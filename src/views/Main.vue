<template>
  <div class="main">
    <mainTable />
  </div>
</template>

<script>
// @ is an alias to /src
import mainTable from '@/components/mainTable.vue'

export default {
  name: 'Main',
  components: {
    mainTable
  }
}
</script>