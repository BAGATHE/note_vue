<template>
    <div class="row justify-content-md-center">
        <div class="col-12">
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Learning App</a>
                    <div class="d-flex">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <span class="nav-link">{{ user.name || 'Guest' }}</span>
                            </li>
                            <li class="nav-item">
                                <a @click="logoutAction()" class="nav-link " aria-current="page" href="#">Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    </div>
    <div class="container">
        <slot></slot>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'LayoutDiv',
    data() {
     return {
       user:{},
     };
   },
   created(){
    const user = localStorage.getItem('user');
        if (user) {
            this.user = JSON.parse(user);
        }
   },
   methods: {
    logoutAction () {
       axios.post('/logout',{}, { headers:{Authorization: 'Bearer ' + localStorage.getItem('token')}})
       .then((r) => {
           localStorage.setItem('token', "")
           localStorage.removeItem('user');
           this.$router.push('/')
           return r
       })
       .catch((e) => {
         return e
       });
     }
  
   },
};
</script>