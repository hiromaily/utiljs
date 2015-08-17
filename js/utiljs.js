//* utiljs */
(function(){
    var uj = function(){};
    //public
    uj.debug = 1;
    uj.flash;
    uj.ios;
    uj.android;

    //private
    var _s_time;
    
//------------------------------------------------------------------------------
//private
//------------------------------------------------------------------------------
    //check Flash
    var chkFlash = function(){
      var flash = 0;
      var build = 0;
      //Flash Version
      var plugins = navigator.plugins;
      for (key in plugins) {
        var description = (plugins[key]['description'] || '').match(/shockwave flash (\d+\.\d+)/i);
        if (!!description && (description[1] >= 10.1)) { //description[1] FlashPlayerのバージョン ex)10.1
          flash = description[1];
          build = plugins[key]['description']; //Shockwave Flash 11.1 r102
        }
      }
      //return flash;
      return {
        result: (flash==0)? false:true,
        version: flash,
        build_ver: build
      };
    };
		
    //check Android
    var checkAndroid = function(){
      //Android Version
      var ua = navigator.userAgent.match(/android (\d+\.\d+)/i);
      var os = (!!ua)? ua[1]:0;
      
      return {
        version: os,
        devicePixelRatio: window.devicePixelRatio //Androidなら1.5 or 2が多い
      };
    };

    //check iOS
    var checkiOS = function(){
      //iOS Version
      var ua = navigator.userAgent;
      var os = ua.match(/iPhone OS (\d+\_\d+\_\d+)/i) || ua.match(/iPhone OS (\d+\_\d+)/i);
      if(!os) os = ua.match(/iPad; CPU OS (\d+\_\d+\_\d+)/i) || ua.match(/iPad; CPU OS (\d+\_\d+)/i);
      os = (!!os)? os[1].replace(/_/g,"."):0;

      return {
        version: os,
        devicePixelRatio: window.devicePixelRatio //iOS5なら2, iOS4.2は1
      };
    };

    
//------------------------------------------------------------------------------
//public
//------------------------------------------------------------------------------
    //initialize
    uj.init = function(){};

    //get html height
    uj.getHtmlHeight = function(){
      var b = document.body;
      return Math.max(b.scrollHeight, b.offsetHeight);
    };

    //checkbox check
    uj.checkCheckbox = function(is_check, id){
      var cb;
      if(id){
        cb = document.getElementById(id).querySelectorAll("input[type='checkbox']");
      }else{
        cb = document.querySelectorAll("input[type='checkbox']");
      }
      for(var i=0,len=cb.length; i<len; i++) cb[i].checked = is_check;
    };

    //click input
    uj.clickInput = function(label, event){
      if (event.target.nodeName == 'INPUT') {
        return true;
      }

      var input_node = null;
      searchInputNode(label);
      if(input_node != null){
        switch(input_node.type){
          case 'checkbox':
            input_node.checked =! input_node.checked;
            return false;
          case 'radio':
            input_node.checked = true;
            return false;
          case 'text': case 'password': case 'textarea':
            input_node.focus();
            return false;
        }
      }
      
      function searchInputNode(node) {
        for(var i = 0; i < node.childNodes.length; i++) {
	        if (node.childNodes[i].nodeName == "INPUT"){
            input_node = node.childNodes[i];
          }
          searchInputNode(node.childNodes[i]);
	      }
      }
    };

    //Is touchEvent available?
    uj.isTouch = function(){
      if("createTouch" in document) return true;
      else return false;
    };

    //sort
    uj.sortNumber = function(ary){
      //ary = [104,45,5,98,3,24,17,10,7];
      ary.sort(function(a,b) {return a-b;});
    };

    uj.sortList = function(ary, name){
      /*
      var list = [
        {"no":3, "cat":5, "body":"test1"},
        {"no":2, "cat":4, "body":"test2"},
        {"no":4, "cat":5, "body":"test3"}
      ];*/
      list.sort(function(a, b) {return a[name]-b[name]});
    };

    //console
    uj.chkConsole = function(){
      console.log('console.log');
      console.debug('console.debug');
      console.error('console.error');
      console.warn('console.warn');
      console.info('console.info');

      var obj = ["aaaa","bbbb",3,function(){}];
      console.log(obj);
      console.dir(obj);
      
      console.trace();

      var debug=1;
      console.assert(uj.debug == 0,'this result is false');
    };
  
    //sleep (args:time[ms])
    uj.sleep = function(time){
      var d1 = new Date().getTime();
      var d2 = new Date().getTime();
      while (d2 < d1 + time) {
        d2 = new Date().getTime();
      }
      return;
    };
    //debug start
    uj.debugStart = function(){
      _s_time = (new Date).getTime();
      console.log("debug start")
    };
    //debug end
    uj.debugEnd = function(){
      var e_time = (new Date).getTime();
      var result = e_time - _s_time;
      console.log("debug end")
      return result;
    };


    
    //initial
    uj.flash = chkFlash();
    uj.ios = checkiOS();
    uj.android = checkAndroid();
    window.uj = uj;
})();


/** 
 * @extension
 */
uj.newFunc = function(){
};


//------------------------------------------------------------------------------
//EventListener
//------------------------------------------------------------------------------
//DOMContentLoaded
document.addEventListener("DOMContentLoaded",function(){},false);
window.addEventListener("load", function(){}, false);

