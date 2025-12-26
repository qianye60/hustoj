<?php
$cur_path = "template/$OJ_TEMPLATE/";
$url=basename($_SERVER['REQUEST_URI']);
$dir=basename(getcwd());
if($dir=="discuss3") $path_fix="../";
else $path_fix="";
if(isset($OJ_NEED_LOGIN)&&$OJ_NEED_LOGIN&&(
        $url!='loginpage.php'&&
        $url!='lostpassword.php'&&
        $url!='lostpassword2.php'&&
        $url!='registerpage.php'
    ) && !isset($_SESSION[$OJ_NAME.'_'.'user_id'])){

    header("location:".$path_fix."loginpage.php");
    exit();
}

if($OJ_ONLINE){
    require_once($path_fix.'include/online.php');
    $on = new online();
}
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="<?php echo $OJ_NAME?> - 算法设计在线评测系统">
    <meta name="author" content="HUSTOJ">
    <link rel="icon" href="../../favicon.ico">

    <title><?php echo $OJ_NAME?> - 算法设计在线评测系统</title>
    <link rel="stylesheet" href="<?php echo $cur_path?>css/style.css">
</head>

<body>

<div class=wrap id=wrap>
    <div class=wrapper>
        <div class=header>
            <div class="head clearfix">
                <div class=logo_box>
                    <h1 style="color:White;"><?php echo $OJ_NAME?></h1>
                    <a href='javascript:;' class=logo_link></a>
                </div>
                <div class=nav_box id=nav_box>
                    <ul>
                        <li>
                            <a href='<?php echo $path_fix?>index.php' clickid=guanwang_navigation_homepage>主页</a>
                        </li>
                        <li>
                            <a href='<?php echo $path_fix?>problemset.php' clickid=guanwang_navigation_productcenter>问题</a>
                        </li>
                        <li>
                            <a href='<?php echo $path_fix?>category.php' clickid=guanwang_navigation_customer>分类</a>
                        </li>
                        <li>
                            <a href='<?php echo $path_fix?>contest.php' clickid=guanwang_navigation_customer>竞赛</a>
                        </li>
                        <li>
                            <a href='<?php echo $path_fix?>status.php' clickid=guanwang_navigation_yangtai>状态</a>
                        </li>
                        <li>
                            <a href='<?php echo $path_fix?>ranklist.php' clickid=guanwang_navigation_yangtai>排名</a>
                        </li>
                        <?php if(isset($OJ_BBS) && $OJ_BBS){ ?>
                        <li>
                            <a href='<?php echo $path_fix?>discuss.php' clickid=guanwang_navigation_yangtai>讨论</a>
                        </li>
                        <?php } ?>
                    </ul>
                    <span class=ic_line></span></div>
            </div>
        </div>


        <div class=page_wp id=page_wp>
            <div class="page page_1"><span class="page_bg scale_box"></span>
                <div class=img_box><img src="" alt=""></div>
                <div class="txt_box scale_box">
                    <h2>算法设计在线评测系统 OnlineJudge</h2>
                    <p class=txt_brief>从现在开始，你的大学生活将是如此的不同。巨大的脑洞，丰富的题库，全面的测试用例，全新的视野，这一切，都让你的 ACMer 生活更加精彩。</div>
            </div>

            <div class="page page_2"><span class="page_bg scale_box"></span>
                <div class=img_box><img src="" alt=""></div>
                <div class="txt_box scale_box">
                    <h2>欢迎加入ACM实验室</h2>
                    <p class=txt_brief>ACM不是为了一场比赛而存在的，而是为了团队的整体提高。</div>
            </div>

            <div class="page page_3"><span class="page_bg scale_box"></span>
                <div class=img_box><img src="" alt=""></div>
                <div class="txt_box scale_box">
                    <h2>OJ 也要酷一点</h2>
                     <p class=txt_brief>这是你们自己的 OJ，你有任何酷酷的想法，尽管写在讨论区，我们将共同为努力，搭建最舒适家园。为酷酷的青春、酷酷的梦想、干杯。</div>
                </div>
                <div class="page page_4"><span class="page_bg scale_box"></span>
                    <div class=img_box><img src="" alt=""></div>
                    <div class="light_wp scale_box"><span class=light_box><i class=light_1></i> <i class=light_2></i> <i class=light_3></i> <i class=light_4></i> <i class=light_5></i></span></div><span class="meteor_box scale_box"></span>
                    <div class="txt_box scale_box">
                        <h2>还有另一个自己在这里等你</h2>
                        <p class=txt_brief>也许另一个人也和你一样，发现着自己的创新和诚心。</p>
                    </div>
                </div>
            </div>

            <div class="star_wp scale_box" id=star_wp><span class=star_bg></span> <span class=star_box></span></div><canvas id=canvas></canvas>
            <div class="btns_wp scale_box">

                <?php if (!isset($_SESSION[$OJ_NAME.'_'.'user_id'])){?>
                    <a class="btn_download JS-btn-download" href='<?php echo $path_fix?>loginpage.php'>登录</a>
                <?php }?>

                <?php if (isset($_SESSION[$OJ_NAME.'_'.'user_id'])){?>
                    <a class="btn_download JS-btn-download" href='<?php echo $path_fix?>problemset.php'>开始练习</a>
                <?php }?>
            </div>


            <div class=btn_control id=btn_control>
                <a href=javascript:; class=cur></a>
                <a href=javascript:;></a>
                <a href=javascript:;></a>
                <a href=javascript:;></a>
            </div>
            <div class=footer>
                <div class=foot>
                    <p>© 2018-<?php echo date('Y')?> <?php echo $OJ_NAME?> 版权所有&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        Powered by <a href="https://github.com/zhblue/hustoj" style="text-decoration: none; color: #666666;" target="_blank">HUSTOJ</a>
                        <?php if(isset($OJ_BEIAN) && $OJ_BEIAN){ ?>
                        &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <a href="https://beian.miit.gov.cn/" style="text-decoration: none; color: #444444;" target="_blank"><?php echo $OJ_BEIAN?></a>
                        <?php } ?>
                    </p>
                </div>
            </div>
        </div>
    </div>

</body>
</html>
<script src="<?php echo $cur_path?>js/vendors.js"></script>
<script src="<?php echo $cur_path?>js/index.js"></script>

