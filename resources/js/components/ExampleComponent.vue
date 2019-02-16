<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">Laravel </div>


                    <div class="card-body">
                        <table class="table table-bordered">
                            <thead>
                            <tr>
                                 <th>STT</th>
                                <th>Tên</th>
                                <th>Chế Độ </th>
                                <th colspan="2" width="60px">Tùy Chọn </th>
                            </tr>
                            </thead>
                            <tbody>
                                <template v-for="(item ,index) in arrlist " >
                                    <tr  :key="index" class='itemuser'>
                                        <td>{{++index}}</td>
                                        <td>{{item.username}}</td>
                                        <td>{{item.playmode}}</td>
                                        <td ><div class="btn btn-danger">Sửa</div></td>
                                         <td><div class="btn btn-danger" @click="deleteItem(index,item.id)">Xóa</div></td>
                                    </tr>
                            </template>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        data(){
            return{
                arrlist : [],
            }
        },
        mounted() {
            console.log('Component mounted.')
              this.createProduct();
              this.listUser();
        },

        methods: {
             listUser() {
                return new Promise((resolve, reject) => {
                    axios.get('/vueitems').then(res => {

                        if (res.status == 200) {
                            if (res.data.status) {
                                resolve(res.data)
                            } else {
                                reject(res.data.message);

                            }

                        } else {
                            reject(res.statusText);
                        }
                    }).catch(error => {
                        reject(error.message);
                    });
                });
            },



            deleteItem(index,id){
                console.log(this.arrlist);

                 alert(id)
            },
            createProduct() {
                 var self = this;
                axios.get('/vueitems').then(response => {

                    self.arrlist = response.data.data;


                })
                .catch(error => {
                    console.log(error)
                })
            }
        }
    }
</script>

<style lang="scss" scoped>

   h3 {
       color: red;
   }

</style>
