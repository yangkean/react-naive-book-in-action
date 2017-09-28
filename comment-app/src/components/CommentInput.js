import React, { Component } from 'react'
import PropTypes from 'prop-types'

class CommentInput extends Component {
  // 限制配置参数的类型
  static propTypes = {
    onSubmit: PropTypes.func,
    username: PropTypes.any,
    onUserNameInputBlur: PropTypes.func,
  }

  static defaultProps = {
    username: ''
  }

  constructor(props) {
    super(props)
    this.state = {
      username: props.username,
      content: ''
    }
  }

  // 组件挂载完以后自动调用
  componentDidMount() {
    this.textarea.focus()
  }

  handleUsernameBlur(event) {
    if(this.props.onUserNameInputBlur) {
      this.props.onUserNameInputBlur(event.target.value)
    }
  }

  handleUserChange(event) {
    this.setState({
      username: event.target.value // 通过 event.target.value 获取用户输入内容
    })
  }

  handleContentChange(event) {
    this.setState({
      content: event.target.value
    })
  }

  handleSubmit() {
    // 子组件向父组件传递数据需通过父组件的 props 给子组件
    // 传入一个回调函数，触发点击操作时调用父组件传入的回调
    // 函数并传入子组件数据即可
    if(this.props.onSubmit) {
      const { username, content } = this.state
      this.props.onSubmit({
        username,
        content,
        createdTime: +new Date()
      })
    }

    this.setState({ content: '' })
  }

  render() {
    // 表单输入控件设置了 value 后，则输入控件的值以被设置的值为准，值不变则 value 不变化，这是 react 控制的
    return (
      <div className='comment-input'>
        <div className='comment-field'>
          <span className='comment-field-name'>用户名：</span>
          <div className='comment-field-input'>
            <input value={this.state.username}
                   onChange={this.handleUserChange.bind(this)}
                   onBlur={this.handleUsernameBlur.bind(this)}/>
          </div>
        </div>
        <div className='comment-field'>
          <span className='comment-field-name'>评论内容：</span>
          <div className='comment-field-input'>
            <textarea value={this.state.content}
                      onChange={this.handleContentChange.bind(this)}
                      ref={(textarea) => this.textarea = textarea}/>
          </div>
        </div>
        <div className='comment-field-button'>
          <button onClick={this.handleSubmit.bind(this)}>
            发布
          </button>
        </div>
      </div>
    )
  }
}

export default CommentInput
