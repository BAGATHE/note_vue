import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from './components/pages/LoginPage.vue';
import RegisterPage from './components/pages/RegisterPage.vue';
import DashboardPage from './components/pages/DashboardPage.vue';



axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.interceptors.request.use(function (config) {
  config.headers['X-Binarybox-Api-Key'] = import.meta.env.VITE_API_KEY;

  const token = localStorage.getItem('token'); // Get the token from local storage
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`; // Add the Bearer token correctly
  }
  
  return config;
});

 
  
const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    { path: '/', component: LoginPage },
    { path: '/register', component: RegisterPage },
    { path: '/dashboard', component: DashboardPage }
  ],
});
  
createApp(App).use(router).mount('#app');