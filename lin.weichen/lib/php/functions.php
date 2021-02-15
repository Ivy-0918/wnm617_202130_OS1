<?php

//session value 需要被置頂
session_start();



// print the object
function print_p($d) {
   echo "<pre>",print_r($d),"</pre>";
}

// $filename = "json_notes.json";
// $file = file_get_contents($filename);
// $notes_object = json_decode($file);
function file_get_json($filename) {
   $file = file_get_contents($filename);
   return json_decode($file);
}
//return; 1. return statement stops the function, 2. turn function file_get_json($filename) into a typr of variable.  a variable that calaulate that it returns.


//連接數據庫：MYSQL
// Create connection ($conn)
function MYSQLIConn(){
	include_once "auth.php";

	@$conn = new mysqli(...MYSQLIAuth());
	//@ : suppressing the warning;
	//結果：會消除php warning，留下connection error(提醒你auth的某項資料可能有錯誤。);

// Check connection
	if($conn->connect_errno) die($conn->connect_error);
	//如果connect_errno是錯誤的，則會列印出connect_error;
	// die : 如果前者有錯誤，則會停止運行 且列印錯誤信息;

	$conn->set_charset('utf8');

	return $conn;
}

//SQL
//Query
function MYSQLIQuery($sql){
	$conn = MYSQLIConn();

	//this function will create $a;
	//叫出MYSQL的所有資料(id,name,date_create,...etc;)
	$a = [];

	$result = $conn->query($sql);

	if($conn->errno) die($conn->error);

	if(@$result->num_rows) {
      while($row = $result->fetch_object())
         $a[] = $row;
   }
   if(@$conn->insert_id) return $conn->insert_id;

	return $a;
   // print_p([$conn,$result]);
   // die;

   // if(@$result->num_rows) {
   //    while($row = $result->fetch_object())
   //       $a[] = $row;
   // }
   // if(@$conn->insert_id) return $conn->insert_id;

   // return $a;
}



//CART Functions

//getCart：uers剛進入商店尚未使用購物車
function getCart() {
   return isset($_SESSION['cart']) ? $_SESSION['cart'] : [];
}//假設user還沒使用購物車？則購物車會是[空的]



//array_find : (賦予array, 傳遞function進入array) that {finds one object in that array} 
function array_find($array,$fn) {
   foreach($array as $o) if($fn($o)) return $o;//find one object in an array->true.
   return false;
}
//setCart: 設置購物車
function setCart($a) {
   $_SESSION['cart'] = $a;
}

//resetCart: 重置購物車
function resetCart() { $_SESSION['cart']=[]; }

function cartItemById($id) {
   return array_find(getCart(),function($o)use($id){ return $o->id==$id; });
}//查找要添加的產品是否已經在購物車中

//addToCart：產品名稱＆總價位
function addToCart($id,$amount) {
   //resetCart();//重置購物車
   $cart = getCart();//添加的產品到購物車

   $p = cartItemById($id);//查找要添加的產品是否已經在購物車中

   // $p = cartItemById($id);//product: 
   

   if($p) $p->amount = $amount;//如果購物車已存在你要的產品，那我們就只需要增加產品“數量”
   else {
		$cart[] = (object)[
		     "id"=>$id,
		     "amount"=>$amount
		];
	}//如果購物車沒有你要的產品，那就是將新商品添加到購物車。
   setCart($cart);
}



function getCartItems() {
   $cart = getCart();

   if(empty($cart)) return [];

   $ids = implode(",",array_map(function($o){return $o->id;},$cart));//它會反應購物車中的所有物品，並將$o->id 的id以array的形式產生，最後implode ”array“ into “string”.

   $products = MYSQLIQuery("SELECT * FROM products WHERE id in ($ids)");//$ids，產品項目

   return array_map(function($o) use ($cart){
      $p = cartItemById($o->id);//$p: 實際上是購物車中的產品與數據庫中的當前產品匹配。
      $o->amount = $p->amount;//$o->amount: 購物車中產品的數量
      $o->total = $p->amount * $o->price;//$o->total: 產品的數量＊價位＝總價
      return $o;
   },$products);
}



//顯示未讀訊息
function makeCartBadge() {
   $cart = getCart();
   if(count($cart)==0) {
      return "";
   } else {
      // return count($cart);//只會顯示您購物車中各種物品的數量
      return array_reduce($cart,function($r,$o){return $r+$o->amount;});
   }
}


//設置預設值($key,$value)
function setDefault($k,$v) {
   if(!isset($_GET[$k])) $_GET[$k] = $v;
}//如果沒有設置'key' 則'key'等同於'value'