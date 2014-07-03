function FolderContents(){        
    this.path   =  'sdk/max-forms-template-persistence/js/';
    this.containerId = '#list';   
    var fc = this;    
    
    this.getFiles = function(path, callback) {
        fc.fetchData(path, true, function (data) {
            var filesList = [];
            $(data).find('a[href$=".js"]').each(function () {
                var docName = $(this).attr("href");                 
                var regExp = /^[\?\/].*/;                 
                if( !regExp.test(docName) && (docName != '../')){                                     
                    docName = docName.replace(/%20/g, ' ');
                    filesList.push(docName);                      
                }
            });        	
            callback(filesList);
        });             
    }
    
    this.init = function(params){        
        if(params.path) {
            this.path = params.path;
        }
        if(params.containerId){
            this.containerId = params.containerId;
        }
		
        this.getFiles(this.path, function(filesList){
            $.each(filesList, function(k,v){
                var file = fc.path + v;
                var content = '<div><a href="javascript:" class="code">' + file + '</a><br /><br />';
                fc.fetchDataText(file, false, function(data){
                    content += "<span  class='hide' ><pre class='brush: js'>" + data + '</pre></span>';
                });
                content +=  '</div>';
                $('#' + fc.containerId ).append(content);
                SyntaxHighlighter.highlight(); 
            })
        });
		
        $('#' + fc.containerId).delegate('.code', 'click', function(){           
           $(this).parent().find('span').toggleClass('hide');
        });        
    }
    
    this.format = function(name) {
        var formated = name.replace(/%20/g, ' ');  //If the file name contain spaces then it will be displayed as %20. So replacing all %20 to spaces.                    
        formated = formated.replace(/-/g, ' '); //REMOVING THE HYPHENS  
        formated = formated.replace(/\./g, ' '); //REMOVING THE DOTS 
        formated = formated.replace(/^dv[\s]*/, '');
        return formated;
    }
    
    this.fetchData = function(path, async, callback){       
        return $.ajax({
            url: path,
            async: async,
            success: function(data){callback(data);},
            error: function(e){/*alert("An error has occured while fetching the data!");*/console.log(e);}
        });
    };
    
    this.fetchDataText = function(path, async, callback){                        
        return $.ajax({
            url: path,
            async: async,
            dataType : "text",
            success: function(data){callback(data);},
            error: function(e){/*alert("An error has occured while fetching the data!");*/console.log(e);}
        });
    };
}

