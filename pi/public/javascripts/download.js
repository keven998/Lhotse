//document.write('<script language=javascript src="/javascripts/import.js"></script>');

new_element1=document.createElement("script");
new_element1.setAttribute("type","text/javascript");
//new_element1.setAttribute("src","http://code.jquery.com/jquery-1.4.1.min.js");
new_element1.setAttribute("src","/javascripts/download/jquery.min_v1.0.js");

new_element2=document.createElement("script");
new_element2.setAttribute("type","text/javascript");
//new_element2.setAttribute("src","http://ajax.microsoft.com/ajax/jquery/jquery.cycle_v1.0.js");
new_element2.setAttribute("src","/javascripts/download/jquery.cycle_v1.0.js");

new_element3=document.createElement("script");
new_element3.setAttribute("type","text/javascript");
//new_element2.setAttribute("src","http://ajax.microsoft.com/ajax/jquery/jquery.cycle_v1.0.js");
new_element3.setAttribute("src","/javascripts/download/slider.js");

window.onload=function(){
  document.body.appendChild(new_element1);
  document.body.appendChild(new_element2);
  document.body.appendChild(new_element3);
};

