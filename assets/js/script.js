$(function () {
    let jsonFilePath = '/data-table/assets/data/data.json';
    let tableBody = $('#table-body');
    let entriesInfo = $('#entries-info');
    let pagination = $('#pagination');
    let currentPage = 1;
    let entriesPerPage = parseInt($('#select').val());
    $.ajax({
        url: jsonFilePath,
        dataType: 'json',
        success: function (data) {
            console.log('Data received from JSON file: ', data.data.length);
            window.data = data;
            displayTable();
        }
    });
    const displayTable = () => {
        tableBody.empty(); 
        let start = (currentPage - 1) * entriesPerPage;
        let end = start + entriesPerPage > data.data.length ? data.data.length : start + entriesPerPage;
        if (start > data.data.length) {
            currentPage = Math.ceil(data.data.length / entriesPerPage);
            start = (currentPage - 1) * entriesPerPage;
        }
        let dataRows = data.data.slice(start, end);
        $.each(dataRows, function (index, row) {
            let tableRow = $('<tr></tr>');
            $.each(row, function (index, column) {
                let tableCell = $('<td></td>').text(column);
                tableRow.append(tableCell);
            });
            tableBody.append(tableRow);
        });
        showEntriesInfo(currentPage, entriesPerPage, data.data.length);
        updatePagination();
    };
    const updatePagination = () => {
        pagination.empty();
        let totalPages = Math.ceil(data.data.length / entriesPerPage);
        if (totalPages > 0 && currentPage <= totalPages) {
            let prevButton = $("<li class='pagination-btn prev'><a href='#'>Previous</a></li>");
            $(prevButton).click(() => {
                if (currentPage > 1) {
                    currentPage--;
                    displayTable();
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
                        displayTable();
                    });
                }
                pagination.append(button);
            }
            let nextButton = $("<li class='pagination-btn next'><a href='#'>Next</a></li>");
            $(nextButton).click(() => {
                if (currentPage < totalPages) {
                    currentPage++;
                    displayTable();
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
        entriesPerPage = parseInt($(this).val());
        displayTable();
        updatePagination();
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
        displayTable();
        $('th.sorting').removeClass('sorting-asc sorting-desc');
        $('th:eq(' + sortColumn + ')').addClass('sorting-' + sortState);
    });
});


