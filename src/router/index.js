import Vue from 'vue'
import store from '@/store'
import Router from 'vue-router'
import Chat from '@/components/Chat'
import Channel from '@/components/Channel'
import RegisterForm from '@/components/RegisterForm'
import LoginForm from '@/components/LoginForm';
import InviteForm from '@/components/InviteForm';

Vue.use(Router)

const router = new Router({
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
      path: '/channel',
      name: 'channel',
      component: Channel,
    },
    {
      path: '/channel/:channelname',
      name: 'chat',
      component: Chat
    },
    {
      path: '/invite',
      name: 'invite',
      component: InviteForm
    },
    {
      path: '*',
      component: LoginForm
    }
  ]
})

router.beforeEach((to, from, next) => {
  // if user has logged in, redirect to channel
  if (to.path === "/" && store.getters.user){
   next({path: "/channel", query: {redirect: to.fullPath}})
   return
  }
  next()
})

export default router
