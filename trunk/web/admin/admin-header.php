<?php
ini_set("memory_limit", "1024M");
ini_set("max_execution_time", "600");
require_once("../include/db_info.inc.php");
require_once ("../include/my_func.inc.php");
if(isset($OJ_LOG_ENABLED) && $OJ_LOG_ENABLED){
	$params = json_encode($_REQUEST, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
	$logger->info($params);
}

if (!isset($suppress_admin_header_html) || !$suppress_admin_header_html) {
?>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Admin</title>
<script src="../include/jquery-latest.js"></script>
<style>
    * { box-sizing: border-box; }

    body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        background: #f8f9fa;
        color: #333;
        padding: 24px;
        margin: 0;
        font-size: 14px;
        line-height: 1.6;
        overflow-x: hidden; /* 防止水平溢出 */
    }

    .padding, #main, .container {
        background: #fff;
        padding: 24px;
        border-radius: 8px;
        border: 1px solid #e5e7eb;
        max-width: 100%;
        margin: 0 auto;
        overflow-x: auto; /* 内容溢出时显示滚动条 */
    }

    /* 页面标题美化 */
    center h3, h3.page-title {
        color: #1f2937;
        padding: 0 0 16px 0;
        margin: 0 0 24px 0;
        font-size: 20px;
        font-weight: 600;
        border-bottom: 1px solid #e5e7eb;
        text-align: center;
    }

    h1, h2, h3, h4, h5, h6 {
        color: #1f2937;
        font-weight: 600;
        margin: 0 0 16px 0;
    }

    h3 { font-size: 18px; color: #374151; }
    h4 { font-size: 16px; }

    hr {
        border: none;
        border-top: 1px solid #e5e7eb;
        margin: 20px 0;
    }

    /* 表格样式 */
    table {
        width: 100%;
        border-collapse: collapse;
        margin: 16px 0;
        background: #fff;
        border-radius: 8px;
        overflow: hidden;
        border: 1px solid #e5e7eb;
    }

    table th, table td {
        padding: 12px 14px;
        text-align: left;
        border-bottom: 1px solid #e5e7eb;
    }

    table th {
        background: #f9fafb;
        font-weight: 600;
        color: #374151;
        font-size: 13px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    table tr:hover {
        background: #f9fafb;
    }

    table tr:last-child td {
        border-bottom: none;
    }

    /* 表单元素 */
    input[type="text"],
    input[type="password"],
    input[type="number"],
    input[type="email"],
    input[type="date"],
    select,
    textarea {
        padding: 10px 14px;
        border: 1px solid #d1d5db;
        border-radius: 6px;
        font-size: 14px;
        background: #fff;
        max-width: 100%;
        transition: border-color 0.2s, box-shadow 0.2s;
    }

    input:focus, select:focus, textarea:focus {
        outline: none;
        border-color: #1677ff;
        box-shadow: 0 0 0 3px rgba(22, 119, 255, 0.1);
    }

    /* 按钮样式 */
    input[type="submit"],
    input[type="button"],
    button,
    .form-control[type="submit"] {
        padding: 10px 18px;
        border: none;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        margin: 2px;
        transition: all 0.2s;
    }

    input[type="submit"],
    button[type="submit"] {
        background: #1677ff;
        color: #fff;
    }

    input[type="submit"]:hover,
    button[type="submit"]:hover {
        background: #0958d9;
    }

    input[type="button"], input[type="reset"] {
        background: #6b7280;
        color: #fff;
    }

    input[type="button"]:hover, input[type="reset"]:hover {
        background: #4b5563;
    }

    /* 链接样式 */
    a {
        color: #1677ff;
        text-decoration: none;
        transition: color 0.2s;
    }

    a:hover {
        color: #0958d9;
        text-decoration: none;
    }

    /* 搜索表单 */
    .form-search, .form-inline {
        display: flex;
        gap: 10px;
        justify-content: center;
        align-items: center;
        margin: 16px 0;
        flex-wrap: wrap;
    }

    .form-search input[type="text"],
    .search-query {
        min-width: 280px;
        padding: 10px 14px;
    }

    /* 分页样式 */
    .pagination {
        display: flex;
        list-style: none;
        padding: 0;
        margin: 20px 0;
        gap: 4px;
        justify-content: center;
        flex-wrap: wrap;
    }

    .pagination li, .page-item {
        display: inline-block;
    }

    .pagination a, .page-item a {
        display: inline-block;
        padding: 8px 14px;
        border: 1px solid #d1d5db;
        border-radius: 6px;
        color: #374151;
        font-size: 14px;
        transition: all 0.2s;
        text-decoration: none;
    }

    .pagination a:hover, .page-item a:hover {
        background: #f3f4f6;
        border-color: #1677ff;
        color: #1677ff;
    }

    .pagination .active a, .page-item.active a {
        background: #1677ff;
        border-color: #1677ff;
        color: #fff;
    }

    /* 标签样式 */
    .label {
        display: inline-block;
        padding: 4px 10px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 500;
        text-decoration: none;
    }

    .label-success { background: #dcfce7; color: #166534; }
    .label-danger { background: #fee2e2; color: #991b1b; }
    .label-warning { background: #fef3c7; color: #92400e; }
    .label-info { background: #dbeafe; color: #1e40af; }
    .label-default { background: #f3f4f6; color: #374151; }

    /* 状态颜色 */
    .green, span.green { color: #16a34a; }
    .red, span.red { color: #dc2626; }
    .blue, span.blue { color: #2563eb; }

    /* 复选框和单选框 */
    input[type="checkbox"], input[type="radio"] {
        width: auto;
        margin-right: 6px;
        cursor: pointer;
    }

    textarea {
        min-height: 100px;
        resize: vertical;
        width: 100%;
    }

    /* 提示框 */
    .alert {
        padding: 14px 18px;
        border-radius: 8px;
        margin: 16px 0;
    }

    .alert-danger {
        background: #fef2f2;
        color: #991b1b;
        border: 1px solid #fecaca;
    }

    .alert-success {
        background: #f0fdf4;
        color: #166534;
        border: 1px solid #bbf7d0;
    }

    center {
        text-align: center;
    }

    .ke-container {
        max-width: 100% !important;
    }

    /* KindEditor 和表单元素溢出控制 */
    .ke-container, .ke-edit, .ke-edit iframe {
        max-width: 100% !important;
        width: 100% !important;
    }

    input[type="text"], textarea, select {
        max-width: 100%;
    }

    /* 表单内容不溢出 */
    form {
        max-width: 100%;
        overflow-x: hidden;
    }

    form p {
        max-width: 100%;
        word-wrap: break-word;
    }

    /* 导航居中 */
    nav.center {
        display: flex;
        justify-content: center;
    }

    /* h4 小标题美化 */
    p h4, .padding h4 {
        color: #374151;
        font-weight: 600;
        padding-bottom: 8px;
        border-bottom: 1px solid #e5e7eb;
        margin-bottom: 12px;
    }
</style>
<script>
$(document).ready(function(){
    $("form").append("<div id='csrf' />");
    $("#csrf").load("../csrf.php");
});
</script>
</head>
<body>
<?php
}
?>

<?php if (!(isset($_SESSION[$OJ_NAME.'_'.'administrator'])||isset($_SESSION[$OJ_NAME.'_'.'contest_creator'])||isset($_SESSION[$OJ_NAME.'_'.'problem_editor'])||isset($_SESSION[$OJ_NAME.'_'.'password_setter']))){
	echo "<div class='alert alert-danger' style='text-align:center;margin:50px auto;max-width:400px;'>请先登录! <a href='../loginpage.php'>去登录</a></div>";
	exit(1);
}
if(file_exists("../template/$OJ_TEMPLATE/css.php")) require_once("../template/$OJ_TEMPLATE/css.php");
if(file_exists("../lang/$OJ_LANG.php")) require_once("../lang/$OJ_LANG.php");
?>
<?php if (!isset($suppress_admin_header_html) || !$suppress_admin_header_html) { ?>
<iframe src="../session.php" height=0px width=0px style="display:none;"></iframe>
<?php } ?>
