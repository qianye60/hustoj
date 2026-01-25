<?php $show_title="$MSG_HOME - $OJ_NAME"; ?>
<?php include("template/$OJ_TEMPLATE/header.php");?>
<head>
<link rel="stylesheet" href="<?php echo "template/$OJ_TEMPLATE";?>/css/slide.css">
<script src="<?php echo $OJ_CDN_URL.$path_fix."template/$OJ_TEMPLATE"?>/js/echarts.min.js"></script>
<script src="https://unpkg.com/lucide@latest"></script>
</head>

<?php
function home_page_url($news_page, $contest_page, $news_size = null, $contest_size = null) {
	global $news_page_size, $contest_page_size;
	$news_page = max(1, intval($news_page));
	$contest_page = max(1, intval($contest_page));
	$ns = $news_size !== null ? intval($news_size) : $news_page_size;
	$cs = $contest_size !== null ? intval($contest_size) : $contest_page_size;
	return "home.php?news_page=".$news_page."&contest_page=".$contest_page."&news_size=".$ns."&contest_size=".$cs;
}
$empty_text = isset($MSG_EMPTY) ? $MSG_EMPTY : "暂无数据";
?>

<style>
	.syzoj-container {
		padding: 20px 0;
		background: transparent;
		min-height: calc(100vh - 118px);
	}

	.syzoj-card {
		background: #fff;
		border-radius: 8px;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
		border: 1px solid #e5e7eb;
		margin-bottom: 16px;
		overflow: hidden;
	}

	.syzoj-card-header {
		padding: 14px 18px;
		background: linear-gradient(135deg, #3b6ef5 0%, #1fc0a8 100%);
		color: #fff;
		font-weight: 600;
		font-size: 15px;
		display: flex;
		align-items: center;
		gap: 10px;
		border-bottom: none;
	}

	.syzoj-card-header:has(.header-action) {
		justify-content: space-between;
	}

	.syzoj-card-header .header-title {
		display: inline-flex;
		align-items: center;
		gap: 10px;
	}

	.syzoj-card-header .header-action {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-size: 12px;
		padding: 4px 10px;
		border-radius: 6px;
		background: rgba(255, 255, 255, 0.2);
		color: #fff;
	}

	.syzoj-card-body {
		padding: 16px 18px;
	}

	.syzoj-title {
		color: #1f2937;
		font-weight: 600;
		font-size: 16px;
		margin: 0 0 12px;
	}

	.syzoj-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 20px;
		height: 20px;
		color: #fff;
	}

	.syzoj-icon svg {
		width: 18px;
		height: 18px;
		stroke-width: 2;
	}

	.syzoj-table {
		width: 100%;
		border-collapse: collapse;
	}

	.syzoj-table th {
		background: transparent;
		padding: 10px 12px;
		color: #6b7280;
		font-weight: 600;
		font-size: 12px;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		text-align: left;
		border-bottom: 1px solid #e5e7eb;
	}

	.syzoj-table td {
		padding: 12px;
		border-bottom: 1px solid #f3f4f6;
		color: #374151;
		font-size: 14px;
	}

	.syzoj-table tr:last-child td {
		border-bottom: none;
	}

	.syzoj-table tr:hover td {
		background: #f9fafb;
	}

	.syzoj-table a {
		color: #3b82f6;
		text-decoration: none;
	}

	.syzoj-table a:hover {
		text-decoration: underline;
	}

	.syzoj-pagination-wrap {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 12px;
		position: relative;
	}

	.syzoj-pagination {
		display: flex;
		justify-content: center;
		gap: 6px;
		flex-wrap: wrap;
	}

	.syzoj-page-size {
		position: absolute;
		right: 0;
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 12px;
		color: #6b7280;
	}

	.syzoj-page-size select {
		padding: 4px 8px;
		border-radius: 4px;
		border: 1px solid #d1d5db;
		background: #fff;
		color: #374151;
		font-size: 12px;
		cursor: pointer;
	}

	.syzoj-pagination a,
	.syzoj-pagination span {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 6px 10px;
		border-radius: 6px;
		font-size: 12px;
		border: 1px solid #e1e5ee;
		color: #4a5d7a;
		background: #fff;
	}

	.syzoj-pagination .active {
		background: #3b82f6;
		border-color: #3b82f6;
		color: #fff;
	}

	.syzoj-pagination .disabled {
		background: #f9fafb;
		border-color: #e5e7eb;
		color: #9ca3af;
		cursor: not-allowed;
	}

	.syzoj-pagination i {
		width: 14px;
		height: 14px;
	}

	.syzoj-stat-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 12px;
	}

	.syzoj-stat {
		padding: 14px 12px;
		border-radius: 8px;
		background: #f9fafb;
		border: 1px solid #e5e7eb;
		text-align: center;
	}

	.syzoj-stat-title {
		font-size: 12px;
		color: #6b7280;
		margin-bottom: 4px;
	}

	.syzoj-stat-value {
		font-size: 20px;
		font-weight: 600;
		color: #1f2937;
	}

	.syzoj-split {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 14px;
	}

	@media (max-width: 768px) {
		.syzoj-container {
			padding: 10px 0 20px;
		}

		.syzoj-table th,
		.syzoj-table td {
			padding: 8px 10px;
		}

		.syzoj-stat-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.syzoj-split {
			grid-template-columns: 1fr;
		}
	}
