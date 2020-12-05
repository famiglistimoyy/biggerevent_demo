$(function() {
    // 点击"去注册"链接切换到注册区域
    $('#link_reg').on('click', function() {
        $('.reg-box').show();
        $('.login-box').hide();
    });
    // 点击"去登录"链接切换到登录区域
    $('#link_login').on('click', function() {
        $('.login-box').show();
        $('.reg-box').hide();
    });
    // 密码校验
    let form = layui.form;
    form.verify({
        // 密码框校验
        pwd: [/^[\S]{6,12}$/, '密码必须6-12位，且不能出现空格'],
        // 确认密码校验
        repwd: function(value) {
            let pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) return ('两次密码不一致!')
        }
    });
    //注册表单提交
    $('#regForm').on('submit', submitData);
    //登录表单提交
    $('#loginForm').on('submit', loginData)
})



//监听注册表单的提交事件-------------------------
function submitData(e) {
    let dataStr = $('#regForm').serialize()
        //阻止表单默认提交行为
    e.preventDefault();
    $.ajax({
        method: 'POST',
        url: '/api/reguser',
        data: dataStr,
        success(res) {
            console.log(res);
            //不管注册成功还是失败都要显示message消息“注册成功”或“注册失败
            layui.layer.msg(res.message);
            //如果注册失败 return出去 不执行后面的代码
            if (res.status != 0) return;
            //清空注册表单???$('#regForm')[0]和$('#regForm').serialize()一样 打印不出来？
            $('#regForm')[0].reset();
            //模拟点击“去登录”事件
            $('#link_login').click();
            //入口函数登录注册显示隐藏事件
            // $('#link_login').on('click', function() {
            //     $('.login-box').show();
            //     $('.reg-box').hide();
            // })
        }
    })
};

//监听登录表单的提交事件-------------------------
function loginData(e) {
    e.preventDefault();
    let dataStr = $(this).serialize();
    console.log(dataStr);
    $.ajax({
        method: 'post',
        url: '/api/login',
        data: dataStr,
        success(res) {
            console.log(res);
            //{status: 0, message: "登录成功！", token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZC…cwNH0.zgVVjX63YXoou1wTo3geLYVHGwg-10PowDyOhmre3T4"}
            layui.layer.msg(res.message, {
                icon: 6,
                time: 1500
            }, function() {
                localStorage.setItem('usertoken', res.token);
                location.href = '/index.html';
                //内部跳转location.href 
                //iframe 相当于内嵌浏览器 跳转用window.top或者window.parent
            })
        }
    })
}