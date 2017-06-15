$(document).ready(function(){
  $('.toplink').mouseenter(function(){
    $('.toplinktext').fadeTo('fast', 0.5);
  });
  $('.toplink').mouseleave(function(){
    $('.toplinktext').fadeTo('fast',1);
  });
});
