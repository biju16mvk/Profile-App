function CodeAnalysis(){
       
    var $this = this;
    
	this.analysisCode = function(path, divId){
	        jQuery.ajax({
            //url: 'ajax_dci.php',
		    url: path,
            type: "GET",
			async:true,
            success: function (code) {				
				var options = {};				
				if (jQuery.trim(code) === ""){
					$this.onEmpty($(divId));
				}else if (JSHINT(code, options)){
					$this.onPass($(divId));
				}else{
					$this.onFail($(divId)); 
				}
				
            }
			
        });
	};

    this.onPass = function(output) {
        template = $("#passOutput");
        output.removeClass("fail");
        output.addClass("pass");       
        output.html(template.tmpl(JSHINT.data()));
    };

    this.onFail = function(output) {
        template = $("#failOutput");

        output.removeClass("pass");
        output.addClass("fail");        
         
        var data = JSHINT.data();        
        if( data && data.errors){
            var errors = data.errors;            
            $.each(errors, function(k,v){         
                if( v && v.evidence){
                   v.evidence = $.trim(v.evidence); 
                }                
            });
        }
        output.html(template.tmpl(data));
    };

    this.onEmpty = function(output) {
        template = $("#emptyOutput");
        output.html(template.tmpl());
    };
}
