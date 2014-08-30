$(function(){
  $("#newestRoute").click( function() {
    $(".recommondRoute").hide();
    $(".hotRoute").hide();
    $(".mustgoRoute").hide();
    $(".newestRoute").show();
  });
  
  $("#recommondRoute").click( function() {
    $(".newestRoute").hide();
    $(".hotRoute").hide();
    $(".mustgoRoute").hide();
    $(".recommondRoute").show();
  });
  
  $("#hotRoute").click( function() {
    $(".newestRoute").hide();
    $(".recommondRoute").hide();
    $(".mustgoRoute").hide();
    $(".hotRoute").show();
  });
  
  $("#mustgoRoute").click( function() {
    $(".newestRoute").hide();
    $(".recommondRoute").hide();
    $(".hotRoute").hide();
    $(".mustgoRoute").show();
  });
});

