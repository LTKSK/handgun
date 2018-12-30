import {
  mapGetters,
  mapActions
} from "vuex"
import {
  GET_ICON,
  GET_USERS
} from "@/store/mutation-types"
import {
  putChannelUsers,
} from "@/module/webapiRepository"

export default {
  name: "invite-form",
  data() {
    return {
      users_data: [],
    }
  },
  computed: {
    ...mapGetters([
      "logged_in_user",
      "header",
      "users",
      "channel_users",
      "icon"
    ]),
    channel() {
      return this.$route.params.channelname
    }
  },
  methods: {
    ...mapActions([
      GET_ICON,
      GET_USERS,
    ]),
    getIconSource(username) {
      return this.icon(username)
    },
    backToBeforePage() {
      this.$router.go(-1)
    },
    invite() {
      const enabled_users = this.users_data.filter(user => {
        if (!user.enabled) {
          return false
        }
        // User should not exist in channel_users.
        if (this.channel_users(this.channel).filter(channel_user => channel_user.name === user.name).length === 0) {
          return false
        }
        return true
      })
      // console.log(this.channel_users(this.channel))
      putChannelUsers(this.channel, enabled_users, this.header)
    },
    _setupUsers: async function() {
      this.users_data = []
      await this.GET_USERS()
      for(let user of this.users) {
        // ignore logged in user
        if (user.name === this.logged_in_user) {
          continue
        }
        await this.GET_ICON(user.name)
        this.users_data.push({name: user.name,
                              enabled: false})
      }
    }
  },
  mounted() {
    this._setupUsers()
  }
}
