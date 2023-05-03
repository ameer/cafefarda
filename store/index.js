export const state = () => ({
  products: {},
  webpSupport: false,
  user: JSON.parse(window.localStorage.getItem('user')),
  favs: window.localStorage.getItem('favs') === null ? [] : JSON.parse(window.localStorage.getItem('favs'))
})

export const mutations = {
  setProducts (state, products) {
    state.products = products
  },
  setUser (state, user) {
    window.localStorage.setItem('user', JSON.stringify(user))
    state.user = user
  },
  setWebpSupport (state, webpSupport) {
    state.webpSupport = webpSupport
  },
  toggleFavs (state, name) {
    const favs = state.favs
    const id = favs.findIndex(item => item === name)
    if (id > -1) {
      favs.splice(id, 1)
    } else {
      favs.push(name)
    }
    state.favs = favs
    window.localStorage.setItem('favs', JSON.stringify(favs))
  }
}
export const getters = {
  imageExt (state) {
    return 'png'
  }
}
