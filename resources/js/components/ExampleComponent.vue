<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Laravel </div>
 
                    <div class="card-body">
                        <ul>
                            <template v-for="(item ,index) in arrlist " >
                               <li :key="index">
                                   <h3>{{item.title}}</h3>
                                   <p>{{item.description}}</p>
                               </li>
                            </template>
                        </ul>
                       
 
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
        },
         
        methods: {
            createProduct() {
                 var self = this;
                axios.get('/vueitems')
                .then(response => {
                self.arrlist = response.data;
                console.log(self.arrlist)
                  
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