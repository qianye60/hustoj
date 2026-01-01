<?php
////////////////////////////Common head
$cache_time = 30;
$OJ_CACHE_SHARE = false;
require_once( './include/cache_start.php' );
require_once( './include/db_info.inc.php' );
require_once( './include/memcache.php' );
require_once( './include/setlang.php' );
require_once( './include/bbcode.php' );
$view_title = "Welcome To Online Judge";
$result = false;
if ( isset( $OJ_ON_SITE_CONTEST_ID ) ) {
	header( "location:contest.php?cid=" . $OJ_ON_SITE_CONTEST_ID );
	exit();
}
///////////////////////////MAIN
//NOIP赛制比赛时，本月之星，统计图不计入相关比赛提交
$now =  date('Y-m-d H:i', time());
$noip_contests="";
$sql="select contest_id from contest where start_time<'$now' and end_time>'$now' and ( title like '%$OJ_NOIP_KEYWORD%' or (contest_type & 20)>0 )  ";
$rows=pdo_query($sql);
$NOIP_flag=0;
//  echo "->".$sql;
if(!empty($rows)){
     foreach( $rows as $row ){
             $noip_contests.=$row['contest_id'].",";
             $NOIP_flag++;
     }
}
$not_in_noip_contests="";
if(!empty($noip_contests)) {
     $noip_contests=rtrim($noip_contests,",");
     $not_in_noip_contests=" and contest_id not in ( $noip_contests )";
}

$page_size_options = array(5, 10, 15, 20);
$news_page_size = isset($_GET['news_size']) ? intval($_GET['news_size']) : 8;
$contest_page_size = isset($_GET['contest_size']) ? intval($_GET['contest_size']) : 8;
if (!in_array($news_page_size, $page_size_options)) $news_page_size = 8;
if (!in_array($contest_page_size, $page_size_options)) $contest_page_size = 8;
$news_page = isset($_GET['news_page']) ? intval($_GET['news_page']) : 1;
$contest_page = isset($_GET['contest_page']) ? intval($_GET['contest_page']) : 1;
if ($news_page < 1) $news_page = 1;
if ($contest_page < 1) $contest_page = 1;

$view_news_total = 0;
$view_news_list = array();
$news_count_result = mysql_query_cache("select count(1) from `news` where `defunct`!='Y' and `title`!='faqs.$OJ_LANG'");
if (!empty($news_count_result) && isset($news_count_result[0][0])) {
	$view_news_total = intval($news_count_result[0][0]);
}
$news_offset = ($news_page - 1) * $news_page_size;
$sql_news_list = "select news_id,title,time from `news` where `defunct`!='Y' and `title`!='faqs.$OJ_LANG' "
	. "order by `importance` asc,`time` desc limit $news_offset,$news_page_size";
$view_news_list = mysql_query_cache($sql_news_list);

$view_contests_total = 0;
$view_contests_list = array();
$contest_count_result = mysql_query_cache("select count(1) from `contest` where `defunct`='N'");
if (!empty($contest_count_result) && isset($contest_count_result[0][0])) {
	$view_contests_total = intval($contest_count_result[0][0]);
}
$contest_offset = ($contest_page - 1) * $contest_page_size;
$sql_contests_list = "select contest_id,title,start_time,end_time,private from `contest` "
	. "where `defunct`='N' "
	. "order by `contest_id` desc limit $contest_offset,$contest_page_size";
$view_contests_list = mysql_query_cache($sql_contests_list);

$view_total_users = 0;
$view_total_problems = 0;
$view_total_contests = 0;
$view_total_submits = 0;

$total_users_result = mysql_query_cache("select count(1) from `users` where `defunct`='N'");
if (!empty($total_users_result) && isset($total_users_result[0][0])) {
	$view_total_users = intval($total_users_result[0][0]);
}
$total_problems_result = mysql_query_cache("select count(1) from `problem` where `defunct`='N'");
if (!empty($total_problems_result) && isset($total_problems_result[0][0])) {
	$view_total_problems = intval($total_problems_result[0][0]);
}
$total_contests_result = mysql_query_cache("select count(1) from `contest` where `defunct`='N'");
if (!empty($total_contests_result) && isset($total_contests_result[0][0])) {
	$view_total_contests = intval($total_contests_result[0][0]);
}
$total_submits_result = mysql_query_cache("select count(1) from `solution` where `problem_id`>0");
if (!empty($total_submits_result) && isset($total_submits_result[0][0])) {
	$view_total_submits = intval($total_submits_result[0][0]);
}