</style>

<div class="syzoj-container">
	<div class="ui stackable three column grid">
		<div class="eleven wide column">
			<div class="syzoj-card">
				<div class="syzoj-card-header">
					<div class="header-title">
						<span class="syzoj-icon" data-lucide="sparkles"></span>
						平台速览
					</div>
					<div class="header-action">
						<span class="syzoj-icon" data-lucide="activity"></span>
						实时统计更新中
					</div>
				</div>
				<div class="syzoj-card-body">
					<div class="syzoj-stat-grid">
						<div class="syzoj-stat">
							<div class="syzoj-stat-title">注册用户</div>
							<div class="syzoj-stat-value"><?php echo $view_total_users; ?></div>
						</div>
						<div class="syzoj-stat">
							<div class="syzoj-stat-title">题目数量</div>
							<div class="syzoj-stat-value"><?php echo $view_total_problems; ?></div>
						</div>
						<div class="syzoj-stat">
							<div class="syzoj-stat-title">比赛/作业</div>
							<div class="syzoj-stat-value"><?php echo $view_total_contests; ?></div>
						</div>
						<div class="syzoj-stat">
							<div class="syzoj-stat-title">提交总数</div>
							<div class="syzoj-stat-value"><?php echo $view_total_submits; ?></div>
						</div>
						<div class="syzoj-stat">
							<div class="syzoj-stat-title">今日提交</div>
							<div class="syzoj-stat-value"><?php echo $view_today_submit; ?></div>
						</div>
						<div class="syzoj-stat">
							<div class="syzoj-stat-title">今日AC</div>
							<div class="syzoj-stat-value"><?php echo $view_today_ac; ?></div>
						</div>
					</div>
				</div>
			</div>


			<div class="syzoj-card">
				<div class="syzoj-card-header">
					<span class="syzoj-icon" data-lucide="bell"></span>
					<?php echo $MSG_NEWS;?>
				</div>
				<div class="syzoj-card-body">
					<table class="syzoj-table">
						<thead>
							<tr>
								<th style="width: 75%;"><?php echo $MSG_TITLE;?></th>
								<th style="width: 25%;"><?php echo $MSG_TIME;?></th>
							</tr>
						</thead>
						<tbody>
							<?php if (!empty($view_news_list)) { ?>
								<?php foreach ($view_news_list as $row) { ?>
									<tr>
										<td><a href="viewnews.php?id=<?php echo $row['news_id']; ?>"><?php echo htmlentities($row['title'], ENT_QUOTES, "UTF-8"); ?></a></td>
										<td><?php echo $row['time']; ?></td>
									</tr>
								<?php } ?>
							<?php } else { ?>
								<tr><td colspan="2"><?php echo $empty_text;?></td></tr>
							<?php } ?>
						</tbody>
					</table>
					<?php
						$news_total_pages = $view_news_total > 0 ? ceil($view_news_total / $news_page_size) : 1;
					?>
					<div class="syzoj-pagination-wrap">
						<div class="syzoj-pagination">
							<?php if ($news_page > 1) { ?>
								<a href="<?php echo home_page_url($news_page - 1, $contest_page); ?>"><i data-lucide="chevron-left"></i></a>
							<?php } else { ?>
								<span class="disabled"><i data-lucide="chevron-left"></i></span>
							<?php } ?>
							<?php
								$news_start = max(1, $news_page - 2);
								$news_end = min($news_total_pages, $news_page + 2);
								for ($i = $news_start; $i <= $news_end; $i++) {
									if ($i == $news_page) {
										echo "<span class='active'>".$i."</span>";
									} else {
										echo "<a href='".home_page_url($i, $contest_page)."'>".$i."</a>";
									}
								}
							?>
							<?php if ($news_page < $news_total_pages) { ?>
								<a href="<?php echo home_page_url($news_page + 1, $contest_page); ?>"><i data-lucide="chevron-right"></i></a>
							<?php } else { ?>
								<span class="disabled"><i data-lucide="chevron-right"></i></span>
							<?php } ?>
						</div>
						<div class="syzoj-page-size">
							<span>每页</span>
							<select onchange="location.href='<?php echo home_page_url(1, $contest_page); ?>&news_size='+this.value">
								<?php foreach ($page_size_options as $size) { ?>
									<option value="<?php echo $size; ?>" <?php if ($news_page_size == $size) echo 'selected'; ?>><?php echo $size; ?></option>
								<?php } ?>
							</select>
							<span>条</span>
						</div>
					</div>
				</div>
			</div>

			<div class="syzoj-card">
				<div class="syzoj-card-header">
					<span class="syzoj-icon" data-lucide="calendar-check"></span>
					作业 & 比赛
				</div>
				<div class="syzoj-card-body">
					<table class="syzoj-table">
						<thead>
							<tr>
								<th style="width: 15%;">编号</th>
								<th style="width: 45%;">名称</th>
								<th style="width: 25%;">时间</th>
								<th style="width: 15%;">开放</th>
							</tr>
						</thead>
						<tbody>
							<?php if (!empty($view_contests_list)) { ?>
								<?php foreach ($view_contests_list as $row) { ?>
									<tr>
										<td><?php echo $row['contest_id']; ?></td>
										<td><a href="contest.php?cid=<?php echo $row['contest_id']; ?>"><?php echo htmlentities($row['title'], ENT_QUOTES, "UTF-8"); ?></a></td>
										<td><?php echo strtotime($row['end_time']) < time() ? '<span style="color:#999;">已结束</span>' : $row['start_time']; ?></td>
										<td><?php echo $row['private'] == 0 ? '<span style="color:#16a34a;">公开</span>' : '<span style="color:#dc2626;">私有</span>'; ?></td>
									</tr>
								<?php } ?>
							<?php } else { ?>
								<tr><td colspan="4"><?php echo $empty_text;?></td></tr>
							<?php } ?>
						</tbody>
					</table>
					<?php
						$contest_total_pages = $view_contests_total > 0 ? ceil($view_contests_total / $contest_page_size) : 1;
					?>
					<div class="syzoj-pagination-wrap">
						<div class="syzoj-pagination">
							<?php if ($contest_page > 1) { ?>
								<a href="<?php echo home_page_url($news_page, $contest_page - 1); ?>"><i data-lucide="chevron-left"></i></a>
							<?php } else { ?>
								<span class="disabled"><i data-lucide="chevron-left"></i></span>
							<?php } ?>
							<?php
								$contest_start = max(1, $contest_page - 2);
								$contest_end = min($contest_total_pages, $contest_page + 2);
								for ($i = $contest_start; $i <= $contest_end; $i++) {
									if ($i == $contest_page) {
										echo "<span class='active'>".$i."</span>";
									} else {
										echo "<a href='".home_page_url($news_page, $i)."'>".$i."</a>";
									}
								}
							?>
							<?php if ($contest_page < $contest_total_pages) { ?>
								<a href="<?php echo home_page_url($news_page, $contest_page + 1); ?>"><i data-lucide="chevron-right"></i></a>
							<?php } else { ?>
								<span class="disabled"><i data-lucide="chevron-right"></i></span>
							<?php } ?>
						</div>
						<div class="syzoj-page-size">
							<span>每页</span>
							<select onchange="location.href='<?php echo home_page_url($news_page, 1); ?>&contest_size='+this.value">
								<?php foreach ($page_size_options as $size) { ?>
									<option value="<?php echo $size; ?>" <?php if ($contest_page_size == $size) echo 'selected'; ?>><?php echo $size; ?></option>
								<?php } ?>
							</select>
							<span>条</span>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="right floated five wide column">
			<div class="syzoj-card">
				<div class="syzoj-card-header">
					<span class="syzoj-icon" data-lucide="bar-chart-3"></span>
					学习热度
				</div>
				<div class="syzoj-card-body">
					<div id="submission" style="width: 100%; height: 240px;"></div>
					<div style="margin-top: 10px; text-align: center; color: #6b768a;">Recent submission: <?php echo $speed; ?></div>
				</div>
			</div>

			<?php
			$month_id=mysql_query_cache("select solution_id from solution where  in_date<date_add(curdate(),interval -day(curdate())+1 DAY) order by solution_id desc limit 1;");
			if(!empty($month_id) && isset($month_id[0][0]) ) $month_id=$month_id[0][0];else $month_id=0;
			$view_month_rank=mysql_query_cache("select user_id,nick,count(distinct(problem_id)) ac from solution where solution_id>$month_id and problem_id>0  $not_in_noip_contests and user_id not in (".$OJ_RANK_HIDDEN.")  and result=4 and first_time=1 group by user_id,nick order by ac desc limit 5");
			?>
			<div class="syzoj-card">
				<div class="syzoj-card-header">
					<span class="syzoj-icon" data-lucide="star"></span>
					本月之星
				</div>
				<div class="syzoj-card-body">
					<table class="syzoj-table">
						<thead>
							<tr>
								<th>用户</th>
								<th>姓名</th>
								<th>解题数</th>
							</tr>
						</thead>
						<tbody>
							<?php if (!empty($view_month_rank) && is_array($view_month_rank)) { ?>
								<?php foreach ( $view_month_rank as $row ) { ?>
									<tr>
										<td><a target="_blank" href="userinfo.php?user=<?php echo htmlentities($row[0], ENT_QUOTES, "UTF-8"); ?>"><?php echo htmlentities($row[0], ENT_QUOTES, "UTF-8"); ?></a></td>
										<td><?php echo htmlentities($row[1], ENT_QUOTES, "UTF-8"); ?></td>
										<td><?php echo $row[2]; ?></td>
									</tr>
								<?php } ?>
							<?php } else { ?>
								<tr><td colspan="3"><?php echo $empty_text;?></td></tr>
							<?php } ?>
						</tbody>
					</table>
				</div>
			</div>

			<div class="syzoj-card">
				<div class="syzoj-card-header">
					<span class="syzoj-icon" data-lucide="users"></span>
					学生排名
				</div>
				<div class="syzoj-card-body">
					<table class="syzoj-table">
						<thead>
							<tr>
								<th style="width: 20%;">排名</th>
								<th style="width: 40%;">姓名</th>
								<th style="width: 20%;">解题</th>
								<th style="width: 20%;">提交</th>
							</tr>
						</thead>
						<tbody>
							<?php if (!empty($view_student_rank) && is_array($view_student_rank)) { ?>
								<?php $rank_index = 1; ?>
								<?php foreach ($view_student_rank as $row) { ?>
									<tr>
										<td><?php echo $rank_index; ?></td>
										<td>
											<a href="userinfo.php?user=<?php echo htmlentities($row['user_id'], ENT_QUOTES, "UTF-8"); ?>">
												<?php echo !empty($row['nick']) ? htmlentities($row['nick'], ENT_QUOTES, "UTF-8") : htmlentities($row['user_id'], ENT_QUOTES, "UTF-8"); ?>
											</a>
										</td>
										<td><?php echo intval($row['solved']); ?></td>
										<td><?php echo intval($row['submit']); ?></td>
									</tr>
									<?php $rank_index++; ?>
								<?php } ?>
							<?php } else { ?>
								<tr><td colspan="4"><?php echo $empty_text;?></td></tr>
							<?php } ?>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>

