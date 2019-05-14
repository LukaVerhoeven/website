// $.ajax({
//     type: "POST",
//     url: "/users/signup",
//     data: {
//         email:"tesaat@test.com",
//         password: "password"
//     },
//     success: function (data) {
//         console.log("data:" + data);
//     },
//     dataType: 'json'
// });
$.ajax({
    type: "POST",
    url: "/users/login",
    data: {
        email:"test@test.com",
        password: "password"
    },
    success: function (data) {
        // var object = JSON.parse(data[0]);
        console.log("token= " + data.token);
        testAuth(data.token);
    },
    dataType: 'json'
});
function testAuth(token){
    $.ajax({
        type: "POST",
        url: "/users/testAuth",
        headers: {
            Authorization: "Bearer " + token
        },
        data: {
            email:"test@test.com",
            // token: token
        },
        success: function (data) {
            console.log("data:" + data);
        },
        dataType: 'json'
    });
}
