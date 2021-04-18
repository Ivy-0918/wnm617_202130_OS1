
// Document Ready
// $(()=>{

// });

//test driven development.
// $(()=>{
//  	console.log("honk")
// });

//fetch: ask for data
fetch('data/api.php')
   .then(d=>d.json())
   .then(d=>{
      console.log(d)
   })



$(()=>{

	checkUserId();

	$(document)

   .on("pagecontainerbeforeshow", function(event,ui){
      console.log(ui.toPage[0].id)

      //PAGE ROUTING
      switch(ui.toPage[0].id{
         case "recent-page":RecentPage();break;
         case "list-page":ListPage();break;
         case "user-profile-page":UserProfilePage();break;
         case "animal-profile-page":AnimalProfilePage();break;
         
      })
   })

	// (.on)該點基本上將鏈接到先前的選擇(document)

	/* FORM SUBMITS */
   .on("submit","#signin-form",function(e){
      e.preventDefault();
      checkSigninForm();
   })


   /* ANCHOR CLICKS */
   .on("click",".js-logout",function(e){
      sessionStorage.removeItem('userId');
      checkUserId();
   })

	/* DATA ACTIVATE */
   .on("click","[data-activate]",function(e){
      let target = $(this).data("activate");
      $(target).addClass("active");
   })//單擊此將激活。
   .on("click","[data-deactivate]",function(e){
      let target = $(this).data("deactivate");
      $(target).removeClass("active");
   })//單擊此將激活。
   .on("click","[data-toggle]",function(e){
      let target = $(this).data("toggle");
      $(target).toggleClass("active");
   })//單擊此將激活。



   $("[data-template]").each(function(){
		let id = $(this).data("template");
		let template = $(id).html();
		$(this).html(template);
	})







});