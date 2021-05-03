import React,{useEffect,useState} from 'react'
import Axios from 'axios'

function Comment(props) {
    const [CommentLists, setCommentLists] = useState([])
    const [text, setText] = useState("");

    const userFrom = props.userFrom
    const movieId = props.movieId
    const comments = text

    let variables = {
        userFrom,
        movieId,
        comments
    }

    const textHandler = (e) => {
        setText(e.currentTarget.value)
    }
    const onSubmitComment = (e) => {
        e.preventDefault();
        onClickComment()
    }

    const onClickComment = () => {
        Axios.post('/api/comment/addComment',variables)
            .then(response => {
                if(response.data.success) {
                    setText('')
                    getCommentsList()
                } else {
                    alert('댓글 추가를 실패했습니다')
                }
            })
    }

    const getCommentsList = () => {
        Axios.post('/api/comment/getComments', {movieId})
        .then(response => {
            if (response.data.success) {
                setCommentLists(response.data.comments)
            } else {
                alert('Failed to get comments Info')
            }
        })
    }

    useEffect(()=> {
        getCommentsList()
    },[])

    return (
        <div>
            <div>
                {
                    CommentLists.map(list => { return <div>{list.comments}</div>})
                }
            </div>
            <form onSubmit={onSubmitComment}>
                <textarea onChange={textHandler} value={text}></textarea><button>안뇽! 난 버튼!</button>
            </form>
        </div>
    )
}

export default Comment
