function search(username){
    fetch(`https://api.github.com/users/${username}`).then((response)=>{
        console.log(response.status);
    })
}
module.exports= search;