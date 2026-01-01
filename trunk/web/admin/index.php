<?php
require_once("../include/db_info.inc.php");
$suppress_admin_header_html = true;
require_once("admin-header.php");

if(isset($OJ_LANG)){
    require_once("../lang/$OJ_LANG.php");
}
$path_fix="../";
?>
<!DOCTYPE html>
<html lang="cn">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?php echo $OJ_NAME." - ".$MSG_ADMIN?></title>
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            background: #f0f2f5;
            color: #333;
            font-size: 14px;
        }

        /* 侧边栏科技感主题 */
        .sidebar {
            position: fixed;
            left: 0;
            top: 0;
            width: 240px;
            height: 100vh;
            background: #0f172a; /* 深色背景 */
            background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
            border-right: 1px solid #1e293b;
            overflow-y: auto;
            transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 1000;
            box-shadow: 4px 0 24px rgba(0, 0, 0, 0.2);
        }

        .sidebar::-webkit-scrollbar { width: 0px; } /* 隐藏滚动条但保持功能 */
        
        .sidebar-header {
            padding: 24px 20px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            white-space: nowrap;
            overflow: hidden;
            background: rgba(15, 23, 42, 0.5);
            backdrop-filter: blur(10px);
        }

        .sidebar-header h2 {
            font-size: 20px;
            font-weight: 700;
            color: #fff;
            margin: 0 0 8px 0;
            background: linear-gradient(135deg, #60a5fa, #3b82f6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            letter-spacing: 0.5px;
        }

        .sidebar-header small {
            color: #94a3b8;
            font-size: 12px;
            display: block;
            margin-top: 4px;
            font-weight: 500;
        }

        .nav-section {
            padding: 16px 12px 6px;
            white-space: nowrap;
            overflow: hidden;
        }

        .nav-title {
            padding: 0 12px 12px;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 1.2px;
            color: #64748b;
            font-weight: 700;
            transition: opacity 0.3s;
        }

        .nav-item {
            display: flex;
            align-items: center;
            padding: 12px 16px;
            margin-bottom: 4px;
            color: #94a3b8;
            text-decoration: none;
            font-size: 14px;
            font-weight: 500;
            transition: all 0.25s ease;
            white-space: nowrap;
            border-radius: 8px;
            position: relative;
            overflow: hidden;
        }

        .nav-item:hover {
            background: rgba(255, 255, 255, 0.08);
            color: #e2e8f0;
            transform: translateX(4px);
        }

        .nav-item.active {
            background: linear-gradient(90deg, rgba(59, 130, 246, 0.15), rgba(59, 130, 246, 0.05));
            color: #60a5fa;
            border: 1px solid rgba(59, 130, 246, 0.1);
            box-shadow: 0 0 15px rgba(59, 130, 246, 0.1);
        }
        
        /* 激活状态下的左侧光条 */
        .nav-item.active::before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            height: 20px;
            width: 3px;
            background: #60a5fa;
            border-radius: 0 4px 4px 0;
            box-shadow: 0 0 8px #60a5fa;
        }

        .nav-item i,
        .nav-item svg {
            width: 18px;
            height: 18px;
            margin-right: 12px; /* 图标与文字距离 */
            stroke-width: 2;
            min-width: 18px;
            flex-shrink: 0;
            transition: color 0.3s;
        }

        .nav-item span {
            margin-left: 8px; /* 额外增加文字左边距 */
        }
        
        .nav-item:hover i {
            color: #fff;
        }

        .nav-item span {
            opacity: 1;
            transition: opacity 0.3s;
        }

        .main {
            margin-left: 240px;
            min-height: 100vh;
            transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            background: #f1f5f9;
        }

        .header {
            background: #fff;
            padding: 16px 24px;
            border-bottom: 1px solid #e2e8f0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }

        .header-left {
            display: flex;
            align-items: center;
            gap: 20px;
        }

        .toggle-btn {
            background: transparent;
            border: 1px solid #e2e8f0;
            cursor: pointer;
            padding: 8px;
            border-radius: 8px;
            color: #64748b;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
        }

        .toggle-btn:hover {
            background: #f8fafc;
            color: #334155;
            border-color: #cbd5e1;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        .header h1 {
            font-size: 16px;
            font-weight: 600;
            color: #1e293b;
            display: flex;
            align-items: center;
            margin: 0;
        }

        .header h1 i {
            width: 18px;
            height: 18px;
            margin-right: 10px;
            color: #3b82f6;
        }

        .user-info {
            display: flex;
            align-items: center;
            gap: 12px;
            color: #475569;
            font-size: 14px;
            font-weight: 500;
            background: #f8fafc;
            padding: 6px 12px;
            border-radius: 20px;
            border: 1px solid #e2e8f0;
        }

        .avatar {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: linear-gradient(135deg, #3b82f6, #2563eb);
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 13px;
            font-weight: 600;
            box-shadow: 0 2px 4px rgba(37, 99, 235, 0.2);
        }

        .content {
            padding: 24px;
        }

        .frame-container {
            background: #fff;
            border-radius: 12px;
            border: 1px solid #e2e8f0;
            min-height: calc(100vh - 120px);
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
            overflow: hidden;
        }

        .frame-container iframe {
            width: 100%;
            height: calc(100vh - 125px);
            border: none;
        }

        /* Collapsed State */
        body.collapsed .sidebar {
            width: 72px;
        }

        body.collapsed .main {
            margin-left: 72px;
        }

        body.collapsed .nav-title,
        body.collapsed .sidebar-header small {
            display: none;
        }

        body.collapsed .sidebar-header h2 {
            font-size: 12px;
            text-align: center;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            opacity: 0.8;
        }
        
        body.collapsed .sidebar-header {
             padding: 20px 8px;
             text-align: center;
             display: flex;
             flex-direction: column;
             align-items: center;
             justify-content: center;
        }

        body.collapsed .nav-section {
            padding: 16px 8px;
        }

        body.collapsed .nav-item {
            justify-content: center;
            padding: 12px 0;
            margin: 0 4px 4px;
        }

        body.collapsed .nav-item:hover {
            transform: none;
        }

        body.collapsed .nav-item i,
        body.collapsed .nav-item svg {
            margin-right: 0;
        }
        
        body.collapsed .nav-item.active::before {
            display: none; /* 折叠时隐藏左侧光条，以免看起来奇怪 */
        }
        
        body.collapsed .nav-item.active {
             background: rgba(59, 130, 246, 0.2);
             border: none;
        }

        body.collapsed .nav-item span {
            display: none;
            opacity: 0;
            margin-left: 0;
        }
        
        /* Tooltip style for collapsed menu */
        body.collapsed .nav-item:hover::after {
            content: attr(title);
            position: absolute;
            left: 100%;
            top: 50%;
            transform: translateY(-50%);
            margin-left: 10px;
            background: #1e293b;
            color: #fff;
            padding: 6px 12px;
            border-radius: 6px;
            font-size: 12px;
            white-space: nowrap;
            z-index: 1001;
            box-shadow: 0 4px 6px rgba(0,0,0,0.3);
            pointer-events: none;
            animation: fadeIn 0.2s ease;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-50%) translateX(-5px); }
            to { opacity: 1; transform: translateY(-50%) translateX(0); }
        }

    </style>
