import React, { useState } from 'react';
import styles from './singleComment.module.css';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SingleComment = ({ user, productId, comment, refreshFunction }) => {
    const [ reply, setReply ] = useState(false);
    const [ value, setValue ] = useState("")

    console.log('[singleComment]user:', user)
    console.log('[singleComment]comment:', comment)
    const navigate = useNavigate()

    const onClickReplyOpen = () => {
        setReply(!reply);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if(!user) {
          alert('로그인을 해주세요')
          navigate('/login')
        }
        const variables = {
          writer: user._id,
          productId: productId,
          content: value,
          responseTo: comment._id
        }
    
        Axios.post('/api/comment/saveComment', variables).then((res) => {
          if (res.data.success) {
            console.log(res.data)
            refreshFunction(res.data.comments)
            setReply(false);
          } else {
            alert('코멘트를 저장하지 못했습니다.')
          }
        })
        setValue("");
    }

    const onHandleChange = (e) => {
        setValue(e.currentTarget.value)
    }

    return (<>
    <section className={styles.commentSection}>
      {user ? <span className={styles.writer}>{user.name}</span> : <span className={styles.writer}>null</span>}
      <div className={styles.commentContent}>
        <span>{comment.content}</span>
        <span 
          className={styles.replyTo}
          onClick={onClickReplyOpen} 
          key="commentReplyTo"
        >
          Reply to
        </span>
        {reply && 
          <form 
            className={styles.commentform} 
            onSubmit={onSubmit} >
            <textarea
              className={styles.commentInput}
              onChange={onHandleChange}
              value={value}
              placeholder="의견을 남겨주세요 :)"
            />
            <br />
            <button className={styles.commentBtn} onClick={onSubmit} >
              Submit
            </button>
          </form>
        }
        </div>
    </section>
    </>)
};

export default SingleComment;