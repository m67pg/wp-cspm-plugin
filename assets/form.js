jQuery(function ($) {
    const form = $('#crowd_sourcing-form');
    if (!form.length) return;

    const isEdit = typeof editId !== 'undefined';
    const method = isEdit ? 'PUT' : 'POST';
    const url = isEdit ? `${CSPM.api_url}/${editId}` : CSPM.api_url;
    const headers = {'Authorization': `Bearer ${CSPM.api_key}`, 'Accept': 'application/json'};

    // 編集時：既存データの取得
    if (isEdit) {
        $.ajax({
            url: url + '/edit',
            method: 'GET',
            headers: headers,
            success: function (response) {
                const data = response.data.crowd_sourcing;
                $('#name').val(data.name);
                $('#sort_order').val(data.sort_order);
                const eq = data.display === 1 ? 0 : 1;
                $('input[name=display]:eq(' + eq + ')').prop('checked', true);
            },
            error: function (xhr) {
                console.error(xhr.responseText);
            }
        });
    }

    form.on('submit', function (e) {
        e.preventDefault();

        $('#form-message').text('');
        $('#error-name, #error-sort_order').text('');

        const display = $('input[name=display]:eq(0)').is(':checked') ? 1 : 0;

        const payload = {
            name: $('#name').val(),
            sort_order: $('#sort_order').val(),
            display: display
        };

        $.ajax({
            url: url,
            method: method,
            data: payload,
            headers: headers,
            success: function () {
                if (isEdit) {
                    // ? 編集時は一覧に戻る
                    location.href = 'admin.php?page=crowd_sourcing-list';
                } else {
                    // ? 新規登録時は成功メッセージ＋フォームリセット
                    $('#form-message').css('color', 'green').text('保存成功');
                    form[0].reset();
                }
            },
            error: function (xhr) {
                const errors = xhr.responseJSON?.errors || {};
                if (errors.name) $('#error-name').text(errors.name[0]);
                if (errors.sort_order) $('#error-sort_order').text(errors.sort_order[0]);
                $('#form-message').css('color', 'red').text('入力内容にエラーがあります');
            }
        });
    });
});
