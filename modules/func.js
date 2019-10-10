function bar() {
  // a 要素の作成と属性の指定
  var newAnchor = document.createElement("a");
  var newTxt = document.createTextNode(document.getElementById("favtext").value);
  newAnchor.appendChild(newTxt);
  //newAnchor.setAttribute("href", document.getElementById("favurl").value );
  //newAnchor.setAttribute("target", "_blanc" );

  // li 要素の作成
  var newLi = document.createElement("li");
  newLi.setAttribute("class", "name-list");
  newLi.appendChild(newAnchor);
  var list = document.getElementById("FavList");
  list.appendChild(newLi);
}
function gate() {
  var UserInput = prompt("パスワードを入力して下さい:", "");
  if (UserInput) {
    location.href = UserInput + ".html";
  }else{
    alert('パスワードを入力してください');
    location.href = "login.html";
  }
}
function userData() {
  var url = document.location.href;
  if (url.indexOf('user') <= 0) {
    var user = url.split('=');
    console.log('a')
    console.log(user[1]);
    document.location.href = '../links/schedule.html?user=' + encodeURIComponent('田中');
  }
}
function createUserName() {
  var UserInput = prompt("名前を入力してください;", "")
  document.location.href = document.location.href + '?' + UserInput;
}
function cl_color(day) {
  var newColor = document.getElementById(day);
  newColor.setAttribute('bgcolor', "#9F9F9F");
  newColor.setAttribute('style', "color: #000000");
}
function getUser() {
  var url = document.location.href;
  var user = url.split('=')
  document.getElementById('schedule') = user;
}
function send_text(label, text, url) {
  var url = document.location.href;
  document.location.href = url + '?' + label + '=' + text;
  if (url.indexOf('?') <= 0) {
    document.location.href = url + '?' + label + '=' + text;
  } else {
    document.location.href = url + '&' + label + '=' + text;
  }
}
// クッキー保存　setCookie(クッキー名, クッキーの値, クッキーの有効日数); //
function setCookie(c_name, value, expiredays) {
  // pathの指定
  var path = location.pathname;
  // pathをフォルダ毎に指定する場合のIE対策
  var paths = new Array();
  paths = path.split("/");
  if (paths[paths.length - 1] != "") {
    paths[paths.length - 1] = "";
    path = paths.join("/");
  }
  // 有効期限の日付
  var extime = new Date().getTime();
  var cltime = new Date(extime + (60 * 60 * 24 * 1000 * expiredays));
  var exdate = cltime.toUTCString();
  // クッキーに保存する文字列を生成
  var s = "";
  s += c_name + "=" + escape(value);// 値はエンコードしておく
  s += "; path=" + path;
  if (expiredays) {
    s += "; expires=" + exdate + "; ";
  } else {
    s += "; ";
  }
  // クッキーに保存
  document.cookie = s;
}
// クッキーの値を取得 getCookie(クッキー名); //
function getCookie(c_name) {
  var st = "";
  var ed = "";
  if (document.cookie.length > 0) {
    // クッキーの値を取り出す
    st = document.cookie.indexOf(c_name + "=");
    if (st != -1) {
      st = st + c_name.length + 1;
      ed = document.cookie.indexOf(";", st);
      if (ed == -1) ed = document.cookie.length;
      // 値をデコードして返す
      return unescape(document.cookie.substring(st, ed));
    }
  }
  return "";
}
// クッキーの値をアラートで表示
function checkCookie() {
  if (getCookie()) {
    var setName = getCookie('testName');
    alert(setName);
  }
}
//cookieの設定
function SWSetCookie(name, value, expire, path) {
  var cookie = name + '=' + escape(value);
  if (expire) {
    cookie += '; expires=' + expire.toGMTString();
  }
  if (path) {
    cookie += '; path=' + path;
  }
  document.cookie = cookie;
}
//cookieの取得
function SWGetCookie(name) {
  var cookie = document.cookie;
  if (cookie && cookie.length > 0) {
    var offset = cookie.indexOf(name + '=');
    var end;
    if (offset != -1) {
      offset += name.length + 1;
      end = cookie.indexOf(';', offset);
      if (end == -1) {
        end = cookie.length;
      }
      return unescape(cookie.substring(offset, end));
    }
  }
  return "";
}
function delCookie(name) {
  var dt = new Date('1999-12-31T23:59:59Z'); // 過去の日付をGMT形式に変換
  document.cookie = name + "=; expires=" + dt.toUTCString();
}
var db;
var indexedDB = window.indexedDB || window.mozIndexedDB || window.msIndexedDB;
var storeName = "november";
var dbName = "calender";
if (indexedDB) {
  // データベースを削除したい場合はコメントを外します。
  //indexedDB.deleteDatabase(dbName);
  var openRequest = indexedDB.open(dbName, 1.0);

  openRequest.onupgradeneeded = function (event) {
    // データベースのバージョンに変更があった場合(初めての場合もここを通ります。)
    db = event.target.result;
    var store = db.createObjectStore(storeName, { keyPath: "key" });
    store.createIndex("myvalueIndex", "value");
  }
  openRequest.onsuccess = function (event) {
    db = event.target.result;
  }
} else {
  window.alert("このブラウザではIndexed DataBase API は使えません。");
}

