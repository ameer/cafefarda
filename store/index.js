export const state = () => ({
  user: JSON.parse(window.localStorage.getItem('user')),
})

export const mutations = {
  setUser(state, user) {
    window.localStorage.setItem('user', JSON.stringify(user))
    state.user = user
  },
}
