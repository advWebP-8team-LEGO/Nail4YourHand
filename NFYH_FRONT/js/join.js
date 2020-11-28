var joinpwd = document.getElementById("joinpwd");
var joinpwdchk = document.getElementById("joinpwdchk");
const btnChk = document.getElementById("btnChk");

function check(){
  if(joinpwd.value === joinpwdchk.value){;
    document.getElementById("pwdchk").innerHTML = "비밀번호가 일치합니다.";
    document.getElementById("pwdchk").style.color = '#555';
  }
  else{
    document.getElementById("pwdchk").innerHTML = "비밀번호가 일치하지 않습니다.";
    document.getElementById("pwdchk").style.color = 'red';
  }
}

btnChk.onclick = check;
