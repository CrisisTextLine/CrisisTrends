"use strict";!function(){function n(){t(config.conversations.fallbackConversationCount)}function t(n){n=parseInt(n,10);var e=n-s;s+=Math.ceil(e/2),a(),s!==n&&setTimeout(function(){t(n)},125-5*Math.log(e))}var e="https://4vammoq5j7.execute-api.us-east-1.amazonaws.com/prod/conversations",o=document.getElementById("conversation-count"),a=function(){return o.innerHTML=s.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")},s=config.conversations.fallbackConversationCount;a(),window.getConversationCount=function(){var o=new XMLHttpRequest;o.addEventListener("load",function(){200===o.status?t(o.responseText):n()}),o.addEventListener("error",n),o.open("GET",e),o.send()}}();
//# sourceMappingURL=conversation-count.js.map
