
			// prompt user to upload text file 
			var input = document.getElementById("input").value;

			// Split the input text into lines
			var lines = input.split(/\s*\|\s*|\s*\n\s*/);

			// Clear the output table and data array
			var outputTable = document.getElementById("output");
			outputTable.innerHTML = "";
			data = [];

			// Create table header
			var headerRow = outputTable.insertRow();
			headerRow.insertCell().innerHTML = "<b>Field</b>";
			headerRow.insertCell().innerHTML = "<b>Value</b>";
			for (var j = 1; j <= 30; j++) {
				headerRow.insertCell().innerHTML = "<b>Value-" + j + "</b>";
			}

			// Loop through the lines
			for (var i = 0; i < lines.length; i++) {
				// Find the index of the ":" or "KVA" character
				var colonIndex = lines[i].indexOf(":");
				var kvaIndex = lines[i].toLowerCase().indexOf("kva");

				// If there is a ":" or "KVA" character, extract the values before and after it
				if (colonIndex >= 0 || kvaIndex >= 0) {
					var splitIndex = kvaIndex >= 0 ? kvaIndex + 3 : colonIndex;
					var beforeSplit = lines[i].substring(0, splitIndex).trim();
					var afterSplit = lines[i].substring(splitIndex + 0).trim();

					// Split the "value" by delimiter and space
					// var values = afterSplit.split(/[\/\s,^-]+/);
					var values = afterSplit.split(/[\/\s,^-x]+/); // added x
					var values = afterSplit.split(/[\/\s,^x]+|-/); // added -
					var values = afterSplit.split(/[\/\s,:^x-]+|-/); // added :
					var values = afterSplit.split(/[\/\s,#:x^\-]+|-/); // added #

					// Add the extracted values to the output table and data array
					var row = outputTable.insertRow();
					row.insertCell().innerHTML = beforeSplit;
					row.insertCell().innerHTML = values[0];
					for (var k = 1; k <= 30; k++) {
						var value = "";
						if (k < values.length) {
							value = values[k];
						}
						row.insertCell().innerHTML = value;
					}
					data.push([beforeSplit, values.join(",")]);
				}
			}
		}
