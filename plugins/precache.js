const menuItems = []
menuItems.map((item) => {
  const obj = { ...item }
  if (item.isVariable || item.hasVariablePrice) {
    obj.variables = item.variables.map((v) => {
      const vObj = { ...v }
      if (Array.isArray(v.ingredients)) {
        vObj.precache = [v.name, ...v.ingredients].join(' ')
      } else {
        const mem = v.mem[0].split('/')
        vObj.precache = [v.name, ...mem].join(' ')
      }
      return vObj
    })
  } else if (Array.isArray(item.ingredients)) {
    obj.precache = [item.name, ...item.ingredients].join(' ')
  } else {
    console.log(item.name)
  }
  return obj
})
