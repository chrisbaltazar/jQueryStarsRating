(function($){
   var config;

   $.fn.extend({
      rating: function(options){
         var settings = {
            number    : 5, // stars 		
            size      : 24,  // size stars
            selected  : 0 // selected stars
         };
         if(options)
             $.extend(settings, options);

         config = settings;
         
         return this.each(function(){
                var html = "<table class = 'rating " + (settings.selected>0?"rated":"") + "'><tr>";
                var i = 0;
                for(i=0; i<settings.selected; i++){
                    html += "<td><img src = 'img/star_on.png' width= '" + settings.size + "' height = '" + settings.size + "'></td>";
                }
                for(var j=i; j<settings.number; j++)
                    html += "<td><img src = 'img/star_off.png' width= '" + settings.size + "' height = '" + settings.size + "'></td>";
                html += "</tr></table>";
                $(this).html(html);
                $('.rating td').css({'cursor': 'pointer'});
                var self = this;
                $(self).find('.rating td').hover(function(){
                        if($(self).find('.rated').length == 0){
                            $(self).find('.rating td').html("<img src = 'img/star_off.png' class = '' width= '" + settings.size + "' height = '" + settings.size + "'>");
                            var index = $(this).index();
                            $(self).find('.rating td').each(function(){
                               if($(this).index() <= index){
                                   $(this).html("<img src = 'img/star_on.png' width= '" + settings.size + "' height = '" + settings.size + "'>");
                               } 
                            });
                        }else
                            return;
                    } ,function(){
                        if($(self).find('.rated').length == 0)
                            $(self).find('.rating td').html("<img src = 'img/star_off.png' width= '" + settings.size + "' height = '" + settings.size + "'>");
                        else
                            return;
                });
                
                $(this).find('.rating').mouseleave(function(){
                    if($(this).find('.rated').length == 0)
                        $(this).find('.rating td').html("<img src = 'img/star_off.png' width= '" + settings.size + "' height = '" + settings.size + "'>");
                });
                
                $(this).find('.rating td').click(function(){
                    if($(this).parents('.rating').find('.rated').length == 0)
                        $(this).addClass('rated');
                });

                
          }); // END EACH
      },// END function

      quitRated: function(){
            $(this).find('.rating td').removeClass('rated').html("<img src = 'img/star_off.png' width= '" + config.size + "' height = '" + config.size + "'>");
      },

      getRating: function(){
            return $(this).find('.rated').index() + 1;
      }
   }); // END extend
})(jQuery);