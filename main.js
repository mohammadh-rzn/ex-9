let xhtml = new XMLHttpRequest();
let xhtml2 = new XMLHttpRequest();
let z = [];
//getting data
xhtml.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
        let x = this.responseText;
        xhtml2.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                let y = this.responseText;
                console.log(x);
                console.log(y);
                let x1 = JSON.parse(x);
                let y1 = JSON.parse(y);
                for (let k in x1) {
                    x = x1[k];
                }
                for (let k in y1) {
                    y = y1[k];
                }
                console.log(x);
                console.log(y);
                //concating two objects
                for (let i = 0; i < x.length; i++) {
                    for (let j = 0; j < y.length; j++) {
                        if (x[i].uid === y[j].uid) {
                            let a = Object.assign(x[i], y[j]);
                            z.push(a);
                        }
                    }
                }
                console.log(z);
                createTable(z);
            }
        }
        xhtml2.open("GET", "https://api.npoint.io/dc6cb50568fac72a4105")
        xhtml2.send()
    }
}
xhtml.open("GET", "https://api.npoint.io/177cea9c157de479d51b")
xhtml.send()
//creating table
function createTable(arr) {
    $(document).ready(function () {
        $("tbody").replaceWith("<tbody></tbody>");
        for (let i = 0; i < arr.length; i++) {
            $("tbody").append("<tr onclick = 'openPanel(this.id)'>" + "<td>" + arr[i].uid + "</td>" + "<td>" + arr[i].firstName + "</td>" + "<td>" + arr[i].lastName + "</td>" + "<td>" + arr[i].phoneNumber + "</td>" + "<td>" + arr[i].position + "</td>" + "<td>" + arr[i].postalCode + "</td>" + "<td>" + arr[i].city + "</td>" + "</tr>");
            $("body").find("tr").eq(i + 1).attr("id", arr[i].uid);
        }

    })
}
//opening panel 
function openPanel(id) {
    $(document).ready(function () {
        $(".container").css("display", "block");
        $("input").prop("disabled", true);
        $(".apply").css("display", "none");
        
        $(".edit").css("display", "block");
        $(".delete").css("display", "block");
        $(".add").css("display" , "none");
        for (let i = 0; i < z.length; i++) {
            if (id === z[i].uid) {
                $("#uid").val(z[i].uid);
                $("#firstName").val(z[i].firstName);
                $("#lastName").val(z[i].lastName);
                $("#phoneNumber").val(z[i].phoneNumber);
                $("#position").val(z[i].position);
                $("#postalCode").val(z[i].postalCode);
                $("#city").val(z[i].city);
            }
        }
        $("button").attr("id", id);
    })
}
//edit mode
function edit() {
    $(document).ready(function () {
        $("input").prop("disabled", false);
        $(".apply").css("display", "block");
    })
}
//appling changes
function apply(id) {
    $(document).ready(function () {
        for (let i = 0; i < z.length; i++) {
            if (id === z[i].uid) {
                z[i].uid = $("#uid").val();
                z[i].firstName = $("#firstName").val();
                z[i].lastName = $("#lastName").val();
                z[i].phoneNumber = $("#phoneNumber").val();
                z[i].position = $("#position").val();
                z[i].postalCode = $("#postalCode").val();
                z[i].city = $("#city").val();
            }
        }
        $(".container").css("display", "none");
    })
    createTable(z);
}
//canceling process
function cancel() {
    $(document).ready(function () {
        $(".container").css("display", "none");
    })
}
//delete function
function del(id) {
    for (let i = 0; i < z.length; i++) {
        if (id === z[i].uid) {
            z.splice(i, 1);
        }
    }
    createTable(z);
    $(document).ready(function () {
        $(".container").css("display", "none");
    })
}
//defining constructor
function human(uid, firstName, lastName, phoneNumber, position, postalCode, city) {
    this.uid = uid;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.position = position;
    this.postalCode = postalCode;
    this.city = city;
}
//adding new element
function add() {
    $(document).ready(function () {
        let a = new human($("#uid").val(), $("#firstName").val(), $("#lastName").val(), $("#phoneNumber").val(), $("#position").val(), $("#postalCode").val(), $("#city").val());
        z.push(a);
        createTable(z);
        $(".container").css("display", "none");
    })

}
//opening add panel
function add1() {
    $(document).ready(function () {
        $(".container").css("display", "block");
        $(".edit").css("display", "none");
        $(".delete").css("display", "none");
        $(".apply").css("display", "none");
        $("input").prop("disabled", false);
        $(".add").css("display" , "block");
        $("input").val("");
    })
}