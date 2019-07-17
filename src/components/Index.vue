<template>
  <div class="page has-navbar" v-nav="{ title: 'Home' }">
    <div class="page-content text-center">
      <von-input
        type="text"
        v-model="lng"
        placeholder="经度"
        label="经度">
      </von-input>
      <von-input
        type="text"
        v-model.number="lat"
        placeholder="纬度"
        label="纬度">
      </von-input>
      <div class="item item-divider">
        选择基站类型:
      </div>
        <von-checkbox :options="topics" v-model="chosenTopics" theme="positive"></von-checkbox>
        <md-button class="button button-calm button-block" @click.native="getpoint()">
          获取当前经纬度
        </md-button>
        <md-button class="md-button button button-balanced button-block" @click.native="clicked()">
          提交
        </md-button>
    </div>
  </div>
</template>
<script>
  import { mapMutations, mapActions} from 'vuex'
  export default {
     data () {
      return {
        lat:'',
        lng:'',
        chosenTopics: [],
        topics: []
      }
    },
    created(){
      this.$axios.get(this.$url).then(req=>{
        req.data.forEach((item,index)=>{
          this.topics.push(item);
        })
      });
      if(localStorage.getItem('point')){
        let point = JSON.parse(localStorage.getItem('point'));
        this.lat = point.lat;
        this.lng = point.lng;
       }else{
         // 百度地图API功能 
         this.getpoint();  
       }
    },
    methods:{
      ...mapMutations(['SetPoint']),
       // 百度地图API功能
       getpoint(){
        const self = this
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r){
          if(this.getStatus() == BMAP_STATUS_SUCCESS){
            var point ={};
            point.lat = r.point.lat;
            point.lng = r.point.lng;
            self.lat = r.point.lat;
            self.lng = r.point.lng;
           self.SetPoint(point);
          }
          else {
            alert('failed'+this.getStatus());
          }
        },{enableHighAccuracy: true});
      },
      clicked(){
        var reg=/^\d+(\.\d+)?$/
        if(reg.test(this.lng)==false||reg.test(this.lat)==false){ 
          $dialog.alert({
            // 效果
            effect: 'default',
            // 标题
            title: '提示',
            // 内容
            content: '经纬度必须为数字',
            // 按钮文本
            okText: '确定',
            // 按钮主题
            okTheme: 'assertive'
          })
          return false;
        }
        //data: {lat:lat,lng:lng,type:opTXT,typeIndex:index},
        if( this.lat==''||this.lat=='' ){
          $dialog.alert({
            // 效果
            effect: 'default',
            // 标题
            title: '提示',
            // 内容
            content: '请输入经纬度值',
            // 按钮文本
            okText: '确定',
            // 按钮主题
            okTheme: 'assertive'
          })
          return false
        }
        var point ={};
        point.lat = this.lat;
        point.lng = this.lng;
        localStorage.setItem('point',JSON.stringify(point));
        var type= []
        if( this.chosenTopics.length ){
          this.chosenTopics.forEach((item,index)=>{
            type.push(this.topics[item])
          })
        }else {
          type = this.topics
        };
        const self = this;
        this.$axios.post(this.$url+'/getresult',{
          lat:this.lat,
          lng:this.lng,
          type:type,
          typeIndex:this.chosenTopics
        }).then(function (req) {
          if(req.data.code ==1){
            $dialog.alert({
            // 效果
            effect: 'default',
            // 标题
            title: '提示',
            // 内容
            content: '数据库查询失败',
            // 按钮文本
            okText: '确定',
            // 按钮主题
            okTheme: 'assertive'
          })
          }
          if(req.data.code == 0){
            localStorage.setItem('msg',JSON.stringify(req.data.data));
            $router.push({
            name: 'AboutLink',
            params: {
              msg: req.data
            }
          })
          }
        })
      },
    },
    computed:{
    }
    }
</script>
<style>
  h2 {
    font-family: Candara,Calibri,Segoe,Segoe UI,Optima,Arial,sans-serif;
    color: #888;
  }
  .page.has-navbar .page-content {
    /*padding-top: 100px;*/
  }
</style>
