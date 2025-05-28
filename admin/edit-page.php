<?php
$id = isset($_GET['id']) ? intval($_GET['id']) : 0;
?>
<div class="wrap">
    <h1>クラウドソーシング編集 (ID: <?php echo esc_html($id); ?>)</h1>
    <script>const editId = <?php echo $id; ?>;</script>
    <?php include plugin_dir_path(__DIR__) . 'templates/form-template.php'; ?>
</div>
