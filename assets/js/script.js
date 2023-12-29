$(function () {
    let jsonFilePath = '/data-table/assets/data/data.json';
    let tableBody = $('#table-body');
    let entriesInfo = $('#entries-info');
    let pagination = $('#pagination');
    let currentPage = 1;
    let entriesPerPage = parseInt($('#select').val());
    let searchInput = $("#search")
    $.ajax({
        url: jsonFilePath,
        dataType: 'json',
        success: function (data) {
            console.log('Data received from JSON file: ', data.data.length);
            window.data = data;
            displayTable();
        }
    });
    const filterData = (searchTerm) => {
        return data.data.filter(row => {
            return Object.values(row).some(value => {
                return String(value).toLowerCase().includes(searchTerm.toLowerCase());
            });
        });
    };

    searchInput.on('input', () => {
        const searchTerm = searchInput.val();
        const filteredData = filterData(searchTerm);
        console.log(filteredData);
        currentPage = 1;
        displayTable(filteredData);
        updatePagination(filteredData);
    });
    const displayTable = (rowData = data.data) => {
        tableBody.empty(); 
        let start = (currentPage - 1) * entriesPerPage;
        let end = start + entriesPerPage > rowData.length ? rowData.length : start + entriesPerPage;
        if (start > rowData.length) {
            currentPage = Math.ceil(rowData.length / entriesPerPage);
            start = (currentPage - 1) * entriesPerPage;
        }
        let dataRows = rowData.slice(start, end);
        for (let i = 0; i < dataRows.length; i++) {
            let row = dataRows[i];
            let tableRow = document.createElement('tr');
    
            for (let j = 0; j < row.length; j++) {
                let column = row[j];
                let tableCell = document.createElement('td');
                tableCell.textContent = column;
                tableRow.appendChild(tableCell);
            }
    
            tableBody[0].appendChild(tableRow);
        }
        showEntriesInfo(currentPage, entriesPerPage, rowData.length);
        updatePagination(rowData);
    };
    const updatePagination = (rowData = data.data) => {
        pagination.empty();
        let totalPages = Math.ceil(rowData.length / entriesPerPage);
        if (totalPages > 0 && currentPage <= totalPages) {
            let prevButton = $("<li class='pagination-btn prev'><a href='#'>Previous</a></li>");
            $(prevButton).click(() => {
                if (currentPage > 1) {
                    currentPage--;
                    displayTable(rowData);
                }
            });
            if (currentPage === 1) {
                $(prevButton).addClass('disabled');
            }
            pagination.append(prevButton);
            for (let i = 0; i < totalPages; i++) {
                let button = $("<li class='pagination-btn'><a href='#'>" + (i + 1) + "</a></li>");
                if (i === currentPage - 1) {
                    $(button).addClass('active');
                } else {
                    $(button).click(() => {
                        currentPage = i + 1;
                        displayTable(rowData);
                    });
                }
                pagination.append(button);
            }
            let nextButton = $("<li class='pagination-btn next'><a href='#'>Next</a></li>");
            $(nextButton).click(() => {
                if (currentPage < totalPages) {
                    currentPage++;
                    displayTable(rowData);
                }
            });
            if (currentPage === totalPages) {
                $(nextButton).addClass('disabled');
            }
            pagination.append(nextButton);
        }
    };
    const showEntriesInfo = (currentPage, entriesPerPage, totalEntries) => {
        let startIndex = ((currentPage - 1) * entriesPerPage + 1);
        let endIndex = Math.min((currentPage * entriesPerPage), totalEntries);
        entriesInfo.html(`Showing ${startIndex} to ${endIndex} of ${totalEntries} entries`);
    }
    $('#select').on('change', function () {
        let newEntriesPerPage = parseInt($(this).val());
        currentPage = Math.ceil((entriesPerPage*currentPage)/newEntriesPerPage);
        entriesPerPage = newEntriesPerPage;
        const searchTerm = searchInput.val();
        const filteredData = filterData(searchTerm);
        displayTable(filteredData);
        updatePagination(filteredData);
    });
    let sortColumn = 0;
    let sortState = 'asc';
    $('th.sorting').on('click', function () {
        let column = $(this).data('column');
        if (sortColumn === column) {
            sortState = sortState === 'asc' ? 'desc' : 'asc';
        } else {
            sortState = 'asc';
        }
        sortColumn = column;
        data.data.sort((a, b) => {
            let A, B;
            if (column === 5) {
                A = parseFloat(a[column].replace(/\$|,/g, ''));
                B = parseFloat(b[column].replace(/\$|,/g, ''));
            } else {
                A = a[sortColumn];
                B = b[sortColumn];
            }
            let compareResult = 0;

            if (A < B) {
                compareResult = -1;
            } else if (A > B) {
                compareResult = 1;
            }
            return (sortState === 'asc') ? compareResult : -compareResult;
        });
        currentPage = 1;
        const searchTerm = searchInput.val();
        const filteredData = filterData(searchTerm);
        displayTable(filteredData);
        $('th.sorting').removeClass('sorting-asc sorting-desc');
        $('th:eq(' + sortColumn + ')').addClass('sorting-' + sortState);
    });
});


