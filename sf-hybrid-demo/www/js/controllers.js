angular.module('starter.controllers', [
  'ionic'
]).controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
}).controller('PlaylistsCtrl', function($scope) {
  $scope.contacts = [
    { name: 'FC해트트릭', time: '9:00~12:00', lugar: '에스빌드 풋살파크', number: '6:6'},
    { name: '레알마드리드', time: '9:00~12:00', lugar: '에스빌드 풋살파크', number: '6:6'},
    { name: 'FC바르셀로나', time: '9:00~12:00', lugar: '에스빌드 풋살파크', number: '6:6'},
    { name: '멘체스터 시티', time: '9:00~12:00', lugar: '에스빌드 풋살파크', number: '6:6'},
    { name: 'FC첼시', time: '9:00~12:00', lugar: '에스빌드 풋살파크', number: '6:6'},
    { name: '수원삼성', time: '9:00~12:00', lugar: '에스빌드 풋살파크', number: '6:6'},
    { name: '도르트문트', time: '9:00~12:00', lugar: '에스빌드 풋살파크', number: '6:6'},
    { name: '발렌시아', time: '9:00~12:00', lugar: '에스빌드 풋살파크', number: '6:6'}
  ];
}).controller('PlaylistCtrl', function($scope, $stateParams) {
}).controller('SlideController', function($scope, $ionicSlideBoxDelegate) {
  $scope.navSlide = function(index){
    $ionicSlideBoxDelegate.slide(index, 500);
  }
}).controller('peoplectrl',function($scope,$filter){

  $scope.count = 6;
  var now = new Date();
  var day = 0;
  var m = 0;
  var week = new Array('일', '월', '화', '수', '목', '금', '토');

  function updateDate(){
    $scope.today  = week[now.getDay()];
    $scope.month  = $filter('date')(now, 'yyyy년 MM월 dd일');
  }

  function optimizeTime(){
    if(now.getMinutes()<30){
      now.setMinutes(30);
    }else{
      now.setHours(now.getHours()+1,0);
    }
  }

  updateDate();


  $scope.incpeople = function() {
    if($scope.count==10){
      $scope.count=1;
    }else{
      $scope.count++;
    }
  }

  $scope.decpeople = function() {
    if($scope.count==1){
      $scope.count=10;
    }else{
      $scope.count--;
    }
  }

  $scope.incdate = function() {
    day++;
    now.setDate(now.getDate() + 1);
    updateDate();
  }

  $scope.decdate = function() {
    if(day>0){
      day--;
      now.setDate(now.getDate() - 1);
      updateDate();

      if(day==0){
        m=0;
        now =new Date();
        optimizeTime();
        $scope.time  = $filter('date')(now, 'HH:mm');
      }

    }
  }

  optimizeTime();
  $scope.time  = $filter('date')(now, 'HH:mm');
  $scope.time2  = $scope.time;

  $scope.inctime = function(){
    m++;
    if(now.getMinutes()<30){
      now.setHours(now.getHours(),30);
    }else{
      now.setHours(now.getHours()+1,0);
    }

    $scope.time  = $filter('date')(now, 'HH:mm');
  }
  $scope.inctime2 = function(){
    m++;
    if(now.getMinutes()<30){
      now.setHours(now.getHours(),30);
    }else{
      now.setHours(now.getHours()+1,0);
    }

    $scope.time2  = $filter('date')(now, 'HH:mm');
  }

  $scope.dectime = function() {
    if(day==0){
      if(m>0){
        m--;
        if(now.getMinutes()<30){
          now.setHours(now.getHours()-1,30);
        }else{
          now.setHours(now.getHours(),0);
        }
        $scope.time  = $filter('date')(now, 'HH:mm');
      }

    }else{

      if(now.getMinutes()<30){
        now.setHours(now.getHours()-1,30);
      }else{
        now.setHours(now.getHours(),0);
      }
      $scope.time  = $filter('date')(now, 'HH:mm');

    }

  }

  $scope.dectime2 = function() {
    if(day==0){
      if(m>0){
        m--;
        if(now.getMinutes()<30){
          now.setHours(now.getHours()-1,30);
        }else{
          now.setHours(now.getHours(),0);
        }
        $scope.time2 = $filter('date')(now, 'HH:mm');
      }

    }else{

      if(now.getMinutes()<30){
        now.setHours(now.getHours()-1,30);
      }else{
        now.setHours(now.getHours(),0);
      }
      $scope.time2  = $filter('date')(now, 'HH:mm');

    }

  }

  $scope.reserve = function(){
    if($scope.time > $scope.time2)
      alert("시간을 다시 확인해 주세요");
    else {
      alert(
        ' 날  짜: \t' + $scope.month +' '+$scope.today+ '요일' +
      ' \n시  간: \t' + $scope.time + ' ~ ' + $scope.time2 +
      ' \n장  소: \t' + $scope.match.lugar+
      ' \n인  원: \t' + $scope.count + ' : ' + $scope.count +
      ' \n비  용: \t' + $scope.match.money + '원');
    }
  }

});
