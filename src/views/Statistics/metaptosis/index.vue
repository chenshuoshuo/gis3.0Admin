<template>

  <div :class="className" style="width:100%;height: 300px;background: darkgoldenrod;" id="className"></div>

</template>

<script>
  import echarts from 'echarts'

  require('echarts') // echarts theme
//import {debounce} from '@/utils'

  const animationDuration = 6000
  export default {
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '300px'
      }
    },
    data() {
      return {
        chart: null
      }
    },
    mounted() {
    	this.initChart()
//    this.__resizeHanlder = debounce(() => {
//      if (this.chart) {
//        this.chart.resize()
//      }
//    }, 100)
//    window.addEventListener('resize', this.__resizeHanlder)
    },
    beforeDestroy() {
//    if (!this.chart) {
//
//    }
//    window.removeEventListener('resize', this.__resizeHanlder)
//    this.chart.dispose()
//    this.chart = null
    },
    methods: {
      initChart() {
        this.chart = echarts.init(document.getElementById('className'))
//      let category = cg ? cg : ['1号教学楼', '2号教学楼', '3号教学楼', '篮球场', '教务处', '1号食堂', '2号食堂']
//      let barData = data ? data : [3100, 2142, 1218, 581, 431, 383, 163]
        this.chart.setOption({
		  series : [
		   {
		    name: '访问来源',
		    type: 'pie',
		    radius: '55%',
		    itemStyle: {
		    normal: {
		      // 阴影的大小
		      shadowBlur: 200,
		      // 阴影水平方向上的偏移
		      shadowOffsetX: 0,
		      // 阴影垂直方向上的偏移
		      shadowOffsetY: 0,
		      // 阴影颜色
		      shadowColor: 'rgba(0, 0, 0, 0.5)'
		     }
		    },
		    data:[
		     {value:400, name:'搜索引擎'},
		     {value:335, name:'直接访问'},
		     {value:310, name:'邮件营销'},
		     {value:274, name:'联盟广告'},
		     {value:235, name:'视频广告'}
		    ]
		   }
		  ]
		 })
      }
    }
  }
</script>
