function convertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','

            line += array[i][index];
        }

        str += line + '\r\n';
    }

    return str;
}

var headerCount = 1;
function exportCSVFile(headers, items, fileTitle) {
    if (headers && headerCount==1) {
        items.unshift(headers);
        headerCount++;
    }

    // Convert Object to JSON
    var jsonObject = JSON.stringify(items);

    var csv = this.convertToCSV(jsonObject);

    var exportedFilenmae = fileTitle + '.csv' || 'export.csv';

    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, exportedFilenmae);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", exportedFilenmae);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}

var headers = {
    teamNumber: 'Team Number'.replace(/,/g, ''), // remove commas to avoid errors
    matchNumber: "Match Number",
    scoutName: "Scout",
    broken: "Broken?",
    tip: "Did robot tip?",
    trench: "Travel through trench",
    pc_capacity: "Power Cell Capacity",
    cellFromFloor: "Can pickup PC from floor?",
    ppoints: "Penalty",
    cellsDropped: "Cells dropped",
    parktimeGI: "Park Time",
    climbtimeGI: "Climb Time",
    rotationGI: "Rotation Time",
    positionGI: "Position Time",
    crossedinitiation: "Crossed line",
    rotationCP: "Rotation CP?",
    positionCP: "Position CP?",
    abletoclimb: "Can it climb?",
    hangingMobility: "Hanging Mobility",
    balance: "Balance",
    assist: "Assist",
    lowAuto: "Low Auto",
    highAuto: "High Auto",
    missAuto: "Missed Auto",
    lowTele: "Low Tele",
    highTele: "High Tele",
    missTele: "Missed Tele",
    blockedTele: "Blocked Tele",
    groundPCP: "Ground Pickup",
    loadingPCP: "Loading Pickup"
};

// itemsNotFormatted = [
// 	{
// 		"teamNumber": '3',
// 		"matchNumber": '3',
// 		"broken": 'false',
// 		"tip": 'false',
// 		"depot": 'false',
// 		"floor": "false",
// 		"trench": 'true',
// 		"pc_capacity": '2',
// 		"opposide": '0.791',
// 		"ppoints": '0',
// 		"hdropped": '2',
// 		"crossedinitiation": "Yes"
// 	},
// ];

var itemsFormatted = [];

// format the data
// itemsNotFormatted.forEach((item) => {
//     itemsFormatted.push({
//         teamNumber: item.teamNumber.replace(/,/g, ''), // remove commas to avoid errors,
//         matchNumber: item.matchNumber,
//         broken: item.broken,
// 	    tip: item.tip,
// 	    depot: item.depot,
// 	    floor: item.floor,
// 	    trench: item.trench,
// 	    pc_capacity: item.pc_capacity,
// 	    opposide: item.opposide,
// 	    ppoints: item.ppoints,
// 	    hdropped: item.hdropped,
// 	    crossedinitiaion: item.crossedinitiation,

//     });
// });

var fileTitle = 'Scout-entry'; // or 'my-unique-title'

// var adder = {
// 		"teamNumber": "1000",
// 		"matchNumber": "3",
// 		"broken": "false",
// 		"tip": "false",
// 		"depot": "false",
// 		"floor": "false",
// 		"trench": "true",
// 		"pc_capacity": "2",
// 		"opposide": "0.791",
// 		"ppoints": "0",
// 		"hdropped": "2",
// 		"crossedinitiation": "Yes"
// };

function add(lmao) {
	// // adder = document.getElementById("myInput").value;
	// // alert(adder);
	// console.log(adder);

	item = JSON.parse(lmao);
	console.log(lmao);
	console.log(item);
    itemsFormatted.push({
	    teamNumber: String(item.teamNumber).replace(/,/g, ''), // remove commas to avoid errors
	    matchNumber: String(item.matchNumber),
	    scoutName: String(item.scoutName),
	    broken: String(item.broken),
	    tip: String(item.tip),
	    trench: String(item.trench),
	    pc_capacity: String(item.pc_capacity),
	    cellFromFloor: String(item.cellFromFloor),
	    ppoints: String(item.ppoints),
	    cellsDropped: String(item.cellsDropped),
	    parktimeGI: String(item.parktimeGI),
	    climbtimeGI: String(item.climbtimeGI),
	    rotationGI: String(item.rotationGI),
	    positionGI: String(item.positionGI),
	    crossedinitiation: String(item.crossedinitiation),
	    rotationCP: String(item.rotationCP),
	    positionCP: String(item.positionCP),
	    abletoclimb: String(item.abletoclimb),
	    hangingMobility: String(item.hangingMobility),
	    balance: String(item.balance),
	    assist: String(item.assist),
	    lowAuto: String(item.lowAuto),
	    highAuto: String(item.highAuto),
	    missAuto: String(item.missAuto),
	    lowTele: String(item.lowTele),
	    highTele: String(item.highTele),
	    missTele: String(item.missTele),
	    blockedTele: String(item.blockedTele),
	    groundPCP: String(item.groundPCP),
	    loadingPCP: String(item.loadingPCP)
    });	
    displayTable();
}

function download() {
	exportCSVFile(headers, itemsFormatted, fileTitle); // call the exportCSVFile() function to process the JSON and trigge
}

function getData() {
    var hehe = convertToCSV(JSON.stringify(itemsFormatted));
    var rawData = new Blob([hehe], { type: 'text/csv;charset=utf-8;' });
    return rawData;
}

function reset() {
    itemsFormatted = [];
    headerCount = 1;
    entries = 0;
    document.getElementById("entry").innerHTML = '';
    document.getElementById("showData").innerHTML = '';
}

function displayTable(){
    var col = [];
        for (var i = 0; i < itemsFormatted.length; i++) {
            for (var key in itemsFormatted[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }

        // CREATE DYNAMIC TABLE.
        var table = document.createElement("table");

        // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

        var tr = table.insertRow(-1);                   // TABLE ROW.

        for (var i = 0; i < 30; i++) {
            var th = document.createElement("th");      // TABLE HEADER.
            th.innerHTML = col[i];
            tr.appendChild(th);
            console.log(i);
        }

        // ADD JSON DATA TO THE TABLE AS ROWS.
        for (var i = 0; i < itemsFormatted.length; i++) {

            tr = table.insertRow(-1);

            for (var j = 0; j < col.length; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = itemsFormatted[i][col[j]];
            }
        }

        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        var divContainer = document.getElementById("showData");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
}
