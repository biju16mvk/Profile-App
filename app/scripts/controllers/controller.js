/*global angular, $, localStorage, noty, btoa, IS_URL, App, Plugins, Option, FormComponents, NProgress*/
var app = angular.module('newAngularApp'), client_id = 'jQ7Bz95g1mnQAewbspL_WvtiB64a', client_secret = 'SjfA42xTybhjUQkl02icSZdaLXQa';

app.controller('PatientCtrl', function ($scope, $http, $rootScope, $timeout, ISUrlService) {
    NProgress.start();
    $scope.dateOptions = {
        changeYear: true,
        changeMonth: true,
        yearRange: '1900:-0'
    };
    $rootScope.title = 'Create Patient';
    $rootScope.sidemenu = true;
    $scope.buttonText = 'Create Patient';
    $http({
        url: ISUrlService.MEDIGY_ESB_URL + '/api/livingarrangement.json',
        method: "GET",
    }).success(function (data) {
        $scope.livingarrangementdatas = data.LivingArrangement.type;
    });
    $http({
        url: ISUrlService.MEDIGY_ESB_URL + '/api/education.json',
        method: "GET",
    }).success(function (data) {
        $scope.educationdatas = data.educational.type;
    });
    $http({
        url: ISUrlService.MEDIGY_ESB_URL + '/api/address.json',
        method: "GET",
    }).success(function (data) {
        $scope.addressdatas = data.address.type;
    });
    $http({
        url: ISUrlService.MEDIGY_ESB_URL + '/api/religion.json ',
        method: "GET",
    }).success(function (data) {
        $scope.religiondatas = data.religion.type;
    });
    $scope.createPatient = function (event) {
        var el = angular.element(event.target);
        App.blockUI(el);
        NProgress.start();
        var data = {
            "schemas": [],
            "userName": $scope.credentials.firstname,
            "password": "Wso2@123",
            "wso2Extension": {
                "patient": {
                    "patienttitle": $scope.credentials.title,
                    "patientfname": $scope.credentials.firstname,
                    "patientmname": $scope.credentials.middlename,
                    "patientlname": $scope.credentials.lastname,
                    "patientdob": $scope.credentials.dob,
                    "patientbplace": $scope.credentials.birthplace,
                    "patientmdname": $scope.credentials.maidenname,
                    "patientgender": $scope.credentials.gender,
                    "patientliving": $scope.credentials.livingarrangement,
                    "patienteducation": $scope.credentials.education,
                    "patientlanguages": $scope.credentials.language,
                    "patientrelegion": $scope.credentials.religion,
                    "patientethinicity": $scope.credentials.ethinicity,
                    "patientrace": $scope.credentials.race,
                    "patientcommunication": $scope.credentials.communicationpreference,
                    "patientaddr": $scope.credentials.address,
                    "patientstreet": $scope.credentials.street,
                    "patientcity": $scope.credentials.city,
                    "patientstate": $scope.credentials.state,
                    "patientPO": $scope.credentials.postalcode,
                    "patientemail": $scope.credentials.email,
                    "patientphoneno": $scope.credentials.phone,
                    "patientfaxno": $scope.credentials.fax
                }
            }
        };
        $http({
            url: ISUrlService.IS_URL,
            method: "POST",
            data: JSON.stringify(data),
            headers: {'Authorization': 'Basic ' + btoa(localStorage.getItem("username") + ":" + localStorage.getItem("password"))},
        }).success(function () {
            $timeout(function () {
                App.unblockUI(el);
                noty({
                    text: '<strong>Patient created successfully.</strong>',
                    type: 'success',
                    timeout: 5000
                });
            }, 1000);
            NProgress.done();
        }).error(function (data) {
            if (data.Errors[0].code === '409') {
                $scope.error = 'User with the name ' + $scope.credentials.firstname + ' already exists in the system..';
            } else {
                $scope.error = 'Error occurred in creating patient.';
            }
            $timeout(function () {
                App.unblockUI(el);
                noty({
                    text: '<strong>' + $scope.error + '</strong>',
                    type: 'error',
                    timeout: 5000
                });
            }, 1000);
            NProgress.done();
        });
    };
    NProgress.done();
});
app.controller('SidebarCtrl', function ($timeout, $rootScope) {
    NProgress.start();
    $timeout(function () {
        App.init();
        Plugins.init();
        FormComponents.init();
        $rootScope.sidemenu = true;
    },100);
    NProgress.done();
});
app.controller('SwaggerCtrl', function ($rootScope) {
    $rootScope.sidemenu = true;
});
app.controller('ProfessionalCtrl', function ($scope, $http, $rootScope, $timeout, ISUrlService) {
    NProgress.start();
    $scope.dateOptions = {
        changeYear: true,
        changeMonth: true,
        yearRange: '1900:-0'
    };
    $scope.buttonText = 'Create Professional';
    $rootScope.title = 'Create Professional';
    $rootScope.sidemenu = true;
    $http({
        url: ISUrlService.MEDIGY_ESB_URL + '/api/livingarrangement.json',
        method: "GET",
    }).success(function (data) {
        $scope.livingarrangementdatas = data.LivingArrangement.type;
    });
    $http({
        url: ISUrlService.MEDIGY_ESB_URL + '/api/education.json',
        method: "GET",
    }).success(function (data) {
        $scope.educationdatas = data.educational.type;
    });
    $http({
        url: ISUrlService.MEDIGY_ESB_URL + '/api/address.json',
        method: "GET",
    }).success(function (data) {
        $scope.addressdatas = data.address.type;
    });
    $http({
        url: ISUrlService.MEDIGY_ESB_URL + '/api/category.json',
        method: "GET",
    }).success(function (data) {
        $scope.categorydatas = data.category.type;
    });
    $http({
        url: ISUrlService.MEDIGY_ESB_URL + '/api/religion.json ',
        method: "GET",
    }).success(function (data) {
        $scope.religiondatas = data.religion.type;
    });
    $scope.createProfessional = function (event) {
        var el = angular.element(event.target);
        App.blockUI(el);
        NProgress.start();
        if($scope.formdata) {
            $scope.userName = $scope.formdata.NPI;
        } else {
            $scope.userName = $scope.credentials.npi;
        }
        var data = {
            "schemas": [],
            "userName": $scope.userName,
            "password": $scope.credentials.firstname,
            "wso2Extension": {
                "professional": {
                    "proftitle": $scope.credentials.title,
                    "profcatog": $scope.credentials.category,
                    "proffname": $scope.credentials.firstname,
                    "profmname": $scope.credentials.middlename,
                    "proflname": $scope.credentials.lastname,
                    "profdob": $scope.credentials.dob,
                    "profgeneder": $scope.credentials.gender,
                    "profliving": $scope.credentials.livingarrangement,
                    "profeducation": $scope.credentials.education,
                    "proflanguages": $scope.credentials.language,
                    "profrelegion": $scope.credentials.religion,
                    "profaddress": $scope.credentials.address,
                    "profstreet": $scope.credentials.street,
                    "profcity": $scope.credentials.city,
                    "profstate": $scope.credentials.state,
                    "profPO": $scope.credentials.postalcode,
                    "profphonrno": $scope.credentials.phone,
                    "proffaxno": $scope.credentials.fax
                }
            }
        };
        $http({
            url: ISUrlService.IS_URL,
            method: "POST",
            data: JSON.stringify(data),
            headers: {'Authorization': 'Basic ' + btoa(localStorage.getItem("username") + ":" + localStorage.getItem("password"))},
        }).success(function () {
            $timeout(function () {
                App.unblockUI(el);
                noty({
                    text: '<strong>Professional created successfully..</strong>',
                    type: 'success',
                    timeout: 5000
                });
            }, 1000);
            NProgress.done();
        }).error(function (data) {
            if (data.Errors[0].code === '409') {
                $scope.error = 'User with the id ' + $scope.userName + ' already exists in the system..';
            } else {
                $scope.error = 'Error occurred in creating professional.';
            }
            $timeout(function () {
                App.unblockUI(el);
                noty({
                    text: '<strong>' + $scope.error + '</strong>',
                    type: 'error',
                    timeout: 5000
                });
            }, 1000);
            NProgress.done();
        });
    };
    $scope.searchByName = function () {
        NProgress.start();
        if($scope.credentials) {
            $http({
                url: ISUrlService.MEDIGY_ESB_URL + '/api/namedetails.json?name=' + $scope.credentials.firstname,
                method: "GET",
            }).success(function (data) {
                $scope.userdatas = true;
                $scope.usersuggestions = data.details.professional;
                NProgress.done();
            });            
        } else {
            $timeout(function () {
                noty({
                    text: '<strong>Please enter a value.</strong>',
                    type: 'error',
                    timeout: 2000
                });
            }, 1000);
        }
        NProgress.done();
    };

    $scope.getUserByName = function (event, value) {
        NProgress.start();
        $scope.credentials.firstname = angular.element(event.target).html().trim();
        $scope.userdatas = false;
        $http({
            url: ISUrlService.MEDIGY_ESB_URL + '/api/npidetails.json?npi=' + value,
            method: "GET",
        }).success(function (data) {
            $scope.formdata = data.details.professional;
            for(var i in $scope.formdata) {
                if(typeof $scope.formdata[i] === 'object') {
                    delete $scope.formdata[i];
                }
            }
            $scope.credentials = {
                npi: $scope.formdata.NPI,
                title: $scope.formdata.AuthorizedOfficialTitleorPosition,
                category: $scope.formdata.profcatog,
                firstname: $scope.formdata.ProviderFirstName,
                middlename: $scope.formdata.ProviderMiddleName,
                lastname: $scope.formdata.ProviderLastName,
                dob: $scope.formdata.profdob,
                gender: $scope.formdata.ProviderGenderCode,
                livingarrangement: $scope.formdata.profliving,
                education: $scope.formdata.profeducation,
                language: $scope.formdata.proflanguages,
                religion: $scope.formdata.profrelegion,
                address: $scope.formdata.ProviderFirstLineBusinessPracticeLocationAddress,
                street: $scope.formdata.profstreet,
                city: $scope.formdata.ProviderBusinessMailingAddressCityName,
                state: $scope.formdata.ProviderBusinessMailingAddressStateName,
                postalcode: $scope.formdata.ProviderBusinessMailingAddressPostalCode,
                phone: $scope.formdata.ProviderBusinessMailingAddressTelephoneNumber,
                fax: $scope.formdata.ProviderBusinessMailingAddressFaxNumber
            };
            NProgress.done();
        });
    };
    NProgress.done();
});
app.controller('GroupCtrl', function ($scope, $http, $rootScope, $timeout, ISUrlService) {
    NProgress.start();
    $rootScope.sidemenu = true;
    $scope.professional = [];
    $scope.patient = [];
    $scope.allusers = [];
    var i, data;
    $scope.createGroup = function () {
        $scope.members = [];
        if ($scope.users) {
            for (i = 0; i < $scope.users.length; i++) {
                $scope.userarray = $scope.users[i].split('~');
                $scope.members.push({'value': $scope.userarray[0], 'display': $scope.userarray[1]});
            }
        }
        var el = angular.element('#frmCreateGroup');
        App.blockUI(el);
        if ($scope.members.length > 0) {
            data = {
                "displayName": $scope.credentials.grouptitle,
                "members": $scope.members
            };
        } else {
            data = {
                "displayName": $scope.credentials.grouptitle
            };
        }
        $http({
            url: ISUrlService.IS_GROUP_URL,
            method: "POST",
            data: JSON.stringify(data),
            headers: {'Authorization': 'Basic ' + btoa(localStorage.getItem("username") + ":" + localStorage.getItem("password"))},
        }).success(function () {
            $timeout(function () {
                App.unblockUI(el);
                noty({
                    text: '<strong>Group created successfully.</strong>',
                    type: 'success',
                    timeout: 5000
                });
            }, 1000);
        }).error(function (data) {
            if (data.Errors[0].code === '409') {
                $scope.error = 'Group with the name ' + $scope.credentials.grouptitle + ' already exists.';
            } else {
                $scope.error = 'Error occurred in creating group.';
            }
            $timeout(function () {
                App.unblockUI(el);
                noty({
                    text: '<strong>' + $scope.error + '</strong>',
                    type: 'error',
                    timeout: 5000
                });
            }, 1000);
        });
    };
    $scope.addUserstoGroup = function () {
        NProgress.start();
        $scope.show = true;
        $http({
            url: ISUrlService.IS_URL,
            method: "GET",
            headers: {'Authorization': 'Basic ' + btoa(localStorage.getItem("username") + ":" + localStorage.getItem("password"))}
        }).success(function (data) {
            for (i = 0; i < data.Resources.length; i++) {
                if(data.Resources[i].wso2Extension) {
                    if (data.Resources[i].wso2Extension.professional) {
                        $scope.professional.push(data.Resources[i]);
                    }                    
                }
                if(data.Resources[i].wso2Extension) {
                    if (data.Resources[i].wso2Extension.patient) {
                        $scope.patient.push(data.Resources[i]);
                    }
                }
            }
            for (i = 0; i < $scope.professional.length; i++) {
                if($scope.professional[i].wso2Extension.professional.proflname) {
                    $scope.name = $scope.professional[i].wso2Extension.professional.proffname + ' ' + $scope.professional[i].wso2Extension.professional.proflname;  
                } else {
                    $scope.name = $scope.professional[i].wso2Extension.professional.proffname;
                }
                $scope.name = $scope.professional[i].wso2Extension.professional.proffname + ' ' + $scope.professional[i].wso2Extension.professional.proflname;
                $scope.allusers.push({'id': $scope.professional[i].id, 'value': $scope.name, 'userName': $scope.professional[i].userName});
            }
            for (i = 0; i < $scope.patient.length; i++) {
                if($scope.patient[i].wso2Extension.patient.patientlname) {
                    $scope.name = $scope.patient[i].wso2Extension.patient.patientfname + ' ' + $scope.patient[i].wso2Extension.patient.patientlname;  
                } else {
                    $scope.name = $scope.patient[i].wso2Extension.patient.patientfname;
                }
                $scope.allusers.push({'id': $scope.patient[i].id, 'value': $scope.name, 'userName': $scope.professional[i].userName});
            }
            NProgress.done();
        });
    };
    $scope.selectAllLeft = function (ID) {
        angular.element("#"+ ID + ' option').prop("selected", "true");
    }
    NProgress.done();
});
app.controller('ListGroupCtrl', function ($scope, $http, $route, $rootScope, $timeout, ISUrlService, $window) {
    NProgress.start();
    $rootScope.sidemenu = true;
    $http({
        url: ISUrlService.IS_GROUP_URL,
        method: 'GET',
        headers: {'Authorization': 'Basic ' + btoa(localStorage.getItem("username") + ":" + localStorage.getItem("password"))},
    }).success(function (data) {
        $scope.groups = data.Resources;
        NProgress.done();
        $timeout(function() {
            Plugins.showDataTable();
        }, 0);
    }).error(function () {
        $timeout(function () {
            noty({
                text: '<strong>Error occurred in fetching group details.</strong>',
                type: 'error',
                timeout: 5000
            });
        }, 1000);
        NProgress.done();
    });
    $scope.deleteGroup = function (id, event) {
        var el = angular.element(event.target).parents().eq(6);
        App.blockUI(el);
        $http({
            url: ISUrlService.IS_GROUP_URL + '/' + id,
            method: "DELETE",
            headers: {'Authorization': 'Basic ' + btoa(localStorage.getItem("username") + ":" + localStorage.getItem("password"))},
        }).success(function () {
            App.unblockUI(el);
            $timeout(function () {
                noty({
                    text: '<strong>Group details deleted.</strong>',
                    type: 'success',
                    timeout: 5000
                });
                $route.reload();
            }, 1000);
        });
    };
});
app.controller('GroupEditCtrl', function ($rootScope, $scope, $http, $routeParams, $timeout, ISUrlService) {
    NProgress.start();
    var i, x, o, theOpt, data;
    $scope.groupusers = [];
    $http({
        url: ISUrlService.IS_GROUP_URL + '/' + $routeParams.id,
        method: 'GET',
        headers: {'Authorization': 'Basic ' + btoa(localStorage.getItem("username") + ":" + localStorage.getItem("password"))},
    }).success(function (data) {
        $scope.groupmembers = data.members;
        $scope.grouptitle = data.displayName;
        $http({
            url: ISUrlService.IS_URL,
            method: "GET",
            headers: {'Authorization': 'Basic ' + btoa(localStorage.getItem("username") + ":" + localStorage.getItem("password"))}
        }).success(function (data) {
            for (i = 0; i < data.Resources.length; i++) {
                if(data.Resources[i].wso2Extension) {
                    if (data.Resources[i].wso2Extension.professional) {
                        $scope.professional.push(data.Resources[i]);
                    }                    
                }
                if(data.Resources[i].wso2Extension) {
                    if (data.Resources[i].wso2Extension.patient) {
                        $scope.patient.push(data.Resources[i]);
                    }
                }
            }
            for (i = 0; i < $scope.professional.length; i++) {
                if($scope.professional[i].wso2Extension.professional.proflname) {
                    $scope.name = $scope.professional[i].wso2Extension.professional.proffname + ' ' + $scope.professional[i].wso2Extension.professional.proflname;  
                } else {
                    $scope.name = $scope.professional[i].wso2Extension.professional.proffname;
                }
                $scope.users.push({'value': $scope.professional[i].id, 'userName': $scope.name, 'display': $scope.professional[i].userName});
            }
            for (i = 0; i < $scope.patient.length; i++) {
                if($scope.patient[i].wso2Extension.patient.patientlname) {
                    $scope.name = $scope.patient[i].wso2Extension.patient.patientfname + ' ' + $scope.patient[i].wso2Extension.patient.patientlname;  
                } else {
                    $scope.name = $scope.patient[i].wso2Extension.patient.patientfname;
                }
                $scope.users.push({'value': $scope.patient[i].id, 'userName': $scope.name, 'display': $scope.patient[i].userName});
            }
            if($scope.groupmembers) {
                var onlyInUsers = $scope.users.filter(function (current) {
                    return $scope.groupmembers.filter(function (current_b) {
                        return current_b.value === current.value && current_b.display === current.display;
                    }).length === 0;
                });
                var onlyInGroupMembers = $scope.groupmembers.filter(function (current) {
                    return $scope.users.filter(function (current_a) {
                        return current_a.value === current.value && current_a.display === current.display;
                    }).length === 0;
                });
                $scope.users.filter(function (current) {
                    $scope.groupmembers.filter(function (current_b) {
                       if(current_b.value === current.value && current_b.display === current.display) {
                           $scope.groupusers.push({'value': current.value, 'userName': current.display, 'display': current.userName})
                       }
                    });
                });
                $scope.allusers = onlyInUsers.concat(onlyInGroupMembers);      
            } else {
                $scope.allusers = $scope.users;
            }
        });
        NProgress.done();
    });
    $scope.selectAllLeft = function (ID) {
        angular.element("#"+ ID + ' option').prop("selected", "true");
    }
    $scope.selectAllRight = function (ID) {
        angular.element("#"+ ID + ' option').prop("selected", "true");
    }
    $rootScope.sidemenu = true;
    $scope.professional = [];
    $scope.patient = [];
    $scope.users = [];
    $scope.toggleOption = function (fromID, toID) {
        for (x = angular.element("#"+ fromID + ' option').length - 1; x >= 0; x--) {
            if (angular.element("#"+ fromID + ' option').eq(x).is(':selected') === true) {
                $scope.moveOption(fromID, toID, x);
            }
        }
    };
    $scope.moveOption = function (fromID, toID, idx) {
        i = idx;
        var value = angular.element("#"+ fromID + ' option').eq(i).val();
        var text  = angular.element("#"+ fromID + ' option').eq(i).text();
        theOpt = new Option(text, value, false, false);
        var length = angular.element("#"+ toID + ' option').length;
        document.getElementById(toID).options[length] = theOpt;
        document.getElementById(fromID).options[i] = null;
    };
    $scope.editGroup = function () {
        $scope.members = [];
        if ($scope.selectedusers) {
            for (i = 0; i < $scope.selectedusers.length; i++) {
                $scope.userarray = $scope.selectedusers[i].split('~');
                $scope.members.push({'value': $scope.userarray[0], 'display': $scope.userarray[1]});
            }
        }/* else {
            $scope.members = $scope.groupmembers;
        }*/
        var el = angular.element('#editGroup');
        App.blockUI(el);
        if ($scope.members.length > 0) {
            data = {
                "displayName": $scope.grouptitle,
                "members": $scope.members
            };
        } else {
            data = {
                "displayName": $scope.grouptitle
            };
        }
        $http({
            url: ISUrlService.IS_GROUP_URL + '/' + $routeParams.id,
            method: "PUT",
            data: JSON.stringify(data),
            headers: {'Authorization': 'Basic ' + btoa(localStorage.getItem("username") + ":" + localStorage.getItem("password"))},
        }).success(function () {
            $timeout(function () {
                App.unblockUI(el);
                noty({
                    text: '<strong>Group updated successfully.</strong>',
                    type: 'success',
                    timeout: 5000
                });
            }, 1000);
        }).error(function () {
            $timeout(function () {
                App.unblockUI(el);
                noty({
                    text: '<strong>Error occurred in updating group.</strong>',
                    type: 'error',
                    timeout: 5000
                });
            }, 1000);
        });
    };
});
app.controller('LoginCtrl', function ($scope, $location, $rootScope, $http, ISUrlService) {
    $rootScope.sidemenu = false;
    $scope.loginUser = function () {
        var uname = $scope.credentials.userid;
        var password = $scope.credentials.password;
        NProgress.start();
        if($scope.credentials) {
            if($scope.credentials.userid && $scope.credentials.password) {
                localStorage.setItem("username", $scope.credentials.userid);
                localStorage.setItem("password", $scope.credentials.password);
                $scope.credentials = $.param({
                    username: $scope.credentials.userid,
                    password: $scope.credentials.password
                });
                var formdata = "client_id=" + client_id + "&client_secret=" + client_secret + "&grant_type=password&" + $scope.credentials;
                $http({
                    url: ISUrlService.IS_AUTH_URL,
                    method: "POST",
                    data: formdata,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function (data) {
                    $scope.data = data;
                    $location.path('/home');
                    NProgress.done();
                }).error(function () {
                    $scope.flash = 'Invalid username or password';
                    NProgress.done();
                });
                $scope.credentials = {
                    userid: uname,
                    password: password
                };
            } else {
                $scope.flash = 'Both fields are required.';
                NProgress.done();                
            }
 
        } else {
            $scope.flash = 'Please fill in both username and password';
            NProgress.done();
        }
    };
    $scope.logout = function () {
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        $location.path('/login');
    };
});

app.controller('UserCtrl', function ($scope, $rootScope, $http, $timeout, ISUrlService) {
    NProgress.start();
    $rootScope.title = 'Profile Details';
    $rootScope.sidemenu = true;
    $scope.professional = [];
    $scope.patient = [];
    var i;
    $http({
        url: ISUrlService.IS_URL,
        method: "GET",
        headers: {'Authorization': 'Basic ' + btoa(localStorage.getItem("username") + ":" + localStorage.getItem("password"))}
    }).success(function (data) {
        for (i = 0; i < data.Resources.length; i++) {
            if(data.Resources[i].wso2Extension) {
                if (data.Resources[i].wso2Extension.professional) {
                    $scope.professional.push(data.Resources[i]);
                }                
            }
            if(data.Resources[i].wso2Extension) {
                if (data.Resources[i].wso2Extension.patient) {
                    $scope.patient.push(data.Resources[i]);
                }
            }
        }
        NProgress.done();
    }).error(function () {
        $timeout(function () {
            noty({
                text: '<strong>Users not found in the user store.</strong>',
                type: 'error',
                timeout: 5000
            });
        }, 1000);
        NProgress.done();
    });
    $scope.getUserbyId = function (id) {
        NProgress.start();
        $http({
            url: ISUrlService.IS_URL + "/" + id,
            method: "GET",
            headers: {'Authorization': 'Basic ' + btoa(localStorage.getItem("username") + ":" + localStorage.getItem("password"))},
        }).success(function (data) {
            $scope.userdatas = data;
            NProgress.done();
        });
    };
    NProgress.done();
});
app.controller('HomeCtrl', function ($rootScope, $scope, $http, ISUrlService) {
    NProgress.start();
    $rootScope.sidemenu = true;
    $scope.professional = [];
    $scope.patient = [];
    $scope.name = localStorage.getItem("username");
    var i;
    $http({
        url: ISUrlService.IS_URL,
        method: "GET",
        headers: {'Authorization': 'Basic ' + btoa(localStorage.getItem("username") + ":" + localStorage.getItem("password"))}
    }).success(function (data) {
        for (i = 0; i < data.Resources.length; i++) {
            if(data.Resources[i].wso2Extension) {
                if (data.Resources[i].wso2Extension.professional) {
                    $scope.professional.push(data.Resources[i].wso2Extension.professional);
                }                
            }
            if(data.Resources[i].wso2Extension) {
                if (data.Resources[i].wso2Extension.patient) {
                    $scope.patient.push(data.Resources[i].wso2Extension.patient);
                }
            }
        }
        $scope.professionalcount = $scope.professional.length;
        $scope.patientcount = $scope.patient.length;
        $scope.allusercount = $scope.professional.length + $scope.patient.length;
    });
    $http({
        url: ISUrlService.IS_GROUP_URL,
        method: "GET",
        headers: {'Authorization': 'Basic ' + btoa(localStorage.getItem("username") + ":" + localStorage.getItem("password"))}
    }).success(function (data) {
        $scope.groups = data.Resources;
        $scope.groupcount = data.totalResults;
    });
    NProgress.done();
});
app.controller('MainCtrl', function ($scope, $http, $rootScope, $route, $timeout, ISUrlService) {
    NProgress.start();
    $rootScope.sidemenu = true;
    $scope.professional = [];
    $scope.patient = [];
    var i;
    $http({
        url: ISUrlService.IS_URL,
        method: "GET",
        headers: {'Authorization': 'Basic ' + btoa(localStorage.getItem("username") + ":" + localStorage.getItem("password"))}
    }).success(function (data) {
        for (i = 0; i < data.Resources.length; i++) {
            if(data.Resources[i].wso2Extension) {
                if (data.Resources[i].wso2Extension.professional) {
                    $scope.professional.push(data.Resources[i]);
                }                
            }
            if(data.Resources[i].wso2Extension) {
                if (data.Resources[i].wso2Extension.patient) {
                    $scope.patient.push(data.Resources[i]);
                }
            }
        }
        $timeout(function() {
            Plugins.showDataTable();
        }, 0);
        NProgress.done();
    }).error(function () {
        $timeout(function () {
            noty({
                text: '<strong>Users not found in the user store.</strong>',
                type: 'error',
                timeout: 5000
            });
        }, 1000);
        NProgress.done();
    });
    $scope.deleteProfessional = function (id, event) {
        var el = angular.element(event.target).parents().eq(6);
        App.blockUI(el);
        $scope.professional = [];
        $scope.patient = [];
        NProgress.start();
        $http({
            url: ISUrlService.IS_URL + '/' + id,
            method: "DELETE",
            headers: {'Authorization': 'Basic ' + btoa(localStorage.getItem("username") + ":" + localStorage.getItem("password"))},
        }).success(function () {
            $timeout(function () {
                App.unblockUI(el);
                noty({
                    text: '<strong>Professional details deleted.</strong>',
                    type: 'success',
                    timeout: 5000
                });
                $route.reload();
            }, 1000);
            NProgress.done();
        });
    };
    $scope.deletePatient = function (id, event) {
        var el = angular.element(event.target).parents().eq(6);
        App.blockUI(el);
        $scope.professional = [];
        $scope.patient = [];
        NProgress.start();
        $http({
            url: ISUrlService.IS_URL + '/' + id,
            method: "DELETE",
            headers: {'Authorization': 'Basic ' + btoa(localStorage.getItem("username") + ":" + localStorage.getItem("password"))},
        }).success(function () {
            $timeout(function () {
                App.unblockUI(el);
                noty({
                    text: '<strong>Patient details deleted.</strong>',
                    type: 'success',
                    timeout: 5000
                });
                $route.reload();
            }, 1000);
            NProgress.done();
        });
    };
});
app.controller('ProfessionalEditCtrl', function ($scope, $timeout, $http, $routeParams, $rootScope, ISUrlService) {
    NProgress.start();
    $scope.dateOptions = {
        changeYear: true,
        changeMonth: true,
        yearRange: '1900:-0'
    };
    $rootScope.sidemenu = true;
    $rootScope.title = 'Update Professional';
    $scope.buttonText = 'Update Professional';
    $http({
        url: ISUrlService.IS_URL + '/' + $routeParams.id,
        method: "GET",
        headers: {'Authorization': 'Basic ' + btoa(localStorage.getItem("username") + ":" + localStorage.getItem("password"))},
    }).success(function (data) {
        $scope.userid = data.id;
        $scope.userdatas = data.wso2Extension.professional;
        $scope.username = data.userName;
        $scope.credentials = {
            title: $scope.userdatas.proftitle,
            category: $scope.userdatas.profcatog,
            npi: $scope.username,
            firstname: $scope.userdatas.proffname,
            middlename: $scope.userdatas.profmname,
            lastname: $scope.userdatas.proflname,
            dob: $scope.userdatas.profdob,
            gender: $scope.userdatas.profgeneder,
            livingarrangement: $scope.userdatas.profliving,
            education: $scope.userdatas.profeducation,
            language: $scope.userdatas.proflanguages,
            religion: $scope.userdatas.profrelegion,
            address: $scope.userdatas.profaddress,
            street: $scope.userdatas.profstreet,
            city: $scope.userdatas.profcity,
            state: $scope.userdatas.profstate,
            postalcode: $scope.userdatas.profPO,
            phone: $scope.userdatas.profphonrno,
            fax: $scope.userdatas.proffaxno
        };
        NProgress.done();
    });
    $scope.createProfessional = function (event) {
        var el = angular.element(event.target);
        App.blockUI(el);
        NProgress.start();
        var data = {
            "schemas": [],
            "userName": $scope.username,
            "wso2Extension": {
                "professional": {
                    "proftitle": $scope.credentials.title,
                    "profcatog": $scope.credentials.category,
                    "proffname": $scope.credentials.firstname,
                    "profmname": $scope.credentials.middlename,
                    "proflname": $scope.credentials.lastname,
                    "profdob": $scope.credentials.dob,
                    "profgeneder": $scope.credentials.gender,
                    "profliving": $scope.credentials.livingarrangement,
                    "profeducation": $scope.credentials.education,
                    "proflanguages": $scope.credentials.language,
                    "profrelegion": $scope.credentials.religion,
                    "profaddress": $scope.credentials.address,
                    "profstreet": $scope.credentials.street,
                    "profcity": $scope.credentials.city,
                    "profstate": $scope.credentials.state,
                    "profPO": $scope.credentials.postalcode,
                    "profphonrno": $scope.credentials.phone,
                    "proffaxno": $scope.credentials.fax
                }
            }
        };
        $http({
            url: ISUrlService.IS_URL + '/' + $scope.userid,
            method: "PUT",
            data: JSON.stringify(data),
            headers: {'Authorization': 'Basic ' + btoa(localStorage.getItem("username") + ":" + localStorage.getItem("password"))},
        }).success(function () {
            $timeout(function () {
                App.unblockUI(el);
                noty({
                    text: '<strong>Updated Professional Details.</strong>',
                    type: 'success',
                    timeout: 5000
                });
            }, 1000);
            NProgress.done();
        }).error(function () {
            $timeout(function () {
                App.unblockUI(el);
                noty({
                    text: '<strong>Error occured in updating professional details.</strong>',
                    type: 'error',
                    timeout: 5000
                });
            }, 1000);
            NProgress.done();
        });
    };
});
app.controller('PatientEditCtrl', function ($scope, $timeout, $http, $routeParams, $rootScope, ISUrlService) {
    NProgress.start();
    $scope.dateOptions = {
        changeYear: true,
        changeMonth: true,
        yearRange: '1900:-0'
    };
    $rootScope.sidemenu = true;
    $rootScope.title = 'Update Patient';
    $scope.buttonText = 'Update Patient';
    $http({
        url: ISUrlService.IS_URL + '/' + $routeParams.id,
        method: "GET",
        headers: {'Authorization': 'Basic ' + btoa(localStorage.getItem("username") + ":" + localStorage.getItem("password"))},
    }).success(function (data) {
        $scope.userid = data.id;
        $scope.userdatas = data.wso2Extension.patient;
        $scope.username = data.userName;
        $scope.credentials = {
            title: $scope.userdatas.patienttitle,
            category: $scope.userdatas.patientcatog,
            firstname: $scope.userdatas.patientfname,
            middlename: $scope.userdatas.patientmname,
            lastname: $scope.userdatas.patientlname,
            dob: $scope.userdatas.patientdob,
            gender: $scope.userdatas.patientgender,
            livingarrangement: $scope.userdatas.patientliving,
            education: $scope.userdatas.patienteducation,
            language: $scope.userdatas.patientlanguages,
            religion: $scope.userdatas.patientrelegion,
            ethinicity: $scope.userdatas.patientethinicity,
            race: $scope.userdatas.patientrace,
            communicationpreference: $scope.userdatas.patientcommunication,
            address: $scope.userdatas.patientaddr,
            street: $scope.userdatas.patientstreet,
            city: $scope.userdatas.patientcity,
            state: $scope.userdatas.patientstate,
            postalcode: $scope.userdatas.patientPO,
            phone: $scope.userdatas.patientphonrno,
            fax: $scope.userdatas.patientfaxno
        };
        NProgress.done();
    });
    $scope.createPatient = function (event) {
        var el = angular.element(event.target);
        App.blockUI(el);
        NProgress.start();
        var data = {
            "schemas": [],
            "userName": $scope.username,
            "wso2Extension": {
                "patient": {
                    "patienttitle": $scope.credentials.title,
                    "patientfname": $scope.credentials.firstname,
                    "patientmname": $scope.credentials.middlename,
                    "patientlname": $scope.credentials.lastname,
                    "patientdob": $scope.credentials.dob,
                    "patientbplace": $scope.credentials.birthplace,
                    "patientmdname": $scope.credentials.maidenname,
                    "patientgender": $scope.credentials.gender,
                    "patientliving": $scope.credentials.livingarrangement,
                    "patienteducation": $scope.credentials.education,
                    "patientlanguages": $scope.credentials.language,
                    "patientrelegion": $scope.credentials.religion,
                    "patientethinicity": $scope.credentials.ethinicity,
                    "patientrace": $scope.credentials.race,
                    "patientcommunication": $scope.credentials.communicationpreference,
                    "patientaddr": $scope.credentials.address,
                    "patientstreet": $scope.credentials.street,
                    "patientcity": $scope.credentials.city,
                    "patientstate": $scope.credentials.state,
                    "patientPO": $scope.credentials.postalcode,
                    "patientemail": $scope.credentials.email,
                    "patientphoneno": $scope.credentials.phone,
                    "patientfaxno": $scope.credentials.fax
                }
            }
        };
        $http({
            url: ISUrlService.IS_URL + '/' + $scope.userid,
            method: "PUT",
            data: JSON.stringify(data),
            headers: {'Authorization': 'Basic ' + btoa(localStorage.getItem("username") + ":" + localStorage.getItem("password"))},
        }).success(function () {
            $timeout(function () {
                App.unblockUI(el);
                noty({
                    text: '<strong>Updated Patient Details.</strong>',
                    type: 'success',
                    timeout: 5000
                });
            }, 1000);
            NProgress.done();
        }).error(function () {
            $timeout(function () {
                App.unblockUI(el);
                noty({
                    text: '<strong>Error occured in updating patient details.</strong>',
                    type: 'error',
                    timeout: 5000
                });
            }, 1000);
            NProgress.done();
        });
    };
});
app.controller('NPICtrl', function ($rootScope, $scope, $http, $timeout, ISUrlService) {
    $rootScope.sidemenu = true;
    $scope.title = "Load data from NPI";
    $scope.searchByNpiID = function () {
        $scope.formdata = false;
        $scope.npiname = '';
        $http({
            url: ISUrlService.ELASTIC_SERVICE_URL + 'npi/' + $scope.npiid + '.json',
            method: 'GET'
        }).success(function (data) {
            $scope.formdata = data._source;
            NProgress.done();
        }).error(function () {
            $timeout(function () {
                noty({
                    text: '<strong>No user found with the NPI id ' + $scope.npiid + '</strong>',
                    type: 'error',
                    timeout: 5000
                });
            }, 1000); 
            NProgress.done();
        });;
    };
    $scope.searchByName = function () {
        $scope.formdata = false;
        $scope.npiid = '';
        NProgress.start();
        $http({
            url: ISUrlService.ELASTIC_SERVICE_URL + 'search/name.json?name=' + $scope.npiname,
            method: "GET",
        }).success(function (data) {
            $scope.userdatas = true;
            if(data.hits) {
                $scope.usersuggestions = data.hits.hits;    
            } else {
                $scope.userdatas = false;
                $timeout(function () {
                    noty({
                        text: '<strong>User ' + $scope.npiname + ' not exists in the database.</strong>',
                        type: 'error',
                        timeout: 5000
                    });
                }, 1000);                
            }
            NProgress.done();
        }).error(function () {
            $scope.userdatas = false;
            $timeout(function () {
                noty({
                    text: '<strong>Error in fetching user details</strong>',
                    type: 'error',
                    timeout: 5000
                });
            }, 1000);
            NProgress.done();         
        });
    };
    $scope.selectName = function (event, value) {
        $scope.formdata = false;
        NProgress.start();
        $scope.npiname = angular.element(event.target).html().trim();
        $scope.userdatas = false;
        $http({
            url: ISUrlService.ELASTIC_SERVICE_URL + 'npi/' + value + '.json',
            method: "GET",
        }).success(function (data) {
            $scope.formdata = data._source;
            NProgress.done();
        }).error(function () {
            $scope.formdata = false;
            $timeout(function () {
                noty({
                    text: '<strong>Error in fetching user details</strong>',
                    type: 'error',
                    timeout: 5000
                });
            }, 1000);
            NProgress.done();         
        });
    };
    $scope.createProfessional = function (event) {
        NProgress.start();
        var el = angular.element(event.target).parents().eq(5);
        App.blockUI(el);
        var data = {
            "schemas": [],
            "userName": $scope.formdata.NPI,
            "password": $scope.formdata['Provider First Name'],
            "wso2Extension": {
                "professional": {
                    "proffname": $scope.formdata['Provider First Name'],
                    "profmname": $scope.formdata['Provider Middle Name'],
                    "proflname": $scope.formdata['Provider Last Name (Legal Name)'],
                    "profgeneder": $scope.formdata['Provider Gender Code'],
                    "profstreet": $scope.formdata['Provider First Line Business Mailing Address'],
                    "profstate": $scope.formdata['Provider Business Mailing Address State Name'],
                    "profPO": $scope.formdata['Provider Business Practice Location Address Postal Code'],
                    "profphonrno": $scope.formdata['Provider Business Practice Location Address Telephone Number'],
                    "proffaxno": $scope.formdata['Provider Business Mailing Address Fax Number']
                }
            }
        };
        $http({
            url: ISUrlService.IS_URL,
            method: "POST",
            data: JSON.stringify(data),
            headers: {'Authorization': 'Basic ' + btoa(localStorage.getItem("username") + ":" + localStorage.getItem("password"))},
        }).success(function () {
            App.unblockUI(el);
            $timeout(function () {
                noty({
                    text: '<strong>Professional created successfully..</strong>',
                    type: 'success',
                    timeout: 5000
                });
            }, 1000);
            NProgress.done();
        }).error(function (data) {
            if (data.Errors[0].code === '409') {
                $scope.error = 'User with the NPI id ' + $scope.formdata.NPI + ' already exists in the system..';
            } else {
                $scope.error = 'Error occurred in creating professional.';
            }
            $timeout(function () {
                App.unblockUI(el);
                noty({
                    text: '<strong>' + $scope.error + '</strong>',
                    type: 'error',
                    timeout: 5000
                });
            }, 1000);
            NProgress.done();
        });
    };
});

app.controller('PieChartCtrl', function ($scope, $http, ISUrlService) {
    $scope.professional = [];
    $scope.patient = [];
    var i;
    $http({
        url: ISUrlService.IS_URL,
        method: "GET",
        headers: {'Authorization': 'Basic ' + btoa(localStorage.getItem("username") + ":" + localStorage.getItem("password"))}
    }).success(function (data) {
        for (i = 0; i < data.Resources.length; i++) {
            if(data.Resources[i].wso2Extension) {
                if (data.Resources[i].wso2Extension.professional) {
                    $scope.professional.push(data.Resources[i].wso2Extension.professional);
                }               
            }
            if(data.Resources[i].wso2Extension) {
                if (data.Resources[i].wso2Extension.patient) {
                    $scope.patient.push(data.Resources[i].wso2Extension.patient);
                }
            }
        }
        $scope.professionalcount = $scope.professional.length;
        $scope.patientcount = $scope.patient.length;
        $scope.allusercount = $scope.professional.length + $scope.patient.length;
        var d_pie = [];
        d_pie[0] = { label: "Professionals", data: Math.floor($scope.professionalcount * 100)};
        d_pie[1] = { label: "Patients", data: Math.floor($scope.patientcount * 100)};
        $.plot("#chart_pie", d_pie, $.extend(true, {}, Plugins.getFlotDefaults(), {
            series: {
                pie: {
                    show: true,
                    radius: 1,
                    label: {
                        show: true
                    }
                }
            },
            grid: {
                hoverable: true
            },
            tooltip: true,
            tooltipOpts: {
                content: '%p.0%, %s', // show percentages, rounding to 2 decimal places
                shifts: {
                    x: 20,
                    y: 0
                }
            }
        }));
    });
});
app.controller('GroupPieCharCtrl', function ($scope, $http, ISUrlService) {
    var i;
    $scope.capitalize = function (item) {
        return item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();
    };
    $http({
        url: ISUrlService.IS_GROUP_URL,
        method: "GET",
        headers: {'Authorization': 'Basic ' + btoa(localStorage.getItem("username") + ":" + localStorage.getItem("password"))}
    }).success(function (data) {
        $scope.groups = data.Resources;
        var d_pie = [];
        for (i = 0; i < $scope.groups.length; i++) {
            if($scope.groups[i].members)
            d_pie.push({label: $scope.capitalize($scope.groups[i].displayName), data: Math.floor($scope.groups[i].members.length * 100)});
        }
        $.plot("#group_chart_pie", d_pie, $.extend(true, {}, Plugins.getFlotDefaults(), {
            series: {
                pie: {
                    show: true,
                    radius: 1,
                    label: {
                        show: true
                    }
                }
            },
            grid: {
                hoverable: true
            },
            tooltip: true,
            tooltipOpts: {
                content: '%p.0%, %s', // show percentages, rounding to 2 decimal places
                shifts: {
                    x: 20,
                    y: 0
                }
            }
        }));
    });
});