function logCurrentTab () {
      chrome.tabs.getCurrent(function(tab){
        console.log(tab)
      })