function setValue(event, keyName, valName) {
  var keyData = keyName;
  var valData = valName;

  var transaction = db.transaction([storeName], "readwrite");
  var store = transaction.objectStore(storeName);

  //var request = store.put({"key": keyData,"value": valData});
  var request = objectStore(valData, keyData)
  request.onsuccess = function (event) {
    var newColor = document.getElementById("day9");
    newColor.setAttribute('bgcolor', "#9F9F9F");
    newColor.setAttribute('style', "color: #000000");
  }
}

function getValue(event) {
  var key = document.getElementById("selectkey").value;
  var result = document.getElementById("result");
  result.innerHTML = "";

  var transaction = db.transaction(["mystore"], "readwrite");
  var store = transaction.objectStore("mystore");

  var request = store.get(key);
  request.onsuccess = function (event) {

    if (event.target.result === undefined) {
      result.innerHTML = "指定したキーは存在しません。";
    } else {
      result.innerHTML = event.target.result.myvalue + "<br/>";
    }
  }
}

function getAll(event) {

  var result = document.getElementById("result");
  result.innerHTML = "";

  var transaction = db.transaction(storeName, "readwrite");
  var store = transaction.objectStore(storeName);
  var request = store.openCursor();

  request.onsuccess = function (event) {

    if (event.target.result == null) {
      return;
    }

    var cursor = event.target.result;
    var data = cursor.value;
    result.innerHTML += "key：" + cursor.key + "  value：" + data.myvalue + "<br/>";

    cursor.continue();
  }
}

function getCount(event) {

  var result = document.getElementById("result");
  result.innerHTML = "";
  var transaction = db.transaction(["mystore"], "readwrite");
  var store = transaction.objectStore("mystore");
  var request = store.count();
  request.onsuccess = function (event) {
    result.innerHTML = event.target.result + "件";
  }
}

function deleteValue(event) {
  var key = document.getElementById("deletekey").value;
  var result = document.getElementById("result");
  result.innerHTML = "";

  var transaction = db.transaction(["mystore"], "readwrite");
  var store = transaction.objectStore("mystore");

  var request = store.delete(key);
  request.onsuccess = function (event) {
    result.innerHTML = "削除しました。";
  }
}

function deleteAll(event) {

  var result = document.getElementById("result");
  result.innerHTML = "";

  var transaction = db.transaction(["mystore"], "readwrite");
  var store = transaction.objectStore("mystore");
  var request = store.clear();

  request.onsuccess = function (event) {
    result.innerHTML = "クリアしました。";
  }
}

function getKey(event) {

  var value1 = Number(document.getElementById("selectValue1").value);
  var value2 = Number(document.getElementById("selectValue2").value);

  var result = document.getElementById("result");
  result.innerHTML = "";

  var transaction = db.transaction(["mystore"], "readwrite");
  var store = transaction.objectStore("mystore");
  var index = store.index("myvalueIndex");

  var range = IDBKeyRange.bound(value1, value2);
  var request = index.openCursor(range);

  request.onsuccess = function (event) {

    if (event.target.result == null) {
      return;
    }

    var cursor = event.target.result;
    var data = cursor.value;
    result.innerHTML += "value：" + data.myvalue + "  key：" + data.id + "<br/>";

    cursor.continue();
  }
}

