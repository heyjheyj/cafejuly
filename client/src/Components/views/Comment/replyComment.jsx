import React from "react";
import { useEffect, useState } from "react";
import styles from "./replyComment.module.css";
import SingleComment from "./singleComment";

const ReplyComment = ({
  comments,
  productId,
  parentCommentId,
  refreshFunction
}) => {
  const [commentCounts, setCommentCounts] = useState();
  const [openReply, setOpenReply] = useState(false);

  useEffect(
    () => {
      let commentReplyCount = 0;
      comments.map(comment => {
        if (comment.responseTo === parentCommentId) {
          commentReplyCount++;
          setCommentCounts(commentReplyCount);
        }
        return commentReplyCount;
      });
    },
    [comments, parentCommentId]
  );

  const renderReplyComment = parentCommentId => {
    return comments.map(
      (comment, index) =>
        comment.responseTo
          ? comment.responseTo === parentCommentId &&
            <div className={styles.replysection}>
              <SingleComment
                refreshFunction={refreshFunction}
                comment={comment}
                key={index}
                productId={productId}
              />
              <ReplyComment
                key={comment._id}
                refreshFunction={refreshFunction}
                parentCommentId={comment._id}
                comments={comments}
                productId={productId}
              />
            </div>
          : ""
    );
  };

  const onHandleChange = () => {
    setOpenReply(!openReply);
  };

  return (
    <div>
      {commentCounts > 0 &&
        <p className={styles.replycount} onClick={onHandleChange}>
          View <span className={styles.counts}>{commentCounts}</span> more
          comment(s)
        </p>}
      {openReply && renderReplyComment(parentCommentId)}
    </div>
  );
};

export default ReplyComment;
