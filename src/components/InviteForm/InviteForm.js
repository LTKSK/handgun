import { mapGetters, mapActions } from 'vuex'
import { ADD_ICON, GET_USERS } from '@/store/mutation-types'
import { fetchUserIcon } from '@/module/webapiRepository'
export default {
  name: 'invite-form',
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
  },
  methods: {
    ...mapActions([
      ADD_ICON,
      GET_USERS,
    ]),
    getIconSource(username) {
      let icon_data = this.icon(username)
      if (icon_data) {
        return URL.createObjectURL(icon_data)
      }
      fetchUserIcon(username)
        .then(icon => {
          this.ADD_ICON({username, icon})
          return icon
        })
    },
    inviteUser() {
      // todo invite
    }
  },
  mounted() {
    this.GET_USERS()
      .then(() => {
        this.users_data = []
        for(let user of this.users) {
          this.users_data.push({name: user.name,
                                enabled: false})
        }
      })
  }
}
