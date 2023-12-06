var min_col;
var max_col;

var min_row;
var max_row;

var tableReal = false;

var error = "";

$("#inputForm").validate();

function validateForm() {
    if (isNaN(min_col) | isNaN(max_col) | isNaN(min_row) | isNaN(max_row)) {
        error = "input must be numbers.";
        alert(error.text());
        return false;
    } else if (min_col > max_col) {
        error = "minimum column must be less than or equal to maximum."
        return false;
    } else if (min_row > max_row) {
        error = "minimum row must be less than or equal to maximum."
        return false;
    } else if (min_col > 200 | max_col > 200 | min_row > 200 | max_row > 200) {
        error = "input cannot be above 200";
        return false;
    } else if (min_col < -200 | max_col < -200 | min_row < -200 | max_row < -200) {
        error = "input cannot be below -200";
        return false;
    }
    return true;
}

document.getElementById("submit").onclick = function() {
    min_col = Number(document.getElementById("min_col").value);
    max_col = Number(document.getElementById("max_col").value);
    
    min_row = Number(document.getElementById("min_row").value);
    max_row = Number(document.getElementById("max_row").value);
    
    

    if(!validateForm()) {
        document.getElementById("error_msg").innerHTML = error;
        error = "";
    } else {
        if (!tableReal) {
            
            var theTable = document.createElement("table");
            theTable.setAttribute("id", "theTable");
            // theTable.appendChild(document.createElement("tr"));
            
            var temp = document.createElement("tr");

            var colOutput = document.createElement("td");
            colOutput.setAttribute("id", "col_output");
            
            var rowOutput = document.createElement("tr");
            rowOutput.setAttribute("id", "row_output");

            colOutput.appendChild(rowOutput);
            temp.appendChild(colOutput);
            theTable.appendChild(temp);
            document.getElementById("tableHolder").appendChild(theTable);
            
            tableReal = true;
        } else {
            document.getElementById("error_msg").innerHTML = "";
            document.getElementById("col_output").innerHTML = "";
            //document.getElementById("row_output").innerHTML = "";
        }
        
        var tableStart = document.createElement("th");
        tableStart.append(document.createTextNode("X"));
        document.getElementById("col_output").append(tableStart);
        
        var x;
        
        for (x = Number(min_col); x <= Number(max_col); x++) {
            var myCol = document.createElement("th");
            myCol.setAttribute("id", x);
            myCol.setAttribute("class", "colHeader");
            myCol.append(document.createTextNode(x));
            document.getElementById("col_output").append(myCol);
        }

        var y;
        for (y = min_row; y <= max_row; y++) {
            var myRowHead = document.createElement("tr");
            myRowHead.setAttribute("id", y*1000);
            var myRow = document.createElement("th");
            myRow.append(document.createTextNode(y));
            myRowHead.appendChild(myRow);
            document.getElementById("col_output").append(myRowHead);
        }

        // Cells
        y = min_row;
        for (x = min_col; x <= max_col; x++) {
            for (y = min_row; y <= max_row; y++) {
                var myCell = document.createElement("td");
                if (y % 2 == 0) {
                    myCell.setAttribute("class", "dark");
                }
                myCell.append(document.createTextNode(x*y));
                document.getElementById(y*1000).appendChild(myCell);
            }
            
        }

    }
}