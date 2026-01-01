<?php
require_once("admin-header.php");
if(isset($OJ_LANG)){
    require_once("../lang/$OJ_LANG.php");
}

// 获取统计数据
$problem_count = pdo_query("SELECT COUNT(*) FROM problem")[0][0] ?? 0;
$user_count = pdo_query("SELECT COUNT(*) FROM users")[0][0] ?? 0;
$solution_count = pdo_query("SELECT COUNT(*) FROM solution")[0][0] ?? 0;
$contest_count = pdo_query("SELECT COUNT(*) FROM contest")[0][0] ?? 0;
$today_submit = pdo_query("SELECT COUNT(*) FROM solution WHERE DATE(in_date) = CURDATE()")[0][0] ?? 0;
$today_ac = pdo_query("SELECT COUNT(*) FROM solution WHERE DATE(in_date) = CURDATE() AND result = 4")[0][0] ?? 0;

$delay_result = pdo_query("SELECT AVG(judgetime-in_date) as delay FROM (SELECT judgetime, in_date FROM solution WHERE result >= 4 ORDER BY solution_id DESC LIMIT 10) c");
$delay = $delay_result[0]['delay'] ?? 0;

$recent_solutions = pdo_query("SELECT s.solution_id, s.user_id, s.problem_id, s.result, s.in_date FROM solution s ORDER BY solution_id DESC LIMIT 8");

$result_map = array(
    4 => ['text' => 'AC', 'color' => '#27ae60'],
    5 => ['text' => 'PE', 'color' => '#f39c12'],
    6 => ['text' => 'WA', 'color' => '#e74c3c'],
    7 => ['text' => 'TLE', 'color' => '#e74c3c'],
    8 => ['text' => 'MLE', 'color' => '#e74c3c'],
    9 => ['text' => 'OLE', 'color' => '#e74c3c'],
    10 => ['text' => 'RE', 'color' => '#e74c3c'],
    11 => ['text' => 'CE', 'color' => '#f39c12'],
);
?>

<style>
.dashboard {
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
}

.welcome {
    background: linear-gradient(135deg, #2c3e50, #3498db);
    color: #fff;
    padding: 25px;
    border-radius: 8px;
    margin-bottom: 20px;
}
.welcome h2 { color: #fff; margin: 0 0 5px 0; font-size: 22px; }
.welcome p { margin: 0; opacity: 0.9; font-size: 13px; }

.stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;
    margin-bottom: 20px;
}
@media (max-width: 800px) {
    .stats { grid-template-columns: repeat(2, 1fr); }
}

.stat-card {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    border: 1px solid #ddd;
    text-align: center;
}
.stat-card .num {
    font-size: 32px;
    font-weight: 700;
    color: #2c3e50;
}
.stat-card .label {
    font-size: 13px;
    color: #7f8c8d;
    margin-top: 5px;
}
.stat-card .sub {
    font-size: 12px;
    color: #27ae60;
    margin-top: 5px;
}

.grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
}
@media (max-width: 800px) {
    .grid { grid-template-columns: 1fr; }
}

.card {
    background: #fff;
    border-radius: 8px;
    border: 1px solid #ddd;
}
.card-title {
    padding: 15px 20px;
    border-bottom: 1px solid #eee;
    font-weight: 600;
    font-size: 15px;
}
.card-body {
    padding: 20px;
}

