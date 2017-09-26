import React, { Component } from 'react'
import CommentInput from './CommentInput'
import CommentList from './CommentList'
import PropTypes from 'prop-types'
import wrapWithLoadData from './wrapWithLoadData'

class CommentApp extends Component {
  static propTypes = {
    data: PropTypes.any,
    saveData: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      // 类还没实例化，this.props 未定义
      comments: props.data
    }
  }

  handleSumbitComment(comment) {
    if(!comment) return
    if(!comment.username.trim()) return alert('请输入用户名')
    if(!comment.content.trim()) return alert('请输入评论内容')

    const comments = this.state.comments

    this.state.comments.push(comment)

    this.setState({
      comments
    })

    this.props.saveData(comments)
  }

  handleDeleteComment(index) {
    const comments = this.state.comments
    comments.splice(index, 1)
    this.setState({comments})
    this.props.saveData(comments)
  }

  render() {
    return (
      <div className='wrapper'>
        <CommentInput onSubmit={this.handleSumbitComment.bind(this)}/>
        <CommentList
          comments={this.state.comments}
          onDeleteComment={this.handleDeleteComment.bind(this)}/>
      </div>
    )
  }
}

CommentApp = wrapWithLoadData(CommentApp, 'comments')

export default CommentApp
