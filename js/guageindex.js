angular.module('RadialGaugeDemo', [
    'ngRadialGauge'
]);

angular.module('RadialGaugeDemo').controller('RadialGaugeDemoCtrl', ['$scope', '$timeout', function ($scope, $timeout) {
    $scope.value = 1.5;
    $scope.upperLimit = 350;
    $scope.lowerLimit = 0;
    $scope.unit = "%";
    $scope.precision = 2;
    $scope.ranges = [
        {
            min: 0,
            max: 60,
            color: '#FF7700'
        },
        {
            min: 60,
            max: 80,
            color: '#FDC702'
        },
        {
            min: 80,
            max: 120,
            color: '#8DCA2F'
        },
        {
            min: 120,
            max: 150,
            color: '#FDC702'
        },
        {
            min: 150,
            max: 200,
            color: '#FF7700'
        },
        {
            min: 200,
            max: 350,
            color: '#C50200'
        }
    ];

    function update() {
        $timeout(function() {
            $scope.value=$scope.value + 0.1;
            if ($scope.value > $scope.upperLimit) {
                $scope.value=$scope.lowerLimit;
            }
            update();
        }, 1000);
    }
    update();
}]);