<?php include("template/$OJ_TEMPLATE/footer.php");?>
<script>
	if (window.lucide) {
		window.lucide.createIcons();
	}
</script>
<script language="javascript" type="text/javascript" src="<?php echo $OJ_CDN_URL?>include/jquery.flot.js"></script>
<script type="text/javascript">
	$( function () {
		var all = <?php echo json_encode(array_column($chart_data_all,1))?>;
		var sub_echarts = echarts.init($("#submission")[0]);
		var option = {
			tooltip: {
				trigger: 'axis',
				formatter: '{b0}({a0}): {c0}<br />{b1}({a1}): {c1}'
			},
			legend: {
				data: ['<?php echo $MSG_SUBMIT?>','<?php echo $MSG_AC?>' ]
			},
			xAxis: {
				data: <?php echo json_encode(array_column($chart_data_ac,0))?>,
				inverse: true
			},
			yAxis: [
				{
					type: 'value',
					name: '<?php echo $MSG_SUBMIT?>'
				}
			],
			series: [
				{
					name: '<?php echo $MSG_SUBMIT?>',
					type: 'bar',
					data: all
				},
				{
					name: '<?php echo $MSG_AC?>',
					type: 'bar',
					data: <?php echo json_encode(array_column($chart_data_ac,1))?>
				}
			]
		};
		sub_echarts.setOption(option);
	});
</script>
