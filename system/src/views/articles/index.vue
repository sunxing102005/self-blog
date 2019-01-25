<template>
    <div class="articles-container">
        <el-header style="padding-top:20px">
            <el-row>
                <el-col :offset="0" :span="4">
                    <el-input v-model="params.key" placeholder="关键字"></el-input>
                </el-col>
                <el-col :offset="5" :span="6">
                    <el-button type="primary" icon="el-icon-search" @click="fetchData">搜索</el-button>
                    <el-button type="primary" @click="$router.push('/articles/publish')">发布文章</el-button>
                </el-col>
            </el-row>
        </el-header>
        <el-main>
            <el-table :data="tableList" border style="width: 100%">
                <el-table-column prop="title" label="文章名称" width="200">
                </el-table-column>
                <el-table-column prop="category" label="分类" width="200">
                    <template slot-scope="scope">{{scope.row.category.slug}}</template>
                </el-table-column>
                <el-table-column prop="view" label="阅读量" width="180">
                </el-table-column>
                <el-table-column prop="create_time" label="发布时间">
                    <template slot-scope="scope">
                        <span>{{new Date(scope.row.create_time * 1000).toLocaleString()}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="onEdit(scope.row.id)">编辑</el-button>
                        <el-button type="danger" size="mini" @click="onDelete(scope.row.id,scope.row.index)">删除</el-button>
                    </template>

                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination background layout="prev, pager, next" @current-change="changePage" :total="total" :page-size="pageSize">
            </el-pagination>
        </el-main>
    </div>
</template>

<script>
import { getContent,delArticle} from '@/api/content'
export default {
    name: 'articles',
  data() {

    return {
      tableList: [],
      params:{key:'',type:'default'},
      total:0,
      pageSize:10,
      pageIndex:1
    }
  },
  created() {
    this.fetchData()
  },
  components:{
  },
  filters: {
  },
  methods: {
      changePage(index){
          this.pageIndex = index;
          this.fetchData();
      },
    fetchData(){
      const param = {
       ...this.params,pageSize:this.pageSize,page:this.pageIndex
      };
      getContent(param).then(res=>{
          const data = res.data;
          console.log('data',data);
        this.total = data.count;
        this.tableList =data.data;
        this.total = data.data.length;
      }).catch((err)=>{
            this.$message.error({
            message: '文章查询失败'
          });
      })
    },
    onEdit(id){
         this.$router.push({
                        path:"/articles/publish",
                        query: {
                          id
                        }
                      });
    },
    onDelete(id,index){
        
        delArticle({id}).then(res=>{
            if(res.errno==0){
                this.$message.success({
                    message: '删除成功！'
                });
                this.tableList.splice(index,1);
            }else{
                this.$message.error({
                    message: '删除失败！'
                });
            }
            
        })
    }
  }
}
</script>
<style>
.el-table .warning-row {
    background: oldlace;
}

.el-table .success-row {
    background-color: azure;
}
.filename {
    transition: all 200ms linear;
}
.filename:hover {
    color: aquamarine;
}
</style>
