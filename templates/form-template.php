<div id="form-message" style="color:red;"></div>
<form id="crowd_sourcing-form">
    <p>
        <label for="name" value="名前" />

        <input type="text" name="name" id="name" style="width:300px;">
        <br><span id="error-name" style="color:red;"></span>
    </p>
    <p>
        <label for="sort_order" value="並び順" />

        <input type="text" name="sort_order" id="sort_order" style="width:300px;">
        <br><span id="error-sort_order" style="color:red;"></span>
    </p>
    <p>
        <label for="display" value="表示 / 非表示" />

        <input type="radio" name="display" value="1">表示
        <input type="radio" name="display" value="0">非表示
    </p>
    <p>
        <button type="submit" class="button button-primary">保存</button>
    </p>
</form>
