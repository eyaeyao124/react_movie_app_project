import React,{useEffect,useState} from 'react'
import Axios from 'axios'
import { useSelector } from "react-redux";

function Comment(props) {
    const user = useSelector(state => state.user)

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
        if(!user.userData.isAuth) return alert('로그인후 이용가능합니다')
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

    if(user.userData && !user.userData.isAuth) {
        return (
            <div>
                <div>
                    {
                        CommentLists.map((list, index) => { 
                            return <div key={index}>{list.comments} </div>
                        })
                    }
                </div>
                <form onSubmit={onSubmitComment}>
                    <textarea onChange={textHandler} value={text}></textarea><button>Submit</button>
                </form>
            </div>
        )
    }else{
        return (
            <div>
                <div>
                    {
                        CommentLists.map((list, index) => { 
                            if(userFrom === list.userFrom) { return <div key={index}>{list.comments} <span>수정</span><span>삭제</span></div>}
                            else{ return <div key={index}>{list.comments} </div>}
                        })
                    }
                </div>
                <form onSubmit={onSubmitComment}>
                    <textarea onChange={textHandler} value={text}></textarea><button>Submit</button>
                </form>
            </div>
        )
    }
}

export default Comment
