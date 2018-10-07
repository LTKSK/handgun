import { mapGetters, mapActions } from 'vuex'
import { GET_ICON, GET_USERS } from '@/store/mutation-types'
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
      GET_ICON,
      GET_USERS,
    ]),
    getIconSource(username) {
      return this.icon(username)
    },
    inviteUser() {
      // todo invite
    }
  },
  mounted() {
    this.users_data = []
    this.GET_USERS()
      .then(() => {
        for(let user of this.users) {
          this.GET_ICON(user.name)
            .then(() => {
              this.users_data.push({name: user.name,
                                    enabled: false})
            })
        }
      })
  }
}
