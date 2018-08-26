import Vue from 'vue'
import Router from 'vue-router'
import Chat from '@/components/Chat/Chat'
import ChannelList from '@/components/Channel/ChannelList'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'root',
      component: ChannelList
    },
    {
      path: '/channel/:channelname',
      name: 'channel',
      component: Chat
    }
  ]
})
