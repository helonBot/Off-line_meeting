function bar() {
  // a 要素の作成と属性の指定
  var newAnchor = document.createElement("a");
  var newTxt = document.createTextNode( document.getElementById("favtext").value );
  newAnchor.appendChild( newTxt );
  //newAnchor.setAttribute("href", document.getElementById("favurl").value );
  //newAnchor.setAttribute("target", "_blanc" );
 
  // li 要素の作成
  var newLi = document.createElement("li");
  newLi.setAttribute("class","name-list");
  newLi.appendChild(newAnchor);
  var list = document.getElementById("FavList");
  list.appendChild(newLi);
}
function username(user) {
  document.cookie = 'name=' + encodeURIComponent(user)+";helonbot.github.io; max-age=3600; secure; samesite=lax;";
}
function cl_color(day) {
  var newColor = document.getElementById(day);
  newColor.setAttribute('bgcolor',"#9F9F9F");
  newColor.setAttribute('style',"color: #000000");
}
