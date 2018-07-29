import Vue from 'vue'
import Router from 'vue-router'
import Chat from '@/components/Chat/Chat'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    // {
    //   path: '/',
    //   name: 'root',
    // },
    {
      path: '/channel/:channelname',
      name: 'channel',
      component: Chat
    }
  ]
})
