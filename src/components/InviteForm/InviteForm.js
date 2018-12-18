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
      "users",
      "icon",
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
      const enabled_users = this.users_data.filter(user => user.enabled)
      console.log(this.channel, enabled_users)
      // todo: get channelname from parent component
      // putChannelUsers(this.channel, enabled_users, this.header)
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
