jQuery(function ($) {
    if (!CSPM.isListPage) return;

    const tbody = $('#post-table tbody');
    const pagination = $('#pagination');
    const headers = {
                'Authorization': `Bearer ${CSPM.api_key}`,
                'Accept': 'application/json'
          };

    $.ajax({ url: `${CSPM.csrf_url}`, method: 'GET', headers: headers });

    const loadList = (page = 1) => {
        $.ajax({
            url: `${CSPM.api_url}?page=${page}`,
            method: 'GET',
            xhrFields: { withCredentials: true },
            headers: headers,
            success: function (response) {
                // データ本体
                tbody.empty();
                response.list.crowd_sourcings.data.forEach(crowd_sourcing => {
                    tbody.append(`
                        <tr>
                            <td>${crowd_sourcing.name}</td>
                            <td>${crowd_sourcing.sort_order}</td>
                            <td>${crowd_sourcing.display === 1 ? '表示' : '非表示'}</td>
                            <td>
                                <a href="admin.php?page=crowd_sourcing-edit&id=${crowd_sourcing.id}" class="button">編集</a>
                            </td>
                        </tr>
                    `);
                });

                renderPagination(response.list.crowd_sourcings);
            },
            error: function (xhr) {
                console.error(xhr.responseText);
            }
        });
    };

    loadList();

    // ページネーションリンク生成
    const renderPagination = (pagination) => {
        const { current_page, last_page } = pagination;
        let html = '';

        if (current_page > 1) {
            html += `<a href="#" class="page-link" data-page="${current_page - 1}">&laquo; 前へ</a>`;
        }

        for (let i = 1; i <= last_page; i++) {
            html += `<a href="#" class="page-link ${i === current_page ? 'current' : ''}" data-page="${i}">${i}</a>`;
        }

        if (current_page < last_page) {
            html += `<a href="#" class="page-link" data-page="${current_page + 1}">次へ &raquo;</a>`;
        }

        $('#pagination').html(html);
    };

    // ページリンククリック
    pagination.on('click', '.page-link', function (e) {
        e.preventDefault();
        const page = $(this).data('page');
        loadList(page);
    });
});
