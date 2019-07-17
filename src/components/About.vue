<template>
  <div class="page has-navbar" v-nav="{ title: '计算结果', showBackButton: true, onBackButtonClick: back }">
    <div class="page-content text-center">
      <md-button class="button button-dark button-block" @click.native="toMap">
        显示地图
      </md-button>
      <list class="list list-borderless hl-list list-ios">
        <item class="item item-borderless" v-for="(item,index) in msg" :key="index">
          <div class="item item-divider">
            {{index+1}}.名称：{{item.name}}
          </div>
          <div class="item">
            经度：{{item.data_lng}}
          </div>
          <div class="item">
            纬度：{{item.data_lat}}
          </div>
          <div class="item">
            距离：{{Math.round(item.distances)}}米
          </div>
          <div class="item">
            类型：{{item.type}}
          </div>
        </item>
      </list>
    </div>
  </div>
</template>
<script>
  export default {
    created(){
      if( this.$route.params.msg  ){
        this.msg = this.$route.params.msg.data
      }else {
        this.msg = JSON.parse(localStorage.getItem('msg'));
      }
    },
    data(){
      return{
        msg:''
      }
    },
    methods: {
      back() {
        $router.back('/')
      },
      toMap(){
        $router.push({
          name:'ShowMap',
          params:{
            msg:this.msg
          }
        })
      }
    }
  }
</script>
<style scoped>

</style>
