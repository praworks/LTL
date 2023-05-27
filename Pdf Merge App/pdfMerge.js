// Define an empty array to store the names of the PDF files
var pdfFiles = [];

// Get the input field and add an event listener to store the input
var pdfListInput = document.getElementById("pdfList");
pdfListInput.addEventListener("input", function() {
  pdfFiles = pdfListInput.value.split("\n");
});

// Get the file input field and add an event listener to handle file uploads
var pdfFileInput = document.getElementById("pdfFileInput");
pdfFileInput.addEventListener("change", function() {
  // Loop through the uploaded files and add each PDF file to the array
  for (var i = 0; i < pdfFileInput.files.length; i++) {
    var file = pdfFileInput.files[i];
    if (file.type === "application/pdf") {
      pdfFiles.push(file.name);
    }
  }
});

// Define a function to merge the PDF files
function mergePdfs() {
  // Create a new instance of jsPDF
  var doc = new jsPDF();

  // Loop through the array of PDF files and add each one to the new document
  for (var i = 0; i < pdfFiles.length; i++) {
    doc.addPage();
    doc.text(20, 20, pdfFiles[i]);
  }

  // Save the merged PDF
  mergedPdf = doc.output('blob');
}

// Define a function to download the merged PDF
function downloadMergedPdf() {
  // Create a new file object with the merged PDF
  var mergedPdfFile = new File([mergedPdf], "mergedPdf.pdf");

  // Create a new URL object and download the file
  var downloadUrl = URL.createObjectURL(mergedPdfFile);
  var downloadLink = document.createElement("a");
  downloadLink.href = downloadUrl;
  downloadLink.download = "mergedPdf.pdf";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

// Update the PDF list view whenever the input changes
pdfListInput.addEventListener("input", function() {
  // Get the PDF list view element
  var pdfListView = document.getElementById("pdfListView");

  // Clear the current contents of the PDF list view
  pdfListView.innerHTML = "";

  // Loop through the array of PDF files and add each one to the PDF list view
  for (var i = 0; i < pdfFiles.length; i++) {
    var listItem = document.createElement("li");
    listItem.textContent = pdfFiles[i];
    pdfListView.appendChild(listItem);
  }
});