$view_student_rank = array();
// 直接从solution表统计，避免users表中solved/submit未更新的问题
$sql_student_rank = "SELECT u.user_id, u.nick,
	IFNULL(s.solved, 0) as solved,
	IFNULL(s.submit, 0) as submit
FROM users u
LEFT JOIN (
	SELECT user_id,
		COUNT(DISTINCT CASE WHEN result=4 THEN problem_id END) as solved,
		COUNT(DISTINCT problem_id) as submit
	FROM solution
	WHERE problem_id > 0
	GROUP BY user_id
) s ON u.user_id = s.user_id
WHERE u.defunct='N' AND u.user_id NOT IN (".$OJ_RANK_HIDDEN.")
ORDER BY solved DESC, submit ASC
LIMIT 10";
$view_student_rank = mysql_query_cache($sql_student_rank);

// 今日提交和今日AC统计
$today = date('Y-m-d');
$view_today_submit = 0;
$view_today_ac = 0;
$today_submit_result = mysql_query_cache("select count(1) from `solution` where date(in_date)='$today' and problem_id>0");
if (!empty($today_submit_result) && isset($today_submit_result[0][0])) {
	$view_today_submit = intval($today_submit_result[0][0]);
}
$today_ac_result = mysql_query_cache("select count(1) from `solution` where date(in_date)='$today' and problem_id>0 and result=4");
if (!empty($today_ac_result) && isset($today_ac_result[0][0])) {
	$view_today_ac = intval($today_ac_result[0][0]);
}

$view_apc_info = "";
$last_1000_id=0;
$last_1000_id=pdo_query("select min(solution_id) id from solution where in_date >= NOW() - INTERVAL 8 DAY union select max(solution_id)-1000 id from solution order by id desc limit 1");
if(!empty($last_1000_id))  $last_1000_id=$last_1000_id[0][0];
if ($last_1000_id==NULL) $last_1000_id=0;


$sql = "SELECT date(in_date) md,count(1) c FROM (select * from solution where solution_id > $last_1000_id  $not_in_noip_contests and result<13 and problem_id>0 and  result>=4 ) solution group by md order by md desc limit 1000";
$result = mysql_query_cache( $sql ); //mysql_escape_string($sql));
$chart_data_all = array();
//echo $sql;
if(!empty($result))
foreach ( $result as $row ) {
        array_push( $chart_data_all, array( $row[ 'md' ], $row[ 'c' ] ) );
}

$sql = "SELECT date(in_date) md,count(1) c FROM  (select * from solution where solution_id > $last_1000_id $not_in_noip_contests and result=4 and problem_id>0) solution group by md order by md desc limit 1000";
$result2 = mysql_query_cache( $sql ); //mysql_escape_string($sql));
$ac=array();
foreach ( $result2 as $row ) {
	$ac[$row['md']]=$row['c'];
}
$chart_data_ac = array();
//echo $sql;
if(!empty($result))
foreach ( $result as $row ) {
	if(isset($ac[$row['md']]))
        	array_push( $chart_data_ac, array( $row[ 'md' ], $ac[$row['md']] ) );
        else
		array_push( $chart_data_ac, array( $row[ 'md' ], 0 ) );
}
$speed=0;
if ( isset( $_SESSION[ $OJ_NAME . '_' . 'administrator' ] ) ) {
        $sql = "select avg(sp) sp from (select  avg(1) sp,judgetime DIV 3600 from solution where result>3 and solution_id >$last_1000_id  group by (judgetime DIV 3600) order by sp) tt;";
        $result = mysql_query_cache( $sql );
        $speed = ( $result[ 0 ][ 0 ] ? $result[ 0 ][ 0 ] : 0 ) . '/min';
} else {
        if(isset($chart_data_all[ 0 ])) $speed = ( isset($chart_data_all[ 0 ][ 1 ]) ? $chart_data_all[ 0 ][ 1 ] : 0 ) . '/day';
}
/////////////////////////Template
require( "template/" . $OJ_TEMPLATE . "/index.php" );
if( isset($OJ_LONG_LOGIN)
    && $OJ_LONG_LOGIN
    &&(!isset($_SESSION[$OJ_NAME.'_user_id']))
    &&isset($_COOKIE[$OJ_NAME."_user"])
    &&isset($_COOKIE[$OJ_NAME."_check"])){
          echo"<script>let xhr=new XMLHttpRequest();xhr.open('GET','login.php',true);xhr.send();setTimeout('location.reload()',800);</script>";
}

/////////////////////////Common foot
if ( file_exists( './include/cache_end.php' ) )
	require_once( './include/cache_end.php' );
?>
