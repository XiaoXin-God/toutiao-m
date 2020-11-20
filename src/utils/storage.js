// 本地存储封装模块

export const getItem = name => {
  //  获取缓存中的数据
  let data = window.localStorage.getItem(name)

  // 判断数据是什么格式，如果是字符串格式就会进行try里面的数据， 如果是对象格式，try里面就会报错就返回catch里面的数据
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }

}

export const setItem = (name, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(name, value)
}

export const removeItem = name => {
  window.localStorage.removeItem(name)
}
