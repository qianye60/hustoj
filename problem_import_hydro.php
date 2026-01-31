<?php
require_once ("admin-header.php");
require_once("../include/check_post_key.php");

if (!(isset($_SESSION[$OJ_NAME.'_'.'administrator'])||isset($_SESSION[$OJ_NAME.'_problem_importer'])  )) {
  echo "<a href='../loginpage.php'>Please Login First!</a>";
  exit(1);
}

if (isset($OJ_LANG)) {
  require_once("../lang/$OJ_LANG.php");
}

require_once ("../include/const.inc.php");
require_once ("../include/problem.php");

function replaceLT($string) {
    $pattern = '/(\$.*?)(<)(.*?\$)/';
    $replacement = '$1 \\lt $3';
    $ret= preg_replace($pattern, $replacement, $string);
    if (strlen($string)==strlen($ret))
        return $ret;
    else
        return preg_replace($pattern, $replacement, $ret);
}

?>

<?php
?>

<hr>
&nbsp;&nbsp;- Import Problem ... <br>
&nbsp;&nbsp;- 如果导入失败，请参考 <a href="https://github.com/zhblue/hustoj/blob/master/wiki/FAQ.md#%E5%90%8E%E5%8F%B0%E5%AF%BC%E5%85%A5%E9%97%AE%E9%A2%98%E5%A4%B1%E8%B4%A5" target="_blank">FAQ</a>。
<br><br>

<?php
function startsWith( $haystack, $needle ) {
     $length = strlen( $needle );
     return substr( $haystack, 0, $length ) === $needle;
}
function endsWith( $haystack, $needle ) {
    $length = strlen( $needle );
    if( !$length ) {
        return true;
    }
    return substr( $haystack, -$length ) === $needle;
}
function strip($Node, $TagName) {
  $len=mb_strlen($TagName);
  $i=mb_strpos($Node,"<".$TagName.">");
  $j=mb_strpos($Node,"</".$TagName.">");

  return mb_substr($Node,$i+$len+2,$j-($i+$len+2));
}
function get_extension($file) {
  $info = pathinfo($file);
  return $info['extension'];
}

function getAttribute($Node, $TagName,$attribute) {
  return $Node->children()->$TagName->attributes()->$attribute;
}

function hasProblem($title) {
  $md5 = md5($title);
  $sql = "SELECT 1 FROM problem WHERE md5(title)=?";  
  $result = pdo_query($sql, $md5);
  $rows_cnt = count($result);		
  return ($rows_cnt>0);
}

function mkpta($pid,$prepends,$node) {
  $language_ext = $GLOBALS['language_ext'];
  $OJ_DATA = $GLOBALS['OJ_DATA'];

  foreach ($prepends as $prepend) {
    $language = $prepend->attributes()->language;
    $lang = getLang($language);
    $file_ext = $language_ext[$lang];
    $basedir = "$OJ_DATA/$pid";
    $file_name = "$basedir/$node.$file_ext";
    file_put_contents($file_name,$prepend);
  }
}


function import_dir($json) {
  global $OJ_DATA,$OJ_SAE,$OJ_REDIS,$OJ_REDISSERVER,$OJ_REDISPORT,$OJ_REDISQNAME,$domain,$DOMAIN,$_SESSION;
  $qduoj_problem=json_decode($json);
  echo( $qduoj_problem->{'problem'}->{'title'})."<br>";

    $title = $qduoj_problem->{'problem'}->{'title'};

    $time_limit = floatval($qduoj_problem->{'problem'}->{'timeLimit'});
    $unit = "ms";
    
    if ($unit=='ms')
      $time_limit /= 1000;

    $memory_limit =  floatval($qduoj_problem->{'problem'}->{'memoryLimit'});
    $unit = "M";

    if ($unit=='kb')
      $memory_limit /= 1024;

    $description = $qduoj_problem->{'problem'}->{'description'};
    $input = $qduoj_problem->{'problem'}->{'input'};
    $output = $qduoj_problem->{'problem'}->{'output'};
    $sample_input = strip($qduoj_problem->{'problem'}->{'examples'},"input");
    $sample_output = strip($qduoj_problem->{'problem'}->{'examples'},"output");
    $hint = $qduoj_problem->{'problem'}->{'hint'};
    $source = $qduoj_problem->{'problem'}->{'source'};				
    $spj=0;
    
    $pid = addproblem($title, $time_limit, $memory_limit, $description, $input, $output, $sample_input, $sample_output, $hint, $source, $spj, $OJ_DATA);
    return $pid;
}

