angular.module('starter.controllers', ['firebase'])

.controller("DashCtrl", ["$scope", "$firebaseArray", function($scope, $firebaseArray, $actionButton) {
    var ref = firebase.database().ref();
    $scope.messages = $firebaseArray(ref);

    $scope.remove = function(item) {
      $scope.messages.$remove(item);
    }
  }
])
.controller("ChatsCtrl", ["$scope", "$firebaseArray", function($scope, $firebaseArray) {

    var ref = firebase.database().ref();

    $scope.messages = $firebaseArray(ref);

    $scope.send = function() {
      $scope.messages.$add({
        team : $scope.messages.team,        //이름
        lugar : $scope.messages.lugar,      //장소
        message : $scope.messages.message,  //추가메세지
        num : $scope.messages.num,          //인원
        year : $scope.year,                 //년도
        month : $scope.month,               //월
        day : $scope.day,                   //일
        mon : $scope.mon,                   //요일
        timeh : $scope.returnedTimeH,       //시간(시)
        timem : $scope.returnedTimeM        //시간(분)
      });
      $scope.messages.team = "";
      $scope.messages.lugar = "";
      $scope.messages.message = "";
      $scope.messages.num = "";
    }

  }
])
.controller('HomeTabCtrl', function($scope, ionicDatePicker) {
  console.log('HomeTabCtrl');
  var week = new Array('일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일');

  $scope.returnedStuff ="";
  $scope.year ="";
  $scope.month ="";
  $scope.day ="";
  $scope.mon ="";

  var ipObj1 = {
      callback: function (val) {  //Mandatory
        console.log('Return value from the datepicker popup is : ' + val, new Date(val));
        $scope.returnedStuff = new Date(val);
        $scope.year =$scope.returnedStuff.getFullYear();
        $scope.month =$scope.returnedStuff.getMonth()+1;
        $scope.day =$scope.returnedStuff.getDate();
        $scope.mon =week[$scope.returnedStuff.getDay()];
      },
      from: new Date(2017, 1, 1), //Optional
      to: new Date(2100, 12, 31), //Optional
      inputDate: new Date(),      //Optional
      mondayFirst: false,          //Optional
      closeOnSelect: false,       //Optional
      templateType: 'popup'       //Optional
    };

    $scope.openDatePicker = function(){
      ionicDatePicker.openDatePicker(ipObj1);
    };

})
.controller('HomeCtrl', function ($scope, ionicTimePicker) {

  $scope.returnedTimeH ="";
  $scope.returnedTimeM ="";

  var ipObj1 = {
    callback: function (val) {      //Mandatory
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
      } else {
        var selectedTime = new Date(val * 1000);
        $scope.returnedTimeH = selectedTime.getUTCHours();
        $scope.returnedTimeM = selectedTime.getUTCMinutes();
        if($scope.returnedTimeM == 0){
          $scope.returnedTimeM = '00';
      }
        console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
      }
    },
    inputTime: 50400,   //Optional
    format: 12,         //Optional
    step: 15,           //Optional
    setLabel: 'Set2'    //Optional
  };

  $scope.openTimePicker = function(){
    ionicTimePicker.openTimePicker(ipObj1);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope, $firebaseAuth) {

  $scope.login = function(){
      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });

  $scope.resister = function(){
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      if (errorCode == 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
  }
}

  $scope.logout = function(){
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }, function(error) {
      // An error happened.
    });
  }

});
