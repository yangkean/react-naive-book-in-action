import React, { Component } from 'react'
import CommentInput from './CommentInput'
import CommentList from './CommentList'

class CommentApp extends Component {
  constructor() {
    super()
    this.state = {
      comments: []
    }
  }

  handleSumbitComment(comment) {
    if(!comment) return
    if(!comment.username.trim()) return alert('请输入用户名')
    if(!comment.content.trim()) return alert('请输入评论内容')

    this.state.comments.push(comment)

    this.setState({
      comments: this.state.comments
    })
  }

  render() {
    return (
      <div className='wrapper'>
        <CommentInput onSubmit={this.handleSumbitComment.bind(this)}/>
        <CommentList comments={this.state.comments}/>
      </div>
    )
  }
}

export default CommentApp