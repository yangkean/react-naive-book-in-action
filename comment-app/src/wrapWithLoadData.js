import React, { Component } from 'react'

export default (WrappedComponent, name) => {
  class LocalStorageActions extends Component {
    constructor() {
      super()
      this.state = {
        data: null,
      }
    }

    componentWillMount() {
      let data = localStorage.getItem(name)

      try {
        this.setState({
          data: JSON.parse(data)
        })
      } catch(e) {
        this.setState({
          data
        })
      }
    }

    saveData(data) {
      try {
        localStorage.setItem(name, JSON.stringify(data))
      } catch(e) {
        localStorage.setItem(name, `${data}`)
      }
    }

    render() {
      return (
        <WrappedComponent
          data={this.state.data}
          saveData={this.saveData.bind(this)}
          // 在普通对象字面量中使用扩展操作符是 stage 3 新增的
          // 它将所给对象的自有可列举属性扩展到一个新对象中
          // 这里的意思是把其他的参数原封不动地传递给被包装的组件
          {...this.props}/>
      )
    }
  }

  return LocalStorageActions
}