.info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
}
.info-item {
    background: #f8f9fa;
    padding: 12px;
    border-radius: 6px;
}
.info-item .label { font-size: 12px; color: #7f8c8d; }
.info-item .value { font-size: 16px; font-weight: 600; color: #2c3e50; margin-top: 3px; }

.quick-btns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
}
.quick-btn {
    display: block;
    padding: 12px 15px;
    background: #f8f9fa;
    border: 1px solid #ddd;
    border-radius: 6px;
    color: #333;
    text-decoration: none;
    text-align: center;
    transition: all 0.2s;
}
.quick-btn:hover {
    background: #ecf0f1;
    text-decoration: none;
}

.recent-table {
    width: 100%;
    font-size: 13px;
}
.recent-table th {
    text-align: left;
    padding: 10px;
    background: #f8f9fa;
    font-weight: 500;
    border-bottom: 1px solid #ddd;
}
.recent-table td {
    padding: 10px;
    border-bottom: 1px solid #f0f0f0;
}
.badge {
    display: inline-block;
    padding: 2px 8px;
    border-radius: 3px;
    font-size: 11px;
    color: #fff;
}
</style>

<div class="dashboard">
    <div class="welcome">
        <h2>👋 欢迎，<?php echo isset($_SESSION[$OJ_NAME.'_'.'user_id']) ? htmlspecialchars($_SESSION[$OJ_NAME.'_'.'user_id']) : 'Admin'; ?></h2>
        <p><?php echo $OJ_NAME; ?> 管理后台 · <?php echo date('Y-m-d H:i'); ?></p>
    </div>

    <div class="stats">
        <div class="stat-card">
            <div class="num"><?php echo number_format($problem_count); ?></div>
            <div class="label">📝 题目</div>
        </div>
        <div class="stat-card">
            <div class="num"><?php echo number_format($user_count); ?></div>
            <div class="label">👥 用户</div>
        </div>
        <div class="stat-card">
            <div class="num"><?php echo number_format($solution_count); ?></div>
            <div class="label">📊 提交</div>
            <div class="sub">今日 +<?php echo $today_submit; ?></div>
        </div>
        <div class="stat-card">
            <div class="num"><?php echo number_format($contest_count); ?></div>
            <div class="label">🏆 比赛</div>
        </div>
    </div>

    <div class="grid">
        <div class="card">
            <div class="card-title">📈 系统状态</div>
            <div class="card-body">
                <div class="info-grid">
                    <div class="info-item">
                        <div class="label">判题延迟</div>
                        <div class="value"><?php echo round($delay, 2); ?>s</div>
                    </div>
                    <div class="info-item">
                        <div class="label">今日AC</div>
                        <div class="value"><?php echo $today_ac; ?></div>
                    </div>
                    <div class="info-item">
                        <div class="label">PHP版本</div>
                        <div class="value"><?php echo phpversion(); ?></div>
                    </div>
                    <div class="info-item">
                        <div class="label">数据库</div>
                        <div class="value">MySQL</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-title">⚡ 快捷操作</div>
            <div class="card-body">
                <div class="quick-btns">
                    <a href="problem_add_page.php" class="quick-btn">➕ 添加题目</a>
                    <a href="contest_add.php" class="quick-btn">🏆 创建比赛</a>
                    <a href="user_add.php" class="quick-btn">👤 添加用户</a>
                    <a href="news_add_page.php" class="quick-btn">📢 发布公告</a>
                </div>
            </div>
        </div>
    </div>

    <div class="card" style="margin-top: 20px;">
        <div class="card-title">🕐 最近提交</div>
        <div class="card-body" style="padding: 0;">
            <table class="recent-table">
                <thead>
                    <tr><th>ID</th><th>用户</th><th>题目</th><th>结果</th><th>时间</th></tr>
                </thead>
                <tbody>
                    <?php if (!empty($recent_solutions) && is_array($recent_solutions)): ?>
                        <?php foreach ($recent_solutions as $sol): ?>
                        <tr>
                            <td><?php echo $sol['solution_id']; ?></td>
                            <td><?php echo htmlspecialchars($sol['user_id']); ?></td>
                            <td><?php echo $sol['problem_id']; ?></td>
                            <td>
                                <?php
                                $r = isset($result_map[$sol['result']]) ? $result_map[$sol['result']] : ['text' => 'Pending', 'color' => '#95a5a6'];
                                ?>
                                <span class="badge" style="background:<?php echo $r['color']; ?>"><?php echo $r['text']; ?></span>
                            </td>
                            <td><?php echo substr($sol['in_date'], 5, 11); ?></td>
                        </tr>
                        <?php endforeach; ?>
                    <?php else: ?>
                        <tr><td colspan="5" style="text-align:center;color:#999;padding:30px;">暂无提交</td></tr>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
    </div>
</div>
