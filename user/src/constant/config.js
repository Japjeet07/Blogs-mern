//API NOTIFICATION MSG

export const API_NOTIFICATION_MSG={
    loading:{
        title:'loading',
        message:'data is being loaded'
    },
    success:{
        title:'Success',
        message:'data loaded yipee'
    },
    responeFailure:{
        title:'error',
        message:'error while getting response'
    },
    requestFailure:{
        title:'error',
        message:'error while parsing request'
    },
    networkError:{
        title:'error',
        message:'check connection, unable to connect'
    }
}

export const SERVICE_URL={
    userSignup:{
        url:'/signup',method:'POST'
    },
    userLogin:{
        url:'/login',
        method:'POST'
    },
    CreatePost:{
        url:'create',
        method:'POST'
    },
    getAllPosts:{
        url:'/posts',
        method:'GET',
        params:true
    },
    getPostById: { url: 'post', method: 'GET', query: true },
    updatePost:{
        url:'update',
        method:'PUT',
        query:true
    },
    deletePost:{
        url:'delete',
        method:'DELETE',
        query:true

    },
    newComment: { url: '/comment/new', method: 'POST' },
    getAllComments: { url: 'comments', method: 'GET', query: true },
    deleteComment: { url: 'comment/delete', method: 'DELETE', query: true }


}
