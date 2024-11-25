<template>
  <div class="card card-body">
    <h3 class="primary-font font-weight-bold mb-3 line-height-24">
      <span class="align-middle"> {{ count }} _ </span>
      <span class="font-size-13"
        ><NuxtLink :to="url"> {{ title }} </NuxtLink></span
      >
    </h3>
    <p class="font-size-13 m-b-0">
      <span class="text-success" v-if="total>0"
        >{{ parseFloat((this.count/this.total) * 100).toFixed(1) }} <i class="ti-arrow-up m-r-5"></i
      ></span>
      <span class="text-success" v-else
        >0 <i class="ti-arrow-up m-r-5"></i
      ></span>
      درصد
    </p>
  </div>
</template>

<script>
export default {
  props: {
    allticketcount: Number,
    count: Number,
    total:Number,
    url: String,
    persend: String,
    title: String,
    color: String
  },
};

</script>
