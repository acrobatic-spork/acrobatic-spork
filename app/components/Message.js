import React from 'react'
import styles from '../styles/styles.css'

const Message = (props) => (
  <div className={styles["message"]}> 
    <span className="message-text">{props.message}</span>
  </div>
)

export default Message;