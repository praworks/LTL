document.addEventListener('DOMContentLoaded', function() {
    fetch('items.csv')
        .then(response => response.text())
        .then(csvData => {
            const lines = csvData.split(/\r?\n/);
            const tableBody = document.querySelector('#itemTable tbody');

            lines.forEach(line => {
                const data = line.split(',');
                const itemCode = data[0];
                const tag = data[1];
                const description = data[2];
                const prices = data.slice(3);
                const iconPath = `Icons/${itemCode}.jpg`;

                const row = document.createElement('tr');
                row.innerHTML = `
                    <td class="icon-cell"><img class="icon-img" src="${iconPath}" alt="Icon"></td>
                    <td>${itemCode}</td>
                    <td>${tag}</td>
                    <td>${description}</td>
                    <td>${prices[0]}</td>
                `;

                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching the CSV file:', error);
        });
});