</head>
<body>
    <aside class="sidebar">
        <div class="sidebar-header">
            <h2><?php echo $OJ_NAME?></h2>
            <small><?php echo $MSG_ADMIN?></small>
        </div>

        <div class="nav-section">
            <a href="../index.php" class="nav-item" target="_top" title="<?php echo $MSG_SEEOJ?>">
                <i data-lucide="arrow-left"></i> <span><?php echo $MSG_SEEOJ?></span>
            </a>
        </div>

        <?php if (isset($_SESSION[$OJ_NAME.'_'.'administrator'])){ ?>
        <div class="nav-section">
            <div class="nav-title"><?php echo $MSG_NEWS?></div>
            <a href="news_list.php" class="nav-item" target="main-frame" title="<?php echo $MSG_LIST?>"><i data-lucide="list"></i> <span><?php echo $MSG_LIST?></span></a>
            <a href="news_add_page.php" class="nav-item" target="main-frame" title="<?php echo $MSG_ADD?>"><i data-lucide="plus"></i> <span><?php echo $MSG_ADD?></span></a>
        </div>
        <?php } ?>

        <?php if (isset($_SESSION[$OJ_NAME.'_'.'administrator'])||isset($_SESSION[$OJ_NAME.'_'.'password_setter'])||isset($_SESSION[$OJ_NAME.'_'.'user_adder'])){ ?>
        <div class="nav-section">
            <div class="nav-title"><?php echo $MSG_USER?></div>
            <?php if (isset($_SESSION[$OJ_NAME.'_'.'administrator'])||isset($_SESSION[$OJ_NAME.'_'.'password_setter'])){ ?>
            <a href="user_list.php" class="nav-item" target="main-frame" title="<?php echo $MSG_LIST?>"><i data-lucide="users"></i> <span><?php echo $MSG_LIST?></span></a>
            <?php } ?>
            <?php if (isset($_SESSION[$OJ_NAME.'_'.'administrator'])||isset($_SESSION[$OJ_NAME.'_'.'user_adder'])){ ?>
            <a href="user_add.php" class="nav-item" target="main-frame" title="<?php echo $MSG_ADD?>"><i data-lucide="user-plus"></i> <span><?php echo $MSG_ADD?></span></a>
            <a href="user_import.php" class="nav-item" target="main-frame" title="<?php echo $MSG_IMPORT?>"><i data-lucide="upload"></i> <span><?php echo $MSG_IMPORT?></span></a>
            <?php } ?>
            <?php if (isset($_SESSION[$OJ_NAME.'_'.'administrator'])||isset($_SESSION[$OJ_NAME.'_'.'password_setter'])){ ?>
            <a href="changepass.php" class="nav-item" target="main-frame" title="<?php echo $MSG_SETPASSWORD?>"><i data-lucide="key"></i> <span><?php echo $MSG_SETPASSWORD?></span></a>
            <?php } ?>
            <?php if (isset($_SESSION[$OJ_NAME.'_'.'administrator'])){ ?>
            <a href="privilege_list.php" class="nav-item" target="main-frame" title="<?php echo $MSG_PRIVILEGE?>"><i data-lucide="shield"></i> <span><?php echo $MSG_PRIVILEGE?></span></a>
            <?php } ?>
        </div>
        <?php } ?>

        <?php if (isset($_SESSION[$OJ_NAME.'_'.'administrator'])||isset($_SESSION[$OJ_NAME.'_'.'problem_editor'])||isset($_SESSION[$OJ_NAME.'_'.'contest_creator'])){ ?>
        <div class="nav-section">
            <div class="nav-title"><?php echo $MSG_PROBLEM?></div>
            <a href="problem_list.php" class="nav-item" target="main-frame" title="<?php echo $MSG_LIST?>"><i data-lucide="file-text"></i> <span><?php echo $MSG_LIST?></span></a>
            <?php if (isset($_SESSION[$OJ_NAME.'_'.'administrator'])||isset($_SESSION[$OJ_NAME.'_'.'problem_editor'])){ ?>
            <a href="problem_add_page.php" class="nav-item" target="main-frame" title="<?php echo $MSG_ADD?>"><i data-lucide="file-plus"></i> <span><?php echo $MSG_ADD?></span></a>
            <?php } ?>
            <?php if (isset($_SESSION[$OJ_NAME.'_'.'administrator'])||isset($_SESSION[$OJ_NAME.'_'.'problem_importer'])){ ?>
            <a href="problem_import.php" class="nav-item" target="main-frame" title="<?php echo $MSG_IMPORT?>"><i data-lucide="upload"></i> <span><?php echo $MSG_IMPORT?></span></a>
            <a href="problem_export.php" class="nav-item" target="main-frame" title="<?php echo $MSG_EXPORT?>"><i data-lucide="download"></i> <span><?php echo $MSG_EXPORT?></span></a>
            <?php } ?>
        </div>
        <?php } ?>

        <?php if (isset($_SESSION[$OJ_NAME.'_'.'administrator'])||isset($_SESSION[$OJ_NAME.'_'.'contest_creator'])){ ?>
        <div class="nav-section">
            <div class="nav-title"><?php echo $MSG_CONTEST?></div>
            <a href="contest_list.php" class="nav-item" target="main-frame" title="<?php echo $MSG_LIST?>"><i data-lucide="trophy"></i> <span><?php echo $MSG_LIST?></span></a>
            <a href="contest_add.php" class="nav-item" target="main-frame" title="<?php echo $MSG_ADD?>"><i data-lucide="plus-circle"></i> <span><?php echo $MSG_ADD?></span></a>
            <a href="team_generate.php" class="nav-item" target="main-frame" title="<?php echo $MSG_TEAMGENERATOR?>"><i data-lucide="users"></i> <span><?php echo $MSG_TEAMGENERATOR?></span></a>
        </div>
        <?php } ?>

        <?php if (isset($_SESSION[$OJ_NAME.'_'.'administrator'])){ ?>
        <div class="nav-section">
            <div class="nav-title"><?php echo $MSG_SYSTEM?></div>
            <a href="rejudge.php" class="nav-item" target="main-frame" title="<?php echo $MSG_REJUDGE?>"><i data-lucide="refresh-cw"></i> <span><?php echo $MSG_REJUDGE?></span></a>
            <a href="update_db.php" class="nav-item" target="main-frame" title="<?php echo $MSG_UPDATE_DATABASE?>"><i data-lucide="database"></i> <span><?php echo $MSG_UPDATE_DATABASE?></span></a>
            <a href="backup.php" class="nav-item" target="main-frame" title="<?php echo $MSG_BACKUP_DATABASE?>"><i data-lucide="hard-drive-download"></i> <span><?php echo $MSG_BACKUP_DATABASE?></span></a>
        </div>

        <div class="nav-section">
            <div class="nav-title">链接</div>
            <a href="https://github.com/zhblue/hustoj/" class="nav-item" target="_blank" title="GitHub"><i data-lucide="github"></i> <span>GitHub</span></a>
            <a href="http://tk.hustoj.com" class="nav-item" target="_blank" title="题库"><i data-lucide="package"></i> <span>题库</span></a>
        </div>
        <?php } ?>
    </aside>

    <main class="main">
        <header class="header">
            <div class="header-left">
                <button class="toggle-btn" id="sidebar-toggle">
                    <i data-lucide="menu"></i>
                </button>
                <h1><i data-lucide="settings"></i> <?php echo $MSG_ADMIN?></h1>
            </div>
            <div class="user-info">
                <span><?php echo isset($_SESSION[$OJ_NAME.'_'.'user_id']) ? $_SESSION[$OJ_NAME.'_'.'user_id'] : 'Guest'; ?></span>
                <div class="avatar"><?php echo isset($_SESSION[$OJ_NAME.'_'.'user_id']) ? strtoupper(substr($_SESSION[$OJ_NAME.'_'.'user_id'], 0, 1)) : 'G'; ?></div>
            </div>
        </header>
        <div class="content">
            <div class="frame-container">
                <iframe name="main-frame" src="help.php"></iframe>
            </div>
        </div>
    </main>

    <script>
        lucide.createIcons();
        
        // Active State Handling
        document.querySelectorAll('.nav-item[target="main-frame"]').forEach(function(item) {
            item.addEventListener('click', function() {
                document.querySelectorAll('.nav-item').forEach(function(i) { i.classList.remove('active'); });
                this.classList.add('active');
            });
        });

        // Sidebar Toggle Logic
        const toggleBtn = document.getElementById('sidebar-toggle');
        const body = document.body;
        
        // Check local storage
        if (localStorage.getItem('sidebar-collapsed') === 'true') {
            body.classList.add('collapsed');
        }

        toggleBtn.addEventListener('click', () => {
            body.classList.toggle('collapsed');
            localStorage.setItem('sidebar-collapsed', body.classList.contains('collapsed'));
        });
    </script>
</body>
</html>