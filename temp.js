
    React.useEffect(() => {
        var postListRef = firebase.database().ref('post-comments/');
        var newPostRef = postListRef.push();
        newPostRef.set({
            type: "ADMIN",
            msg: "one",
            timeStamp: Date.now()
        });
        var commentsRef = firebase.database().ref('post-comments/');
        commentsRef.on('child_added', (data) => {
            console.log(data.val())
        });
    },[]);
