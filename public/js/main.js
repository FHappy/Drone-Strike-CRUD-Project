$(window).bind("load", function() {
   $(document).on('click', '.dropdown-menu', function (e) {
     e.stopPropagation();
   });

});
