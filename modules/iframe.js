function setHTML(id,url){
  var getId = document.getElementById(id)
  var newURL = getId.src = url;
}
function sendUser(link){
  var url = document.location.href;
  var userName = url.split('=');
  location.href = '../links/'+link+'.html?user='+userName;
}
function setMap(id){
  var url = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3243.0859860118226!2d139.77404571590145!3d35.62560668020729!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x601889f9d9a9544b%3A0x8e5f79d93f4709a3!2z44Op44Km44Oz44OJ44Ov44Oz44K544K_44K444Ki44OgIOODgOOCpOODkOODvOOCt-ODhuOCo-adseS6rCDjg5fjg6njgrblupc!5e0!3m2!1sja!2sjp!4v1570540276311!5m2!1sja!2sjp'
  var newURL = document.getElementById(id).src = url;
}
