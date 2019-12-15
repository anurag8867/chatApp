let app = angular.module('app', [])
    .controller('appController', ['$scope', '$http', 'apiService', function ($scope, $http, apiService) {

        let URI = "http://localhost:4000/",
            //make connection
            socket = io.connect(URI), messageCopy;
        $scope.username = "Anurag";

        //Emit message
        $scope.send = function () {
            messageCopy = angular.copy($scope.message);
            socket.emit('new_message', {message: messageCopy, username: $scope.username});
            $scope.message = null;
        };

        //Emit a username
        $scope.changeUsername = function () {
            socket.emit('change_username', {username: $scope.username})
        };

        //Emit typing
        $scope.messageTyping = function () {
            socket.emit('typing', {username: $scope.username});
        };

        //Listen on new_message
        socket.on("new_message", (data) => {
            let div = document.getElementById('feedback');
            div.innerHTML += "<p class='message'>" + data.username + ": " + data.message + "</p>";
        });

        //Listen on typing
        socket.on('typing', (data) => {
            let div = document.getElementById('typing');
            div.innerHTML = "<p><i>" + data.username + " is typing a message..." + "</i></p>";
        });

        $scope.post = function () {
            apiService.addTask().then(function (data) {
                $scope.tutorialName = data;
            }, function (data, status, headers, config) {
                alert("Task was not added");
                $scope.taskTitle = "";
            });
        };

        $scope.get = function () {
            apiService.getTask().then(function (data) {
                $scope.tutorialName = data;
            }, function (data, status, headers, config) {
                alert("Task was not added");
                $scope.taskTitle = "";
            });
        };

        $scope.put = function () {
            apiService.updateTask().then(function (data) {
                $scope.tutorialName = data;
            }, function (data, status, headers, config) {
                alert("Task was not added");
                $scope.taskTitle = "";
            });
        };

        $scope.delete = function () {
            apiService.deleteTask().then(function (data) {
                $scope.tutorialName = data;
            }, function (data, status, headers, config) {
                alert("Task was not added");
                $scope.taskTitle = "";
            });
        };
    }]);
