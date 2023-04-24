export default function (to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition
  } else if (to.hash) {
    if (to.params.preventScroll) {
      return false
    } else {
      return { selector: to.hash, offset: { x: 0, y: 109 } }
    }
  } else {
    return { x: 0, y: 0 }
  }
}
