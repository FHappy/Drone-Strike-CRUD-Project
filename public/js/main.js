$(window).bind("load", function() {
   $(document).on('click', '.dropdown-menu', function (e) {
     e.stopPropagation();
   });

   for (var i = 1; i <= 647; i++) {
     var modalId = '#strikeShowModal' + i;
     var rowId = '#strikeRow' + i;
     $(rowId).click(function() {
       $(modalId).modal('show');
     })
   }
});
