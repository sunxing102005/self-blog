<template>
    <div class="publish-container">
        <el-form class="publish-form" label-width="120px" :model="article">

            <el-row>
                <el-col :span="24">
                    <el-form-item label="文章标题">
                        <el-input v-model="article.title"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="文章标示">
                <el-input v-model="article.sign"></el-input>
            </el-form-item>
            <el-form-item label="文章分类">
                <el-select v-model="article.category_id" clearable placeholder="请选择">
                    <el-option :label="item.name" :value="item.id" v-for="item in category" :key="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="缩略图">
                <el-input v-model="article.thumb"></el-input>
            </el-form-item>
            <el-form-item label="发布时间">
                <el-date-picker v-model="article.date" type="datetime" placeholder="选择日期时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="状态">
                <el-radio v-model="article.status" label="0">草稿</el-radio>
                <el-radio v-model="article.status" label="99">发布</el-radio>
            </el-form-item>
            <el-form-item label="标签">
                <el-checkbox-group v-model="article.tag">
                    <el-checkbox v-for="(item,index) in tags" :key="index" :label="item.id">{{item.name}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="文章内容">
                        <mavon-editor @imgAdd="imgAdd" ref=md v-model="article.markdown"></mavon-editor>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item>
                <el-button class="primary" @click="saveArticle">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { getList} from '@/api/category'
import { upload} from '@/api/image'
import { addArticle,getContent} from '@/api/content'
import { mavonEditor } from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
    export default {
        name: "publish",
        components:{
            mavonEditor
        },
        data(){
            return {
                article:{
                    tag:[]
                },
                tags:[],
                category:[]
            }
        },
        created(){
            this.getOptiopns('category','category');
            this.getOptiopns('tag','tags');
            if(this.$route.query.id){
                this.getContent(this.$route.query.id);
            }
        },
        methods:{
            getContent(id){
                getContent({id}).then(res=>{
                    res.data.date = new Date(res.data.create_time*1000);
                    this.article = {...res.data,tag:res.data.tag.map(val=>val.id)}

                })
            },
            getOptiopns(type,target){
                getList({type}).then(res=>{
                    this[target] = res.data;
                })
            },
            imgAdd(pos,$file){
                let formdata = new FormData();
                formdata.append('image',$file);
                upload(formdata).then(res=>{
                    if(res.errno==0&&res.data.url){
                        this.$refs['md'].$img2Url(pos,res.data.url);
                    }
                })
            },
            saveArticle(){
                this.article.content = this.$refs['md'].d_render;
                // 处理发布时间
                let seperator1 = '-'
                let seperator2 = ':'
                let month = this.article.date.getMonth() + 1
                let strDate = this.article.date.getDate()
                if (month >= 1 && month <= 9) {
                    month = '0' + month
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = '0' + strDate
                }
                this.article.create_time = this.article.date.getFullYear() + seperator1 + month + seperator1 + strDate + ' ' + this.article.date.getHours() + seperator2 + this.article.date.getMinutes() + seperator2 + this.article.date.getSeconds()
                // 文章类型
                this.article.type = 'post'
                if(this.article.id){
                    addArticle(this.article,this.article.id).then(res=>{
                        if(res.errno==0&&res.data.id){
                            // debugger
                            this.$router.push('/articles/content');
                        }
                    })
                }else{
                    addArticle(this.article).then(res=>{
                        if(res.errno==0&&res.data.id){
                            this.$router.push('/articles/content');
                        }
                    })
                }
            }

        }
    }
</script>

<style  >
.publish-container {
    width: 100%;
}
.publish-form {
    width: 800px;
}
.publish-container .el-form-item__content {
    text-align: left !important;
}
</style>
