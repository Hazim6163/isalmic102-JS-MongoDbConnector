
var userStatus = {isEmpty: true};

const setUserStatus = (obj) => {
    userStatus = obj;
    return userStatus;
}
$(document).ready(() => {
    //check status get request: 
    const statusUrl = urls.apiBase + urls.user.status.path
    $.ajax({
        url: statusUrl,
        data: {},
        success: (res) => {
            res.isEmpty = false;
            userStatus = res; 
        }
    }).then(() => {
        console.log(userStatus);
    })
})
