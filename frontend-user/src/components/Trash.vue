<template>
  <div style="position: relative; height: 20em">
    <div style="position: absolute; width:80%; top: 50%; left: 50%; transform: translate(-50%, -50%);">
      <svg  xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 24 24" fill="none" :stroke="color2"
           stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2 ma-auto">
        <path d="M3 6h18"></path>
        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
        <line x1="10" x2="10" y1="11" y2="17"></line>
        <line x1="14" x2="14" y1="11" y2="17"></line>
      </svg>
    </div>
    <div style="position: absolute; width:80%; top: 50%; left: 50%; transform: translate(-50%, -50%);" :style="polygonStyle">
      <svg xmlns="http://www.w3.org/2000/svg" width="100%"
           viewBox="0 0 24 24" fill="none" :stroke="color"
           stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2">
        <path d="M3 6h18"></path>
        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
        <line x1="10" x2="10" y1="11" y2="17"></line>
        <line x1="14" x2="14" y1="11" y2="17"></line>
      </svg>
    </div>
  </div>
</template>

<script>

export default {
    props: {
    percentage: {
      type: Number,
      default: 50
    },
    closed: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    polygonStyle() {
      return {
        clipPath: `polygon(0 0, 100% 0, 100% ${100 - Math.round(this.localPercentage)}%, 0 ${Math.ceil(100 - this.localPercentage)}%)`,
      };
    },
    color(){
      if (!this.closed){
        return "white"
      }
      return "#26A69A"
    },
    color2(){
      if (!this.closed){
        return "#26A69A"
      }
      return "#37474F"
    },
    localPercentage(){
      if (!this.closed){
        return 71
      }
      return this.percentage
    }
  },
}
</script>
