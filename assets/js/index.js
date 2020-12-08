$(function() {
    getUserInfo()

    $('#btnLogout').on('click', logout)
})

function getUserInfo() {
    // 获取用户信息
    $.ajax({
        method: 'get',
        // baseAPI里面手动拼接了url地址
        url: '/my/userinfo',
        // 以 /my 开头的请求路径，是有权限的，需要在请求头中携带 Authorization 身份认证字段，才能正常访问成功，所以要加headers
        // headers: {
        //     Authorization: localStorage.getItem('usertoken') || ''
        // },
        success(res) {
            // console.log(res);
            // Object
            // data: {id: 26701, username: "famiglistimo", nickname: "Yayaya", email: "123245", user_pic: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQA…osmjEkkkfqNY2s85wWel/0L0rkFQhaXsAAAAASUVORK5CYII="}
            // message: "获取用户基本信息成功！"
            // status: 0
            // __proto__: Object
            // {status: 0, message: "获取用户基本信息成功！", data: {…}}


            //如果获取失败显示信息 如果没有return出去说明获取成功
            if (res.status !== 0) return layui.layer.msg('获取用户基本信息失败');
            // 如果请求成功 渲染用户头像
            renderAvatar(res.data);
        }
        // 不论成功还是失败最终都会调用complete函数
        // complete: function(res) {
        //     console.log('执行了complete回调');
        //     console.log(res);
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
        //         // 1.强制清空token
        //         localStorage.removeItem('usertoken')
        //             // alert('123');
        //             // 2.强制跳转到登录页面
        //         location.href = '/login.html'
        //     }
        // }
    })
}
//渲染用户头像信息 将user数据传过去
function renderAvatar(userData) {
    let name = userData.nickname || userData.username
    $('#welcome').html(name)
    if (userData.user_pic !== null) {
        //attr jquery对象获取属性(带一个参数)或者修改属性值(带两个参数) js原生 dom元素 用getattribute()获取属性值？？？
        $('.layui-nav-img').attr('src', userData.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
            //获取第一个字母
        let firstChar = name[0].toUpperCase()
        $('.text-avatar').text(firstChar).show()
    }
}

//退出函数
function logout() {
    layui.layer.confirm('小可爱你确定要离开我吗？', {
            icon: 3,
            title: '系统提示'
        },
        function(index) {
            //删除 本地储存中的token值
            localStorage.removeItem('token');
            //跳转到login.html
            location.href = "/login.html";
            layer.close(index);
        })
}