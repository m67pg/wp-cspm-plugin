<?php
/**
 * Plugin Name: CSプロジェクト管理 Plugin
 */

function add_cspm_role() {
    $subscriber_role = get_role( 'subscriber' );

    if ( $subscriber_role ) {
        $subscriber_role->add_cap( 'access_cspm_menu' );
    }

    $admin_role = get_role( 'administrator' );
    if ( $admin_role ) {
        $admin_role->add_cap( 'access_cspm_menu' );
    }
}
add_action( 'init', 'add_cspm_role' );

function cspm_menu() {
    add_menu_page('クラウドソーシング一覧', 'クラウドソーシング一覧', 'access_cspm_menu', 'crowd_sourcing-list', 'crowd_sourcing_list_page');
    add_submenu_page('crowd_sourcing-list', '新規追加', '新規追加', 'access_cspm_menu', 'crowd_sourcing-add', 'crowd_sourcing_add_page');
    add_submenu_page(null, '編集', '編集', 'access_cspm_menu', 'crowd_sourcing-edit', 'crowd_sourcing_edit_page');
}
add_action('admin_menu', 'cspm_menu');

function crowd_sourcing_list_page() {
    include plugin_dir_path(__FILE__) . 'admin/list-page.php';
}

function crowd_sourcing_add_page() {
    include plugin_dir_path(__FILE__) . 'admin/add-page.php';
}

function crowd_sourcing_edit_page() {
    include plugin_dir_path(__FILE__) . 'admin/edit-page.php';
}

// JS/CSS の読み込み
function cspm_enqueue_scripts($hook) {
    $screen_flags = [];

    if ($hook === 'toplevel_page_crowd_sourcing-list') {
        $screen_flags['isListPage'] = true;
    }
    if ($hook === 'cspm-plugin_page_crowd_sourcing-add') {
        $screen_flags['isAddPage'] = true;
    }
    if ($hook === 'cspm-plugin_page_crowd_sourcing-edit') {
        $screen_flags['isEditPage'] = true;
    }

    wp_enqueue_script('cspm-list', plugin_dir_url(__FILE__) . 'assets/list.js', ['jquery'], null, true);
    wp_enqueue_script('cspm-form', plugin_dir_url(__FILE__) . 'assets/form.js', ['jquery'], null, true);

    wp_enqueue_style('cspm-style', plugin_dir_url(__FILE__) . 'assets/admin.css');

    wp_localize_script('cspm-list', 'CSPM', array_merge([
        'api_url' => CSPM_API_URL, 'csrf_url' => CSPM_CSRF_URL, 'api_key' => CSPM_API_KEY
    ], $screen_flags));

    wp_localize_script('cspm-form', 'CSPM', array_merge([
        'api_url' => CSPM_API_URL, 'csrf_url' => CSPM_CSRF_URL, 'api_key' => CSPM_API_KEY
    ], $screen_flags));
}
add_action('admin_enqueue_scripts', 'cspm_enqueue_scripts');
