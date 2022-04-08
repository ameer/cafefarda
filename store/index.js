export const state = () => ({
  user: JSON.parse(window.localStorage.getItem('user')),
  favs: window.localStorage.getItem('favs') === null ? [] : JSON.parse(window.localStorage.getItem('favs')) ,
})

export const mutations = {
  setUser(state, user) {
    window.localStorage.setItem('user', JSON.stringify(user))
    state.user = user
  },
  toggleFavs(state, name) {
    const favs = state.favs
    const id = favs.findIndex((item) => item === name)
    if(id > -1){
      favs.splice(id, 1)
    } else {
      favs.push(name)
    }
    state.favs = favs
    window.localStorage.setItem('favs', JSON.stringify(favs))
  }
}
