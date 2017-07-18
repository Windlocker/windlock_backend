//u know
$("#signup").click(function() {
  console.log("asdfafds");
  $.ajax({
    url: 'http://iwin247.kr:3003/auth/signup',
    method: 'POST',
    data: {
      name: $("#auth_name").val(),
      id: $("#auth_id").val(),
      passwd: $("#auth_pw").val(),
    },
    success: function(response) {
      alert("가입되었습니다");
    },
    error:function(){
      alert("가입 실패");
    }
  });
})

$(function () {
        var firstS = $('.first_go');
        var deviceS = $('.device_go');
        var loginS = $('.login_go');
        var registerS = $('.reg_go');

        firstS.click(function () {
            $('#Device_Check').css("display", "none");
            $('#Loginpage').css("display", "none");
            $('#registerpage').css("display", "none");
            $('#fisrt_screen').fadeIn();
        });
        deviceS.click(function () {
            $('#Device_Check').fadeIn();
            $('#Loginpage').css("display", "none");
            $('#registerpage').css("display", "none");
            $('#fisrt_screen').css("display", "none");
        });
        loginS.click(function () {
           $('#Device_Check').css("display", "none");
            $('#Loginpage').fadeIn();
            $('#registerpage').css("display", "none");
            $('#fisrt_screen').css("display", "none");
        });
        registerS.click(function () {
          $('#Device_Check').css("display", "none");
            $('#Loginpage').css("display", "none");
            $('#registerpage').fadeIn();
            $('#fisrt_screen').css("display", "none");
        });
});

     $(function () {
        var codeS = $('#code_go');

        codeS.click(function () {
            $('.codes').fadeIn();
            $('#code_go').css("display", "none");
        });
    });


    $(function () {
        var useS = $('#use_go');
        var logS = $('#log_go');

        logS.click(function () {
            $('#system_use').fadeIn();
            $('#log_go').css("border-bottom", "solid 5px white");
            $('#system_log').css("display", "none");
            $('#use_go').css("border-bottom", "none");
        });
        useS.click(function () {
            $('#system_log').fadeIn();
            $('#system_use').css("display", "none");
            $('#log_go').css("border-bottom", "none");
            $('#use_go').css("border-bottom", "solid 5px white");

        });
    });

$(function () {
        var useS = $('#page1_go');
        var logS = $('#page2_go');

        logS.click(function () {
            $('#page2').fadeIn();
            $('#page1').css("display", "none");
        });
        useS.click(function () {
            $('#page1').fadeIn();
            $('#page2').css("display", "none");
        });
    });

//ajax
    $('#login').click(function() {
      $.ajax({
        url: '/auth/signin',
        dataType: 'json',
        type: 'POST',
        data: {
          id: $("#user_id").val(),
          passwd: $("#user_pw").val(),
        },
        success: function(response) {
          location.reload();
        }
      });
    })

       $('#code_submit').click(function() {
      $.ajax({
        url: '/code_confirm',
        dataType: 'json',
        type: 'POST',
        data: {
          'code': $('#code').val()
        },
        success: function(response) {

        }
      });
    })



    $(document).on('keypress','#code', function(e){
if($(this).val().length >= 5)
   {
       e.preventDefault();
   }

});
$(document).ready(function(){ var fileTarget = $('.filebox .upload-hidden'); fileTarget.on('change', function(){ if(window.FileReader){ var filename = $(this)[0].files[0].name; } else {  var filename = $(this).val().split('/').pop().split('\\').pop();  } $(this).siblings('.upload-name').val(filename); }); });
