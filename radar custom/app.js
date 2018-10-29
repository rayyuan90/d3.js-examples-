(function() {
  angular.module("RadarChart", [])
    .directive("radar", radar)
    .directive("onReadFile", onReadFile)
    .controller("MainCtrl", MainCtrl);

  // controller function MainCtrl
  function MainCtrl($http) {
    var ctrl = this;
    init();


    // function init
    function init() {
      // initialize controller variables
      ctrl.examples = [
        "data_the_avengers",
        "data_plant_seasons",
        "data_car_ratings"
      ];
      ctrl.exampleSelected = ctrl.examples[0];
      ctrl.getData = getData;
      ctrl.selectExample = selectExample;

      // initialize controller functions
      ctrl.selectExample(ctrl.exampleSelected);
      ctrl.config = {
        w: 250,
        h: 250,
        facet: false,
        levels: 5,
        levelScale: 0.85,
        labelScale: 0.9,
        facetPaddingScale: 2.1,
        showLevels: true,
        showLevelsLabels: false,
        showAxesLabels: true,
        showAxes: true,
        showLegend: true,
        showVertices: true,
        showPolygons: true
      };
    }

    // function getData
    function getData($fileContent) {
      ctrl.csv = $fileContent;
    }

    // function selectExample
    function selectExample(item) {
      //var file = item + ".csv";
      //$http.get(file).success(function(data) {
        ctrl.datainfo = [
    {
        "group": "Captain America",
        "axes": [
            {
                "axis": "Intelligence",
                "value": 3,
                "description": "only human"
            },
            {
                "axis": "Strength",
                "value": 3,
                "description": " only human"
            },
            {
                "axis": "Speed",
                "value": 2,
                "description": " only human"
            },
            {
                "axis": "Durability",
                "value": 3,
                "description": " only human"
            },
            {
                "axis": "Energy",
                "value": 1,
                "description": " only human"
            },
            {
                "axis": "Fighting Skills",
                "value": 6,
                "description": "able to judge combat decisively "
            }
        ]
    },
    {
        "group": "Iron Man",
        "axes": [
            {
                "axis": "Intelligence",
                "value": 7,
                "description": "Smart entreprenuer"
            },
            {
                "axis": "Strength",
                "value": 6,
                "description": "Powered by his suit"
            },
            {
                "axis": "Speed",
                "value": 5,
                "description": "rocket boosters"
            },
            {
                "axis": "Durability",
                "value": 6,
                "description": "tough durable material"
            },
            {
                "axis": "Energy",
                "value": 6,
                "description": ""
            },
            {
                "axis": "Fighting Skills",
                "value": 4,
                "description": ""
            }
        ]
    },
    {
        "group": "Hulk",
        "axes": [
            {
                "axis": "Intelligence",
                "value": 6,
                "description": "Scientist brilliance"
            },
            {
                "axis": "Strength",
                "value": 7,
                "description": "Insanely strong"
            },
            {
                "axis": "Speed",
                "value": 3,
                "description": "clumsy"
            },
            {
                "axis": "Durability",
                "value": 7,
                "description": "Close to industructible"
            },
            {
                "axis": "Energy",
                "value": 1,
                "description": ""
            },
            {
                "axis": "Fighting Skills",
                "value": 4,
                "description": "great at SMASHING"
            }
        ]
    },
    {
        "group": "Thor",
        "axes": [
            {
                "axis": "Intelligence",
                "value": 2,
                "description": "not too bright"
            },
            {
                "axis": "Strength",
                "value": 7,
                "description": "god-like strength"
            },
            {
                "axis": "Speed",
                "value": 7,
                "description": "god-like speed"
            },
            {
                "axis": "Durability",
                "value": 6,
                "description": "god-like durability"
            },
            {
                "axis": "Energy",
                "value": 6,
                "description": ""
            },
            {
                "axis": "Fighting Skills",
                "value": 4,
                "description": "quite low for a god???"
            }
        ]
    }
];
     // });
    }
  }

  // directive function sunburst
  function radar() {
    return {
      restrict: "E",
      scope: {
        datainfo: "=",
        config: "="
      },
      link: radarDraw
    };
  }


  // directive function onReadFile
  function onReadFile($parse) {
    return {
      restrict: "A",
      scope: false,
      link: function(scope, element, attrs) {
        var fn = $parse(attrs.onReadFile);
        element.on("change", function(onChangeEvent) {
          var reader = new FileReader();
          reader.onload = function(onLoadEvent) {
            scope.$apply(function() {
              fn(scope, {
                $fileContent: onLoadEvent.target.result
              });
            });
          };
          reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
        });
      }
    };
  }
})();