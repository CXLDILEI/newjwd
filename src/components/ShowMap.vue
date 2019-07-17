<template>
  <div class="page has-navbar" v-nav="{ title: '显示地图', showBackButton: true, onBackButtonClick: back }">
    <div class="page-content text-center">
          <baidu-map class="bm-view" :center="point" :zoom="15" :scroll-wheel-zoom="true" mapType="BMAP_SATELLITE_MAP">
            <bm-marker :position="point"  animation="BMAP_ANIMATION_BOUNCE">
              <bm-label content="我的位置" :labelStyle="{color: 'red', fontSize : '12px'}" :offset="{width: -15, height: -20}"/>
            </bm-marker>
            <bm-marker v-for="(item,index) in msg" :key="index" :position="{lng:item.data_lng,lat:item.data_lat}"  animation="BMAP_ANIMATION_BOUNCE">
               <bm-label :content="item.name" :labelStyle="{color: 'red', fontSize : '12px'}" :offset="{width: -15, height: -20}"/>
            </bm-marker>
            <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
          </baidu-map>
    </div>
  </div>
</template>

<script>
    export default {
      name: "ShowMap",
      data(){
        return{
          msg:'',
          point:''
        }
      },
      created(){
        if(this.$route.params.msg){
          this.msg = this.$route.params.msg;
        }else{
          this.msg = JSON.parse(localStorage.getItem('msg'));
        }

        this.point = JSON.parse(localStorage.getItem('point'))
      },
      methods: {
        back() {
          $router.back('/about')
        }
      }
    }
</script>

<style scoped>
.bm-view {
  width: 100%;
  height: 100%;
}
</style>
