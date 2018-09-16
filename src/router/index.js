import Vue from 'vue'
import Router from 'vue-router'
import Chat from '@/components/Chat'
import Channel from '@/components/Channel/Channel.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'root',
      component: Channel
    },
    {
      path: '/channel/:channelname',
      name: 'channel',
      component: Chat
    }
  ]
})
