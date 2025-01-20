(function() {
  console.log("Injecting script into the page...");

 function onAngularLoad(appElement) {
      console.log("AngularJS is present!");

      try {
      const $scope = angular.element(appElement).scope();
      const $http = angular.element(appElement).injector().get('$http');
      console.log("AngularJS $http:", $http);

          $http.get('https://api.example.com/data')
              .then(function(response) {
              console.log("HTTP Response:", response);
              })
              .catch(function(error) {
              console.error("HTTP Error:", error);
              });
      } catch (error) {
          console.error("Error accessing AngularJS:", error);
      }
  }



 function waitForAngularApp(){
  if(typeof window.angular === 'undefined'){
          console.error('No AngularJS is available');
          return;
     }

      const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' || mutation.addedNodes?.length > 0 ) { // this way it also works if the ng-app is added later by another script
         const appElement = document.querySelector('[ng-app]');
              if (appElement) {
                  observer.disconnect(); // Stop observing once found
                 angular.element(document).injector().get('$timeout')(function() {
                      onAngularLoad(appElement);
                  }, 0);
              }
          }
       });
       });


     observer.observe(document.documentElement, {
         childList: true,
         subtree:true,
        attributes:true //important to monitor new attributes
      });
}
  waitForAngularApp();
})();