if ($_FILES["fps"]["error"] > 0) {
    echo "&nbsp;&nbsp;- Error: " . $_FILES["fps"]["error"] . " File size is too big, change in PHP.ini<br />";
} else {
    $tempdir = sys_get_temp_dir() . "/import_hydro" . time();
    mkdir($tempdir);
    $tempfile = $_FILES["fps"]["tmp_name"];

    if (get_extension($_FILES["fps"]["name"]) == "zip") {
        echo "&nbsp;&nbsp;- zip file, only HydroOJ exported file is supported<hr>\n";

        $zip = new ZipArchive();
        if ($zip->open($tempfile) !== TRUE) {
            die("Could not open ZIP archive.");
        }

        $save_path = "";
        $problems_data = []; // 存储每个题目的数据，按目录索引
        $current_dir = "";
        $testdata_dirs = []; // 记录测试数据目录

        for ($index = 0; $index < $zip->numFiles; $index++) {
            $file_name = $zip->getNameIndex($index);
            if ($file_name === false) continue;

            $file_path = dirname($file_name);
            $base_name = basename($file_name);
            $file_content = $zip->getFromIndex($index);
            if ($file_content === false) continue;
            
            // 检查是否是测试数据目录
            if (strpos($file_path, "testdata") !== false) {
                // 找到测试数据所属的题目目录
                $parts = explode('/', $file_path);
                $problem_dir = "";
                foreach ($parts as $part) {
                    if ($part != "testdata" && $part != "." && $part != "") {
                        $problem_dir = $part;
                        break;
                    }
                }
                if ($problem_dir && !in_array($problem_dir, $testdata_dirs)) {
                    $testdata_dirs[] = $problem_dir;
                }
            }
            
            if ($base_name == "problem.yaml") {
                // 新逻辑：按目录存储题目数据
                $dir = dirname($file_name);
                if ($dir == ".") {
                    // 根目录的 problem.yaml，使用文件名作为标识
                    $dir = "problem_" . count($problems_data);
                }
                
                if (!isset($problems_data[$dir])) {
                    $problems_data[$dir] = [
                        'pid' => 0,
                        'title' => '',
                        'description' => '',
                        'input' => '',
                        'output' => '',
                        'sample_input' => '',
                        'sample_output' => '',
                        'hint' => '',
                        'source' => '',
                        'spj' => 0,
                        'time_limit' => 1,
                        'memory_limit' => 128,
                        'type' => 'normal',
                        'inserted' => false,
                        'has_yaml' => false,
                        'has_md' => false,
                        'dir_name' => $dir
                    ];
                }
                
                $hydrop = yaml_parse($file_content);
                $title = isset($hydrop['title']) ? $hydrop['title'] : "Untitled_" . $dir;
                $source = isset($hydrop['tag']) ? implode(" ", $hydrop['tag']) : "";
                
                $problems_data[$dir]['title'] = $title;
                $problems_data[$dir]['source'] = $source;
                $problems_data[$dir]['has_yaml'] = true;
                
                // 设置默认的输入输出文件名
                if (isset($hydrop['filename'])) {
                    $problems_data[$dir]['filename'] = $hydrop['filename'];
                }
                
                // 设置时间限制和内存限制
                if (isset($hydrop['time'])) {
                    $time = $hydrop['time'];
                    if (endsWith($time, "ms")) {
                        $time = substr($time, 0, -2);
                        $time = floatval($time) / 1000;
                    } elseif (endsWith($time, "s")) {
                        $time = substr($time, 0, -1);
                        $time = floatval($time);
                    }
                    $problems_data[$dir]['time_limit'] = floatval($time);
                }
                
                if (isset($hydrop['memory'])) {
                    $memory = $hydrop['memory'];
                    if (endsWith($memory, "kb")) {
                        $memory = substr($memory, 0, -2);
                        $memory = floatval($memory) / 1024;
                    } elseif (endsWith($memory, "mb") || endsWith($memory, "MB")) {
                        $memory = substr($memory, 0, -2);
                    } elseif (endsWith($memory, "m")) {
                        $memory = substr($memory, 0, -1);
                    }
                    $problems_data[$dir]['memory_limit'] = floatval($memory);
                }
                
                echo "<hr>解析题目配置: " . htmlentities($title) . " (目录: $dir)";
            } 
            elseif ($base_name == "problem_zh.md" || $base_name == "problem.md") {
                $dir = dirname($file_name);
                if ($dir == ".") {
                    // 尝试找到对应的题目目录
                    foreach ($testdata_dirs as $test_dir) {
                        if (strpos($file_name, $test_dir) !== false) {
                            $dir = $test_dir;
                            break;
                        }
                    }
                    if ($dir == ".") {
                        $dir = "problem_" . count($problems_data);
                    }
                }
                
                if (!isset($problems_data[$dir])) {
                    $problems_data[$dir] = [
                        'pid' => 0,
                        'title' => 'Untitled_' . $dir,
                        'description' => '',
                        'input' => '',
                        'output' => '',
                        'sample_input' => '',
                        'sample_output' => '',
                        'hint' => '',
                        'source' => '',
                        'spj' => 0,
                        'time_limit' => 1,
                        'memory_limit' => 128,
                        'type' => 'normal',
                        'inserted' => false,
                        'has_yaml' => false,
                        'has_md' => false,
                        'dir_name' => $dir
                    ];
                }
                
                $file_content = replaceLT($file_content);
                
                if ($problems_data[$dir]['type'] == "normal") {
                    $description = "<span class=\"md\">" . $file_content . "</span>";
                } else {
                    $description = "<span class=\"md auto_select\">" . $file_content . "</span>";
                }
                
                $description = preg_replace('/{{ select\(\d+\) }}/', "", $description);
                
                if ($save_path) {
                    $description = str_replace("file://", $save_path . "/", $description);
                }
                
                $problems_data[$dir]['description'] = $description;
                $problems_data[$dir]['has_md'] = true;
                
                // 如果已经有yaml配置，立即创建题目
                if ($problems_data[$dir]['has_yaml'] && !hasProblem($problems_data[$dir]['title']) && !$problems_data[$dir]['inserted']) {
                    $pid = addproblem(
                        $problems_data[$dir]['title'],
                        $problems_data[$dir]['time_limit'],
                        $problems_data[$dir]['memory_limit'],
                        $problems_data[$dir]['description'],
                        $problems_data[$dir]['input'],
                        $problems_data[$dir]['output'],
                        $problems_data[$dir]['sample_input'],
                        $problems_data[$dir]['sample_output'],
                        $problems_data[$dir]['hint'],
                        $problems_data[$dir]['source'],
                        $problems_data[$dir]['spj'],
                        $OJ_DATA
                    );
                    $problems_data[$dir]['pid'] = $pid;
                    $problems_data[$dir]['inserted'] = true;
                    
                    mkdir($OJ_DATA . "/$pid/");
                    
                    $sql = "INSERT INTO `privilege` (`user_id`,`rightstr`) VALUES(?,?)";
                    pdo_query($sql, $_SESSION[$OJ_NAME . '_' . 'user_id'], "p$pid");
                    $_SESSION[$OJ_NAME . '_' . "p$pid"] = true;
                    
                    echo "<br>创建题目: " . htmlentities($problems_data[$dir]['title']) . " (PID: $pid)";
                }
            }
            elseif ($base_name == "config.yaml") {
                $dir = dirname($file_name);
                if ($dir == ".") {
                    foreach ($testdata_dirs as $test_dir) {
                        if (strpos($file_name, $test_dir) !== false) {
                            $dir = $test_dir;
                            break;
                        }
                    }
                }
                
                if (!isset($problems_data[$dir])) {
                    $problems_data[$dir] = [
                        'pid' => 0,
                        'title' => 'Untitled_' . $dir,
                        'description' => '',
                        'input' => '',
                        'output' => '',
                        'sample_input' => '',
                        'sample_output' => '',
                        'hint' => '',
                        'source' => '',
                        'spj' => 0,
                        'time_limit' => 1,
                        'memory_limit' => 128,
                        'type' => 'normal',
                        'inserted' => false,
                        'has_yaml' => false,
                        'has_md' => false,
                        'dir_name' => $dir
                    ];
                }
                
                $hydrop = yaml_parse($file_content);
                
                if (isset($hydrop['type']) && $hydrop['type'] == "objective") {
                    $problems_data[$dir]['type'] = "objective";
                    echo $type . ":dump answers";
                    $ansi = 1;
                    $out = "";
                    while (!empty($hydrop['answers'][$ansi])) {
                        $out .= $ansi . " [" . $hydrop['answers'][$ansi][1] . "] ";
                        $out .= $hydrop['answers'][$ansi][0] . "\n";
                        $ansi++;
                    }

                    if ($problems_data[$dir]['pid'] > 0) {
                        $pid = $problems_data[$dir]['pid'];
                        file_put_contents($OJ_DATA . "/$pid/data.out", $out);
                        file_put_contents($OJ_DATA . "/$pid/data.in", ($ansi - 1) . "\n");
                    }

                    $template = "";
                    for ($k = 1; $k < $ansi; $k++) {
                        $template .= $k . "\n";
                    }
                    if ($problems_data[$dir]['pid'] > 0) {
                        $pid = $problems_data[$dir]['pid'];
                        file_put_contents($OJ_DATA . "/$pid/template.c", $template);
                        pdo_query("UPDATE problem SET spj=2, description=REPLACE(description,'<span class=\"md\">','<span class=\"md auto_select\">') WHERE problem_id=?", $pid);
                    }
                } else {
                    if (isset($hydrop['time'])) {
                        $time = $hydrop['time'];
                        if (endsWith($time, "ms")) {
                            $time = substr($time, 0, -2);
                            $time = floatval($time) / 1000;
                        } elseif (endsWith($time, "s")) {
                            $time = substr($time, 0, -1);
                            $time = floatval($time);
                        }
                        $problems_data[$dir]['time_limit'] = floatval($time);
                    }
                    
                    if (isset($hydrop['memory'])) {
                        $memory = $hydrop['memory'];
                        if (endsWith($memory, "kb")) {
                            $memory = substr($memory, 0, -2);
                            $memory = floatval($memory) / 1024;
                        } elseif (endsWith($memory, "mb") || endsWith($memory, "MB")) {
                            $memory = substr($memory, 0, -2);
                        } elseif (endsWith($memory, "m")) {
                            $memory = substr($memory, 0, -1);
                        }
                        $problems_data[$dir]['memory_limit'] = floatval($memory);
                    }
                    
                    if (isset($hydrop['filename'])) {
                        $problems_data[$dir]['filename'] = $hydrop['filename'];
                    }

                    // 设置输入输出文件名
                    if (isset($problems_data[$dir]['pid']) && $problems_data[$dir]['pid'] != "" && isset($hydrop['filename']) && $hydrop['filename'] != "") {
                        $pid = $problems_data[$dir]['pid'];
                        file_put_contents($OJ_DATA . "/$pid/input.name", $hydrop['filename'] . ".in\n");
                        file_put_contents($OJ_DATA . "/$pid/output.name", $hydrop['filename'] . ".out\n");
                    }

                    // 更新数据库中的时间限制和内存限制
                    if (isset($hydrop['time']) && $hydrop['time'] > 0 && isset($problems_data[$dir]['pid']) && $problems_data[$dir]['pid'] > 0) {
                        $pid = $problems_data[$dir]['pid'];
                        pdo_query("UPDATE problem SET time_limit=?, memory_limit=? WHERE problem_id=?", 
                                  $problems_data[$dir]['time_limit'], 
                                  $problems_data[$dir]['memory_limit'], 
                                  $pid);
                    }
                }
            }
            elseif (strpos($file_path, "testdata") !== false && $base_name != "testdata") {
                // 找出测试数据属于哪个题目
                $parts = explode('/', $file_path);
                $problem_dir = "";
                foreach ($parts as $part) {
                    if ($part != "testdata" && $part != "." && $part != "") {
                        $problem_dir = $part;
                        break;
                    }
                }
                
                if ($problem_dir && isset($problems_data[$problem_dir]) && $problems_data[$problem_dir]['inserted']) {
                    $pid = $problems_data[$problem_dir]['pid'];
                    $dataname = $base_name;

                    // 使用原逻辑处理文件名
                    if (endsWith($dataname, ".txt")) {
                        $dataname = preg_replace('/input([0-9]*).txt/i', '\\1.in', $dataname);
                        $dataname = preg_replace('/output([0-9]*).txt/i', '\\1.out', $dataname);
                    } elseif (endsWith($dataname, "put")) {
                        $dataname = substr($dataname, 0, -3);
                    } elseif (endsWith($dataname, ".ans")) {
                        $dataname = substr($dataname, 0, -3) . "out";
                    } elseif (endsWith($dataname, ".in")) {
                        $dataname = substr($dataname, 0, -2) . "in";
                    } elseif (endsWith($dataname, ".out")) {
                        $dataname = substr($dataname, 0, -3) . "out";
                    }

                    // 直接写入测试数据
                    $target_file = $OJ_DATA . "/$pid/" . $dataname;
                    file_put_contents($target_file, $file_content);
                    
                    // 更新文件名配置
                    if (isset($problems_data[$problem_dir]['filename']) && !file_exists($OJ_DATA . "/$pid/input.name")) {
                        $filename = $problems_data[$problem_dir]['filename'];
                        file_put_contents($OJ_DATA . "/$pid/input.name", $filename . ".in\n");
                        file_put_contents($OJ_DATA . "/$pid/output.name", $filename . ".out\n");
                    }
                    
                    echo ".";
                }
            }
            elseif (strpos($file_path, "additional_file") !== false && $base_name != "additional_file") {
                $ext = strtolower(get_extension($base_name));

                if (!stristr(",jpeg,jpg,svg,png,gif,bmp,xlsx,xls,doc,docx", $ext)) {
                    continue;
                }

                $new_file_name = $base_name;
                $newpath = $save_path . "/" . $new_file_name;

                if ($OJ_SAE) {
                    $newpath = "saestor://web" . $newpath;
                } else {
                    $newpath = ".." . $newpath;
                }

                if (!file_exists(dirname($newpath))) {
                    mkdir(dirname($newpath), 0750, true);
                }

                file_put_contents($newpath, $file_content);
            }
        }

        $zip->close();
        
        // 处理所有已解析但未创建的题目
        foreach ($problems_data as $dir => $problem) {
            if (!$problem['inserted'] && $problem['has_md'] && !hasProblem($problem['title'])) {
                $pid = addproblem(
                    $problem['title'],
                    $problem['time_limit'],
                    $problem['memory_limit'],
                    $problem['description'],
                    $problem['input'],
                    $problem['output'],
                    $problem['sample_input'],
                    $problem['sample_output'],
                    $problem['hint'],
                    $problem['source'],
                    $problem['spj'],
                    $OJ_DATA
                );
                $problems_data[$dir]['pid'] = $pid;
                $problems_data[$dir]['inserted'] = true;
                
                mkdir($OJ_DATA . "/$pid/");
                
                // 设置输入输出文件名
                if (isset($problem['filename']) && $problem['filename'] != "") {
                    file_put_contents($OJ_DATA . "/$pid/input.name", $problem['filename'] . ".in\n");
                    file_put_contents($OJ_DATA . "/$pid/output.name", $problem['filename'] . ".out\n");
                }
                
                $sql = "INSERT INTO `privilege` (`user_id`,`rightstr`) VALUES(?,?)";
                pdo_query($sql, $_SESSION[$OJ_NAME . '_' . 'user_id'], "p$pid");
                $_SESSION[$OJ_NAME . '_' . "p$pid"] = true;
                
                echo "<hr>创建题目: " . htmlentities($problem['title']) . " (PID: $pid)";
                
                // 重新扫描测试数据文件，为刚刚创建的题目导入测试数据
                $zip->open($tempfile);
                for ($index = 0; $index < $zip->numFiles; $index++) {
                    $file_name = $zip->getNameIndex($index);
                    if ($file_name === false) continue;
                    
                    $file_path = dirname($file_name);
                    $base_name = basename($file_name);
                    $file_content = $zip->getFromIndex($index);
                    if ($file_content === false) continue;
                    
                    // 检查是否是该题目的测试数据
                    if (strpos($file_path, "testdata") !== false && strpos($file_path, $dir) !== false && $base_name != "testdata") {
                        $dataname = $base_name;
                        
                        // 使用原逻辑处理文件名
                        if (endsWith($dataname, ".txt")) {
                            $dataname = preg_replace('/input([0-9]*).txt/i', '\\1.in', $dataname);
                            $dataname = preg_replace('/output([0-9]*).txt/i', '\\1.out', $dataname);
                        } elseif (endsWith($dataname, "put")) {
                            $dataname = substr($dataname, 0, -3);
                        } elseif (endsWith($dataname, ".ans")) {
                            $dataname = substr($dataname, 0, -3) . "out";
                        } elseif (endsWith($dataname, ".in")) {
                            $dataname = substr($dataname, 0, -2) . "in";
                        } elseif (endsWith($dataname, ".out")) {
                            $dataname = substr($dataname, 0, -3) . "out";
                        }
                        
                        $target_file = $OJ_DATA . "/$pid/" . $dataname;
                        file_put_contents($target_file, $file_content);
                        echo ".";
                    }
                }
                $zip->close();
            }
        }
        
        unlink($_FILES["fps"]["tmp_name"]);
        rmdir($tempdir);
        
        echo "<hr><br>导入完成！";
    } else {
        echo ($tempfile);
    }
}
?>