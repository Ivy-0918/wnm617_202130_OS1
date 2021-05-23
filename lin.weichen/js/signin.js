
// const checkSigninForm = () =>{
// 	// one value in this case a function, and never be assigned another value.

// 	console.log($("#signin-username").val())
// }


const checkSigninForm = async () => {
   let username = $("#signin-username").val();
   let password = $("#signin-password").val();

   if(username=='' || password=='') {
      // warn that not all information is there
      return;
   }

   let user = await query({
      type:'check_signin',
      params:[username,password]
   });

   console.log(user)
   if(user.result.length > 0) {
      console.log("logged in")
      sessionStorage.userId = user.result[0].id;

      $("#signin-form")[0].reset();
   } else {
      console.log("logged out")
      sessionStorage.removeItem("userId");
   }

   checkUserId();
}

const checkUserId = () =>{
	let p = ["#signin-page","#signup-page","#signup-second-page",""];
	
	if(sessionStorage.userId===undefined){//如果沒登入，
//用戶ID唯一可以相等的是未定義的
// ===:表示在這種情況下用戶ID不能為零，因為零不等於equals等於undefined 
		//not logged in
		if(!p.some(o=>window.location.hash===o)) //且又不出現在這頁面(登錄頁面）上時，
		//Some: if some of them are true it's true, if all of them are false it's false
		$.mobile.navigate("#signin-page");//那將會導航在signin-page。

	}else{//如果登入，
		// logged in
		if(p.some(o=>window.location.hash===o)) //且它們位於其中一個頁面（登錄頁面）上
		$.mobile.navigate("#recent-page");//那將會導航在recent-page。
	}
}
//sectionStorage: same as local, 只是數據只在"瀏覽器打開"時才持續存在。
//localStorage: storage small data, like images
	






