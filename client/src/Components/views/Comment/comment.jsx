import React, { Fragment } from "react";
import { useState } from 'react';
import styles from "./comment.module.css";
import Axios from 'axios';
import SingleComment from './singleComment';
import ReplyComment from './replyComment';
import { useNavigate } from 'react-router-dom'

const Comment = ({ user, comments, refreshFunction, productId }) => {
  const [ commentvalue, setCommentvalue ] = useState("")
  const navigate = useNavigate()

  const onHandleClick = (e) => {
    setCommentvalue(e.currentTarget.value)
  }

  console.log('[Comment]comments:',comments)
  console.log('[Comment]user', user)
  console.log('[Comment]productId', productId )

  const onSubmit = (e) => {
    e.preventDefault();
    if(!user) {
      alert('로그인을 해주세요')
      navigate('/login')
    }
    const variables = {
      writer: user._id,
      productId: productId,
      content: commentvalue,
    }

    Axios.post('/api/comment/saveComment', variables).then((res) => {
      if (res.data.success) {
        refreshFunction(res.data.success);
        console.log(res.data)
      } else {
        alert('코멘트를 저장하지 못했습니다.')
      }
    })
    setCommentvalue("");
  }


  return (
    <>
      {/*  Comment Lists */}
      {comments && comments.map((comment, index) => (
        !comment.responseTo ?
        <Fragment key={index}>
          <SingleComment 
            refreshFunction={refreshFunction} 
            comment={comment} 
            key={index}
            productId={productId}
            user={user}
          />
          <ReplyComment
            key={Date.now()}
            user={user} 
            refreshFunction={refreshFunction} 
            parentCommentId={comment._id} 
            comments={comments} 
            productId={productId}
          />
        </Fragment> : ""))}

      {/* Root Comment Form */}
      <form className={styles.commentform} onSubmit={onSubmit}>
        <textarea
          className={styles.commentInput}
          onChange={onHandleClick}
          value={commentvalue}
          placeholder="의견을 남겨주세요 :)"
        />
        <br />
        <button className={styles.commentBtn} onClick={onSubmit}>
          Submit
        </button>
      </form>
    </>
  );
};

export default Comment;
