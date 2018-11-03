$(document).ready(function() {

	$("img#advsheadlbpic_0").show();
	setInterval("$().advsHeadLbRoll()", 5000);


	(function($){

		$.fn.advsHeadLbRoll = function(){
			
			var rollobj=$(".advsheadlbpic");
			var rolltotal=parseInt(rollobj.size())-1;
			var nextId,nowId;
			$("img.advsheadlbpic").each(function(){
				
				if(this.style.display=='block' || this.style.display=='inline'){
					nowId=parseInt(this.id.substr(14));
					if(nowId>=rolltotal){
						nextId=0;
					}else{
						nextId=nowId+1;
					}
				}
			});
			$("img#advsheadlbpic_"+nextId).fadeIn('slow').show('slow');
			$("img#advsheadlbpic_"+nowId).fadeOut('slow').hide();

		};

	})(jQuery);

});
