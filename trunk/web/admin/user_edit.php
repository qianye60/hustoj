<?php require_once("admin-header.php");

if (!(isset($_SESSION[$OJ_NAME.'_'.'administrator']) || isset($_SESSION[$OJ_NAME.'_'.'password_setter']) )){
	echo "<a href='../loginpage.php'>Please Login First!</a>";
	exit(1);
}

if(isset($OJ_LANG)){
  require_once("../lang/$OJ_LANG.php");
}

require_once("../include/my_func.inc.php");
?>

<title>Edit User</title>
<hr>
<center><h3><?php echo $MSG_USER."-".$MSG_EDIT?></h3></center>

<div class='padding'>

<?php
// 处理表单提交
if(isset($_POST['do'])){
	require_once("../include/check_post_key.php");

	$user_id = trim($_POST['user_id']);
	$nick = trim($_POST['nick']);
	$email = trim($_POST['email']);
	$school = trim($_POST['school']);
	$group_name = trim($_POST['group_name']);
	$password = trim($_POST['password']);

	// 检查用户是否存在
	$sql = "SELECT `user_id` FROM `users` WHERE `user_id` = ?";
	$result = pdo_query($sql, $user_id);

	if(count($result) == 0){
		echo "<center><h4 class='text-danger'>User ".htmlentities($user_id, ENT_QUOTES, 'UTF-8')." not found!</h4></center>";
	} else {
		// 更新用户信息（不包括密码）
		$sql = "UPDATE `users` SET `nick`=?, `email`=?, `school`=?, `group_name`=? WHERE `user_id`=?";
		pdo_query($sql, $nick, $email, $school, $group_name, $user_id);

		// 同步更新solution表中的nick
		$sql = "UPDATE `solution` SET `nick`=? WHERE `user_id`=?";
		pdo_query($sql, $nick, $user_id);

		// 如果密码不为空，则更新密码
		if(!empty($password)){
			$passwd = pwGen($password);
			$sql = "UPDATE `users` SET `password`=? WHERE `user_id`=?";
			pdo_query($sql, $passwd, $user_id);
			echo "<center><h4 style='color:#16a34a;'>User ".htmlentities($user_id, ENT_QUOTES, 'UTF-8')." updated (password changed)!</h4></center>";
		} else {
			echo "<center><h4 style='color:#16a34a;'>User ".htmlentities($user_id, ENT_QUOTES, 'UTF-8')." updated!</h4></center>";
		}
		?>
		<script>window.setTimeout("history.go(-2);",2000);</script>
		<?php
	}
}

// 获取用户信息用于回显
$user = null;
$uid = '';
if(isset($_GET['uid'])){
	$uid = $_GET['uid'];
	$sql = "SELECT `user_id`, `nick`, `email`, `school`, `group_name` FROM `users` WHERE `user_id` = ?";
	$result = pdo_query($sql, $uid);
	if(count($result) > 0){
		$user = $result[0];
	}
}
?>

<form action="user_edit.php" method="post" class="form-horizontal">
	<div class="form-group" style="margin-bottom:15px;">
		<label class="col-sm-offset-2 col-sm-2 control-label"><?php echo $MSG_USER_ID?></label>
		<div class="col-sm-4">
			<input name="user_id" class="form-control" value="<?php echo htmlentities($user ? $user['user_id'] : $uid, ENT_QUOTES, 'UTF-8');?>" type="text" readonly style="background:#f3f4f6;">
		</div>
	</div>

	<div class="form-group" style="margin-bottom:15px;">
		<label class="col-sm-offset-2 col-sm-2 control-label"><?php echo $MSG_NICK?></label>
		<div class="col-sm-4">
			<input name="nick" class="form-control" value="<?php echo htmlentities($user ? $user['nick'] : '', ENT_QUOTES, 'UTF-8');?>" type="text" placeholder="<?php echo $MSG_NICK?>">
		</div>
	</div>

	<div class="form-group" style="margin-bottom:15px;">
		<label class="col-sm-offset-2 col-sm-2 control-label"><?php echo $MSG_EMAIL?></label>
		<div class="col-sm-4">
			<input name="email" class="form-control" value="<?php echo htmlentities($user ? $user['email'] : '', ENT_QUOTES, 'UTF-8');?>" type="text" placeholder="<?php echo $MSG_EMAIL?>">
		</div>
	</div>

	<div class="form-group" style="margin-bottom:15px;">
		<label class="col-sm-offset-2 col-sm-2 control-label"><?php echo $MSG_SCHOOL?></label>
		<div class="col-sm-4">
			<input name="school" class="form-control" value="<?php echo htmlentities($user ? $user['school'] : '', ENT_QUOTES, 'UTF-8');?>" type="text" placeholder="<?php echo $MSG_SCHOOL?>">
		</div>
	</div>

	<div class="form-group" style="margin-bottom:15px;">
		<label class="col-sm-offset-2 col-sm-2 control-label"><?php echo $MSG_GROUP_NAME?></label>
		<div class="col-sm-4">
			<input name="group_name" class="form-control" value="<?php echo htmlentities($user ? $user['group_name'] : '', ENT_QUOTES, 'UTF-8');?>" type="text" placeholder="<?php echo $MSG_GROUP_NAME?>">
		</div>
	</div>

	<div class="form-group" style="margin-bottom:15px;">
		<label class="col-sm-offset-2 col-sm-2 control-label"><?php echo $MSG_PASSWORD?></label>
		<div class="col-sm-4">
			<input name="password" class="form-control" type="password" placeholder="Leave empty to keep current password" autocomplete="off">
		</div>
		<div class="col-sm-2">
			<button type="button" onclick='$("input[name=password]").attr("type","text");' class="btn btn-default">Show</button>
		</div>
	</div>

	<div class="form-group">
		<?php require_once("../include/set_post_key.php");?>
		<div class="col-sm-offset-4 col-sm-2">
			<button name="do" type="submit" value="do" class="btn btn-default btn-block"><?php echo $MSG_SAVE?></button>
		</div>
		<div class="col-sm-2">
			<button type="button" onclick="history.go(-1);" class="btn btn-default btn-block"><?php echo $MSG_BACK?></button>
		</div>
	</div>
</form>

</div>
