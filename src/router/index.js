import Vue from 'vue'
import Router from 'vue-router'
import Chat from '@/components/Chat'
import Channel from '@/components/Channel'
import RegisterForm from '@/components/RegisterForm'
import LoginForm from '@/components/LoginForm/';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginForm
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterForm
    },
    {
      path: '/Channel',
      name: 'channel',
      component: Channel
    },
    {
      path: '/channel/:channelname',
      name: 'chat',
      component: Chat
    },
    {
      path: '*',
      component: LoginForm
    }
  ]
})
