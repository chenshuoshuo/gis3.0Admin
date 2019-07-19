<template>
    <div class="level-selector">
        <ul class="level-list">
            <li class="level-add" :class="{'is-disabled':isTop}" @click="addLevel">
                <i class="iconfont vue-floor-up"></i>
            </li>
            <li class="level-item" v-for="(item,index) in dispalyLevel" :key="item.level" :class="{'current-level':currentIndex===index}">
                <span class="level"  @click="changeLevel(item)">{{item.name}}</span>
            </li>
            <li class="level-add" :class="{'is-disabled':isBottom}" @click="reduceLevel">
                <i class="iconfont vue-floor-down"></i>
            </li>
        </ul>
    </div>
</template>
<script>
    /**
     *  0是1F  -1是B1
     */
    export default {
      name: 'level-selector',
      props: {
        minLevel: {
          type: Number,
          require: true
        },
        maxLevel: {
          type: Number,
          require: true
        },
        size: {
          type: Number,
          default: 5
        },
        currentFloor: {
          type: Number,
          default: 0
        }
      },
      data() {
        return {
          floors:[],
          dispalyLevel:[],
          currentLevel: null,
          currentIndex: 0,
          isTop: false,
          isBottom: false
        }
      },
      methods: {
        addLevel() {
          if (this.floors.indexOf(this.currentLevel) === 0) return
          const index = this.floors.indexOf(this.currentLevel) - 1 < 0
            ? 0 : this.floors.indexOf(this.currentLevel) - 1
          this.currentLevel = this.floors[index]
          this.$emit('change-level', this.currentLevel.level)
        },
        reduceLevel() {
          if (this.floors.indexOf(this.currentLevel) === this.floors.length - 1) return
          const index = this.floors.indexOf(this.currentLevel) + 1 > this.floors.length - 1
            ? this.floors.length - 1 : this.floors.indexOf(this.currentLevel) + 1
          this.currentLevel = this.floors[index]
          this.$emit('change-level', this.currentLevel.level)
        },
        changeLevel(level) {
          this.currentLevel = this.floors[this.floors.indexOf(level)]
          this.generateDispalyLevel()
          this.currentIndex = this.dispalyLevel.indexOf(this.currentLevel)
          this.$emit('change-level', this.currentLevel.level)
        },
        isVertex(){
          this.floors.indexOf(this.currentLevel) === 0
            ? this.isTop = true : this.isTop = false
          this.floors.indexOf(this.currentLevel) === this.floors.length - 1
            ? this.isBottom = true : this.isBottom = false
        },
        generateLevel(){
          var levelArr = []; var max = 0; var min = 0
          !(this.maxLevel > this.minLevel ? () => {
            max = this.maxLevel
            min = this.minLevel
          } : () => {
            max = this.minLevel
            min = this.maxLevel
            console.warn('The maxLevel must be bigger than minLevel ')
          })()
          for (let i = min; i <= max; i++) {
            if (i >= 0) {
              levelArr.push({ name: i + 1 + 'F', level: i })
            } else {
              levelArr.push({ name: 'B' + Math.abs(i), level: i })
            }
          }
          this.floors = levelArr.reverse();
        },
        generateDispalyLevel(){
          if (this.floors.length < this.size){
            this.dispalyLevel = this.floors
            return
          } 
          let currentLevelIndex = this.floors.indexOf(this.currentLevel);
          if (currentLevelIndex >= Math.floor(this.size / 2)) {
            this.dispalyLevel = this.floors.slice(
              currentLevelIndex - Math.floor(this.size / 2) > this.floors.length - this.size
                ? this.floors.length - this.size : currentLevelIndex - Math.floor(this.size / 2),
              currentLevelIndex + Math.ceil(this.size / 2) >= this.floors.length ? this.floors.length : currentLevelIndex + Math.ceil(this.size / 2)
            )
          } else {
            this.dispalyLevel = this.floors.slice(0, this.size)
          }
        },
        setCurrentFloor(floor){
          setTimeout(() => {
            this.currentLevel = this.floors.filter((item) => item.level === floor)[0]
          }, 100);
        }
      },
      watch: {
        floors(){
          this.generateDispalyLevel()
        },
        currentLevel(){
          this.generateDispalyLevel()
          this.currentIndex = this.dispalyLevel.indexOf(this.currentLevel)
        },
        currentIndex(){
          this.generateDispalyLevel()
          this.isVertex()
        },
        minLevel(){
          this.generateLevel()
        },
        maxLevel(){
          this.generateLevel()
        }
      },
      beforeMount() {
        this.generateLevel()
        this.currentLevel = this.floors.filter((item) => item.level === this.currentFloor)[0]
        this.generateDispalyLevel()
        this.currentIndex = this.dispalyLevel.indexOf(this.currentLevel)
      }
    }
</script>
<style scoped>
    .level-list{
        padding: 0;
        margin: 0;
        list-style: none;
        width: 40px;
        background: #fff;
        border: 1px solid rgba(4, 4, 4, .1);
        box-shadow: 0 2px 4px rgba(4, 4, 4, .2);
        border-radius: 3px;
        margin-bottom: 20px;
    }
    .level-item{
        margin:  0 auto;
        height: 30px;
        line-height: 30px;
        text-align: center;
        color: #666;
        cursor: pointer;
        user-select:none;
    }
    .level-add{
        margin:  0 auto;
        height: 16px;
        line-height: 16px;
        text-align: center;
        color: #666;
        cursor: pointer;
        user-select:none;
    }
    .is-disabled{
        cursor: not-allowed;
        color: #aaa;
    }
    .current-level{
        background: #0A99f1;
        color: #fff;
    }
    @font-face {
      font-family: 'iconfont';
      src: url('//at.alicdn.com/t/font_954075_8do6ejkrruw.eot');
      src: url('//at.alicdn.com/t/font_954075_8do6ejkrruw.eot?#iefix') format('embedded-opentype'),
      url('//at.alicdn.com/t/font_954075_8do6ejkrruw.woff') format('woff'),
      url('//at.alicdn.com/t/font_954075_8do6ejkrruw.ttf') format('truetype'),
      url('//at.alicdn.com/t/font_954075_8do6ejkrruw.svg#iconfont') format('svg');
    }
    .iconfont {
      font-family:"iconfont" !important;
      font-size:12px;
      font-style:normal;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    .vue-floor-down:before { content: "\e602"; }

    .vue-floor-up:before { content: "\e603"; }
</style>
