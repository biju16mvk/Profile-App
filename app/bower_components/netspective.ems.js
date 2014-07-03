/**
* Netspective Error Management System
* Javascript Library
* Version 0.1.1
*/
window.EMS = (function (window, document, navigator){
  var self = {
    baseUrl     : "http://ems.netspective.com/api",
    contentType: "application/json",
    dataType : "json",
    async : true,
    processData : true,
    shouldNotify : true
  };
  self.notifyReleaseStages = ['development','production','staging'];
  self.notifyReleaseStageStatus = false;

  /**
  * Enter your settings here
  */
  self.settings = {
    "apiKey":"xxxxx-xxxx-xxxxx", // Your Project API-KEY
    "releaseStage" : 1 //Release Stage 1-Development, 2-Production, 3-Staging
  }

  /**
  * To initialize EMS
  * @params string  apiKey
  * @params string  releaseStage - (Development, Production, Staging)
  */
  self.register = function (apiKey, releaseStage){
    self.settings.apiKey = apiKey;
    self.settings.releaseStage = capitalise(releaseStage);
  }

  /**
  * Automatic error reporting
  * Attach to `window.onerror` events and notify EMS when they happen.
  */
  window.onerror = function (errorMessage, errorFile, lineNo, charNo, exception) {
    var data = prepareData(errorMessage, errorFile, lineNo, charNo, exception);

    var params = {};
    self.notify(data,params);
  };

  /**
  * Returns stack trace for given excption
  * If exception is undefined, it genrates an exception.
  */
  generateStackTrace = function (exception){
    if(typeof exception === 'undefined'){
      try {
        var err = new Error ();
        err.message = "window.onerror";
        if(err.fileName === undefined) { // Internet Explorer, Opera, Google Chrome and Safari
          err.fileName = document.location.href;
        }
      throw err;
      }
      catch(e) {
        stacktrace = e.stack;
      }
    }
    else{
      stacktrace = exception.stack;
    }
    return stacktrace;
  }

  /**
  * prepareData
  * Prepare Data for sending to server.
  */
  prepareData = function (errorMessage, errorFile, lineNo, charNo, exception, httpMethod){
    httpMethod = typeof httpMethod == 'undefined'?"window.onerror":httpMethod;

    var apiKey      = getSetting('apiKey');
    var releaseStage= getReleaseStage();
    var context     = getContext(errorFile,httpMethod);

    // exceptions
    var errorClass  = getErrorType(errorMessage);
    var message     = getErrorMessage(errorMessage);
    var file        = errorFile;
    var CreatedAt   = getCurrentTime();

    // metaData
    // request
    var url         = window.location.href;
    var userAgent   = window.navigator.userAgent;

    var stacktrace  = generateStackTrace(exception);

    var data = {
      "events": [{
        "releaseStage": releaseStage,
        "apiKey": apiKey,
        "context": context,
        "exceptions": [{
          "ErrorClass": errorClass,
          "Message": message,
          "LineNo": lineNo,
          "File": file,
          "CreatedAt": CreatedAt,
          "StackTrace" : stacktrace
        }],
        "metaData": {
          "request": {
            "url": url,
            "httpMethod": httpMethod,
            "ip": "",
            "userAgent": userAgent
          }
        }
      }]
    };

    return JSON.stringify(data);
  }

  /**
  * Manual Error Notification
  * Notify `exception`, typically that you've caught
  * with a `try/catch` statement or that you've generated yourself.
  */
  self.notifyException = function (exception, name) {
    var errorMessage = (name || exception.name) +": "+ (exception.message || exception.description);
    var browser = getBrowser(exception);
    if(browser == 'firefox'){
      var ExceptionFile = getDataFirefoxStack(exception);
    }
    else if(browser == 'chrome'){
      var ExceptionFile = getDataChromeStack(exception);
    }
    else{
      var ExceptionFile = {
        errorFile : window.location.href,
        lineNo : 1
      }
    }
    var charNo = '';
    var data = prepareData(errorMessage, ExceptionFile.errorFile, ExceptionFile.lineNo, charNo, exception, 'Exception');
    var params = {};
    self.notify(data,params);
  };

  /**
  * Convert string's first letter to uppercase 
  */
  capitalise = function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  /**
  * Return array index for a given value
  * @params   array
  * @params   needle - search value
  */
  contains = function(array, needle) {
    var i = -1, index = -1;

    for(i = 0; i < array.length; i++) {
        if(array[i] === needle) {
            index = i;
            break;
        }
    }
    return index;
  }

  /**
  * Return FileName and LineNumber for an excption
  * From stack trace for firefox browser.
  * @param exception  - excpetion object from try catch block.
  */
  getDataFirefoxStack = function (exception){
    var stackTrace = exception.stack;
    var firstLine = stackTrace.split('\n');
    var fileName = firstLine[0].split('@');
    var fileDetails = fileName[1].split(':');
    var ExceptionFile = {
      errorFile : fileDetails[0]+fileDetails[1],
      lineNo : fileDetails[2]
    }
    return ExceptionFile;
  }

  /**
  * Return FileName and LineNumber for an excption
  * From stack trace for Google Chrome browser.
  * @param exception  - excpetion object from try catch block.
  */
  getDataChromeStack = function (exception){
    var stackTrace = exception.stack; 
    var firstLine = stackTrace.split('\n');
    var fileName = firstLine[1].split('(');
    var fileNameSplit = fileName[1].split(')');
    var fileDetails = fileNameSplit[0].split(':');
    var ExceptionFile = {
      errorFile : fileDetails[0]+fileDetails[1],
      lineNo : fileDetails[2]
    }
    return ExceptionFile;
  }

  /**
  * Return Settings by name
  */
  getSetting = function(name){
    var setting = self.settings[name] !== undefined ?  self.settings[name] : false;
    return setting;
  }

  /**
  * Return Release Stage
  */
  getReleaseStage = function(){
    name = 'releaseStage';
    var setting = self.settings[name] !== undefined ?  self.settings[name] : "Development";
    return setting;
  }

  /**
  * Return Context with url and method
  */
  getContext = function(url,method){
    method = typeof method == 'undefined'? 'window.onerror' : method;
    var res = url.replace(window.location.origin,"");
    var context = method+" "+res;
    return context;
  }

  /**
  * Return Exception type
  */
  getErrorType  = function(message){
    var res = message.split(":");
    if(typeof res[1] == 'undefined'){
      return "window.onerror";
    }
    else{
      return (res[0]);
    }
  }

  /**
  * Return Erron Message.
  */
  getErrorMessage  = function(message){
    var res = message.split(":");
    if(typeof res[1] == 'undefined'){
      return (res[0]);
    }
    else{
      return (res[1]);
    }
  }

  /**
  * Return Current Time
  */
  getCurrentTime = function(){
    var d = new Date(),
     dformat = [ 
      d.getFullYear(),
      (d.getMonth()+1),
      d.getDate()].join('-')+
      ' ' +
      [ d.getHours(),
      d.getMinutes(),
      d.getSeconds()].join(':');

    return dformat;
  }

  /**
  * Return Browser Name with exception object.
  */
  getBrowser = function(e) {
      if (e['arguments'] && e.stack) {
          return 'chrome';
      } else if (e.stack && e.sourceURL) {
          return 'safari';
      } else if (e.stack && e.number) {
          return 'ie';
      } else if (e.stack && e.fileName) {
          return 'firefox';
      } else if (e.message && e['opera#sourceloc']) {
          // e.message.indexOf("Backtrace:") > -1 -> opera9
          // 'opera#sourceloc' in e -> opera9, opera10a
          // !e.stacktrace -> opera9
          if (!e.stacktrace) {
              return 'opera9'; // use e.message
          }
          if (e.message.indexOf('\n') > -1 && e.message.split('\n').length > e.stacktrace.split('\n').length) {
              // e.message may have more stack entries than e.stacktrace
              return 'opera9'; // use e.message
          }
          return 'opera10a'; // use e.stacktrace
      } else if (e.message && e.stack && e.stacktrace) {
          // e.stacktrace && e.stack -> opera10b
          if (e.stacktrace.indexOf("called from line") < 0) {
              return 'opera10b'; // use e.stacktrace, format differs from 'opera10a'
          }
          // e.stacktrace && e.stack -> opera11
          return 'opera11'; // use e.stacktrace, format differs from 'opera10a', 'opera10b'
      } else if (e.stack && !e.fileName) {
          // Chrome 27 does not have e.arguments as earlier versions,
          // but still does not have e.fileName as Firefox
          return 'chrome';
      }
      return 'other';
  };
  /**
   * Set which release stages should be allowed to notify Netspective EMS
   * eg array("production", "development")
   *
   * @param Array notificationReleaseStages array of release stages to notify for
   */
  self.setNotifyReleaseStages = function (notificationReleaseStages){
    for (var i = notificationReleaseStages.length - 1; i >= 0; i--) {
      notificationReleaseStages[i] = capitalise(notificationReleaseStages[i]);
    };
    self.notifyReleaseStages = notificationReleaseStages;
    self.notifyReleaseStageStatus = true;
  }

  /**
   * To check the notification release stage is set or not
   */
  self.checkNotifyReleaseStages = function (){
    if(self.notifyReleaseStageStatus){
        var releaseStageName = self.settings.releaseStage;
        if(contains(self.notifyReleaseStages, capitalise(releaseStageName))<0){
          self.shouldNotify = false;
        }
    }
  }

  /**
  * Summary : Save Exception Activity
  * Notes : Save Exception thrown from project  
  * @param body - Notify credentials
  */
  self.notify = function(body,params) {
    self.checkNotifyReleaseStages();

    if (!self.shouldNotify) {
      return;
    }
    var headJson = {};
    var queryParam = '';
    var ajaxParams = {};

    var path = "/s/ems/exception/compile.json".replace(/{format}/g,'json');   

    if(queryParam){
      queryParam = queryParam.slice(0, -1);
      path += '?'+queryParam;
    }
    
    ajaxParams.httpPath = self.baseUrl+(path);    
    ajaxParams.httpHeaders = headJson;
    ajaxParams.httpMethod = 'POST';
    ajaxParams.params = params;
    if(typeof body !== "undefined"){
      ajaxParams.data = body;
    }

    self.serviceData(ajaxParams); 
  };

  /**
  * Summary : Perform Data Transfer Service
  * @param ajaxParams - ajax parameters
  */
  self.serviceData = function(ajaxParams){
    var serverParams = {};
    if(ajaxParams.httpPath){
      serverParams.url = ajaxParams.httpPath;
    }
    if(ajaxParams.httpMethod){
      serverParams.type = ajaxParams.httpMethod;
    }
    if(ajaxParams.data){
      serverParams.data = ajaxParams.data;
    }
    if(ajaxParams.params.async){
      serverParams.async = ajaxParams.params.async;
    }
    if(ajaxParams.params.dataType){
      serverParams.dataType = ajaxParams.params.dataType;
    }
    if(ajaxParams.httpHeaders){
      serverParams.headers = ajaxParams.httpHeaders;  
    }
    if(ajaxParams.params.contentType){
      serverParams.contentType = ajaxParams.params.contentType;
    }else{
      serverParams.contentType = self.contentType;
    }
    if(ajaxParams.params.errorCallback){
      serverParams.error = ajaxParams.params.errorCallback;
    }
    serverParams.success = ajaxParams.params.successCallback; 
    // console.log(serverParams);
    // $.ajax(serverParams);
    $.ajax({
        type: "POST",
        dataType: "json",
        async: true,
        url: serverParams.url,
        data : serverParams.data,
        success: function (data) {
        }
      });
  };

  return self;
}(window, document, navigator));