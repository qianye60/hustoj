
<?php $show_title="$MSG_SUBMIT - $OJ_NAME"; ?>
<?php include("template/$OJ_TEMPLATE/header.php");?>

<style>
* { box-sizing: border-box; }

.submit-wrap {
    width: 100%;
    max-width: 100%;
    margin: 0;
    padding: 15px;
    height: calc(100vh - 50px);
    display: flex;
    overflow: hidden;
}

#frmSolution {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
    height: 100%;
    width: 100%;
    max-width: 100%;
    overflow: hidden;
}

.submit-box {
    background: #fff;
    border-radius: 6px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.1);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
    height: 100%;
    width: 100%;
    max-width: 100%;
}

.submit-header {
    padding: 10px 15px;
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 8px;
    flex-shrink: 0;
}

.submit-header h3 {
    margin: 0;
    font-size: 16px;
    color: #333;
}

.submit-toolbar {
    padding: 8px 15px;
    background: #f9f9f9;
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    flex-shrink: 0;
}

.toolbar-sep {
    width: 1px;
    height: 20px;
    background: #ddd;
    margin: 0 5px;
}

.code-area {
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
    width: 100%;
    max-width: 100%;
    overflow: hidden;
}

#source {
    width: 100%;
    flex: 1;
    height: auto;
    min-height: 240px;
    padding: 15px;
    border: none;
    font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
    font-size: 17px;
    line-height: 1.5;
    resize: vertical;
    background: #282a36;
    color: #f8f8f2;
    outline: none;
}

.CodeMirror {
    flex: 1;
    height: 100% !important;
    min-height: 240px;
    font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
    font-size: 17px;
    border: none;
    width: 100% !important;
    max-width: 100% !important;
}

/* CodeMirror内部滚动 */
.CodeMirror-scroll {
    overflow: auto !important;
}

.CodeMirror-sizer {
    max-width: 100% !important;
}

.CodeMirror ~ #source {
    display: none;
}

.code-status {
    padding: 8px 15px;
    background: #282a36;
    color: #888;
    font-size: 12px;
    font-family: monospace;
    display: flex;
    justify-content: space-between;
}

.code-status.light-theme {
    background: #f5f5f5;
    color: #666;
}

.test-area {
    padding: 10px 15px;
    background: #f9f9f9;
    border-top: 1px solid #eee;
    display: grid;
    grid-template-columns: 1fr 1fr auto;
    gap: 10px;
    flex-shrink: 0;
}

@media (max-width: 700px) {
    .test-area { grid-template-columns: 1fr; }
}

.io-box {
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 6px;
}

.io-box-title {
    padding: 8px 12px;
    background: #f5f5f5;
    border-bottom: 1px solid #ddd;
    font-size: 13px;
    font-weight: 500;
}

.io-box textarea {
    width: 100%;
    height: 60px;
    padding: 8px;
    border: none;
    font-family: monospace;
    font-size: 13px;
    resize: none;
}

/* 按钮 */
.btn {
    padding: 8px 16px;
    border-radius: 5px;
    border: 1px solid #ddd;
    background: #fff;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s;
}

.btn:hover { background: #f5f5f5; }

.btn-sm {
    padding: 6px 12px;
    font-size: 13px;
}

.btn-sm i, .btn-sm svg {
    width: 16px;
    height: 16px;
}

.btn-primary {
    background: #4a90d9;
    color: #fff;
    border-color: #4a90d9;
}

.btn-primary:hover { background: #3a7bc8; }

.btn-success {
    background: #5cb85c;
    color: #fff;
    border-color: #5cb85c;
}

.btn-success:hover { background: #4cae4c; }

.btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

/* 选择框 */
.form-select {
    padding: 8px 30px 8px 12px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 14px;
    background: #fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24'%3E%3Cpath fill='%23666' d='m7 10 5 5 5-5z'/%3E%3C/svg%3E") no-repeat right 8px center;
    cursor: pointer;
}

.form-input {
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 14px;
}

.vcode-img {
    height: 32px;
    border-radius: 4px;
    cursor: pointer;
    vertical-align: middle;
}

.status-tag {
    padding: 4px 10px;
    background: #f0f0f0;
    border-radius: 4px;
    font-size: 13px;
    color: #666;
}

.file-upload {
    padding: 10px 15px;
    border-bottom: 1px solid #eee;
    flex-shrink: 0;
}

/* AC 弹窗样式 */
.ac-popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.6);
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 99999;
}
.ac-popup {
    text-align: center;
    animation: acPopIn 0.3s ease;
}
.ac-popup img {
    max-width: 300px;
    border-radius: 10px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.3);
}
@keyframes acPopIn {
    from { transform: scale(0.5); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
}
</style>

<!-- CodeMirror 5 -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/codemirror.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/theme/dracula.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/theme/eclipse.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/codemirror.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/mode/clike/clike.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/mode/python/python.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/mode/javascript/javascript.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/mode/sql/sql.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/mode/go/go.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/addon/edit/matchbrackets.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/addon/edit/closebrackets.min.js"></script>

<script src="https://unpkg.com/lucide@latest"></script>
<script src="<?php echo $OJ_CDN_URL?>include/checksource.js"></script>

<div class="submit-wrap">
<form id="frmSolution" action="submit.php<?php if (isset($_GET['spa'])) echo "?spa" ?>" method="post" onsubmit="do_submit()" enctype="multipart/form-data">

<div class="submit-box">
    <div class="submit-header">
        <h3>
            <?php if (isset($id)){ ?>
                Problem <strong><?php echo $id?></strong>
                <input id="problem_id" type="hidden" value="<?php echo $id?>" name="id">
            <?php }else{ ?>
                Problem <strong><?php echo chr($pid+ord('A'))?></strong> - Contest <?php echo $cid?>
                <input id="cid" type="hidden" value="<?php echo $cid?>" name="cid">
                <input id="pid" type="hidden" value="<?php echo $pid?>" name="pid">
            <?php }?>
        </h3>
        <div>
            <span id="result" class="status-tag"><?php echo $MSG_STATUS?></span>
            <label id="countDown" style="display:none;margin-left:10px;color:#e67e22;"></label>
        </div>
    </div>

    <div class="submit-toolbar">
        <select id="language" name="language" class="form-select" onchange="reloadtemplate(this.value);">
        <?php
        $lang_count=count($language_ext);
        $langmask = isset($_GET['langmask']) ? $_GET['langmask'] : $OJ_LANGMASK;
        $langmask |= $OJ_LANGMASK;
        $lang = (~((int)$langmask)) & ((1<<($lang_count))-1);
        for($i=0; $i<$lang_count; $i++){
            if($lang & (1<<$i))
                echo "<option value='$i' ".($lastlang==$i?"selected":"").">".$language_name[$i]."</option>";
        }
        ?>
        </select>

        <?php if($OJ_VCODE){ ?>
        <span class="toolbar-sep"></span>
        <input name="vcode" class="form-input" style="width:70px;" type="text" autocomplete="off" placeholder="验证码">
        <img id="vcode" class="vcode-img" src="vcode.php" onclick="this.src='vcode.php?'+Math.random()">
        <?php }?>

        <span class="toolbar-sep"></span>
        <button type="button" class="btn btn-sm" onclick="toggleTheme()" title="切换主题"><i data-lucide="sun-moon"></i></button>
        <button type="button" class="btn btn-sm" onclick="increaseFontSize()" title="放大"><i data-lucide="zoom-in"></i></button>
        <button type="button" class="btn btn-sm" onclick="decreaseFontSize()" title="缩小"><i data-lucide="zoom-out"></i></button>

        <div style="flex:1;"></div>

        <?php if (isset($_SESSION[$OJ_NAME.'_administrator'])){ ?>
        <button class="btn btn-sm" type="button" onclick="ai_gen('Main.c');" id="ai_bt">AI</button>
        <?php }?>

        <?php if (isset($OJ_ENCODE_SUBMIT) && $OJ_ENCODE_SUBMIT){ ?>
        <button class="btn btn-sm" type="button" onclick="encoded_submit();">编码提交</button>
        <input type="hidden" id="encoded_submit_mark" name="reverse2" value="reverse"/>
        <?php }?>

        <button id="Submit" type="button" class="btn btn-primary" onclick="do_submit();"><?php echo $MSG_SUBMIT?></button>
    </div>

    <?php if (!isset($_GET['spa']) || $solution_name) { ?>
    <div class="file-upload">
        <input type="file" name="answer">
    </div>
    <?php } ?>

    <?php if(!$solution_name){ ?>
    <div class="code-area">
        <textarea id="source" name="source" spellcheck="false"><?php echo htmlentities($view_src,ENT_QUOTES,"UTF-8")?></textarea>
        <div id="code-status" class="code-status">
            <span id="line-info">行: 1, 列: 1</span>
            <span id="char-count">0 字符</span>
        </div>
    </div>
    <?php }else{
        echo "<div style='padding:40px;text-align:center;'><h3>指定上传文件：<span style='color:red;'>$solution_name</span></h3></div>";
    } ?>

    <?php if (isset($OJ_TEST_RUN) && $OJ_TEST_RUN && $spj<=1 && !$solution_name){ ?>
    <div class="test-area">
        <div class="io-box">
            <div class="io-box-title"><?php echo $MSG_Input?></div>
            <textarea id="input_text" name="input_text"><?php echo $view_sample_input?></textarea>
        </div>
        <div class="io-box">
            <div class="io-box-title" style="display:flex;justify-content:space-between;">
                <span><?php echo $MSG_Output?></span>
                <span id="result2" class="status-tag"><?php echo $MSG_STATUS?></span>
            </div>
            <textarea id="out" name="out" disabled placeholder="<?php echo htmlentities($view_sample_output,ENT_QUOTES,'UTF-8')?>"></textarea>
        </div>
        <button id="TestRun" class="btn btn-success" type="button" onclick="do_test_run();" style="align-self:stretch;">
            ▶ <?php echo $MSG_TR?>
        </button>
    </div>
    <?php }?>
</div>

<input type="hidden" value="0" id="problem_id" name="problem_id"/>
</form>
</div>

<!-- AC 弹窗 -->
<div id="acPopup" class="ac-popup-overlay" onclick="hideAcPopup()">
    <div class="ac-popup">
        <img src="image/ac.png" alt="AC">
    </div>
</div>

<script src="<?php echo $OJ_CDN_URL?>include/base64.js"></script>
<script>
// AC 弹窗函数
function showAcPopup() {
    var popup = document.getElementById('acPopup');
    popup.style.display = 'flex';
    setTimeout(hideAcPopup, 3000); // 3秒后自动关闭
}
function hideAcPopup() {
    document.getElementById('acPopup').style.display = 'none';
}

var currentFontSize = 17;
var isDarkTheme = true;
var count = 0;
var handler_interval;
var _lastlang = <?php echo isset($lastlang) ? intval($lastlang) : 0; ?>;
var _userKey = <?php echo json_encode(isset($_SESSION[$OJ_NAME.'_user_id']) ? $_SESSION[$OJ_NAME.'_user_id'] : 'guest'); ?>;
var judge_result = [<?php foreach($judge_result as $r){ echo "'$r',"; } ?>''];

var editor = null;
var langModes = ['text/x-csrc','text/x-c++src','text/x-pascal','text/x-java','text/x-ruby','text/x-sh','text/x-python','text/x-php','text/x-perl','text/x-csharp','text/x-objectivec','text/x-vb','text/x-scheme','text/x-csrc','text/x-c++src','text/x-lua','text/javascript','text/x-go','text/x-sql','text/x-fortran','text/x-octave','text/x-cobol','text/x-rsrc','text/x-csrc','text/x-python'];

// 主题切换
function toggleTheme() {
    if (!editor) return;
    var status = document.getElementById('code-status');
    isDarkTheme = !isDarkTheme;
    if (isDarkTheme) {
        editor.setOption('theme', 'dracula');
        status.classList.remove('light-theme');
    } else {
        editor.setOption('theme', 'eclipse');
        status.classList.add('light-theme');
    }
}

function applyEditorFontSize() {
    if (!editor) return;
    var wrapper = (typeof editor.getWrapperElement === 'function') ? editor.getWrapperElement() : null;
    if (!wrapper) wrapper = document.querySelector('.CodeMirror');
    if (wrapper) wrapper.style.fontSize = currentFontSize + 'px';
    editor.refresh();
}

// 放大字体
function increaseFontSize() {
    if (!editor) return;
    currentFontSize = Math.min(28, currentFontSize + 2);
    applyEditorFontSize();
    console.log('Font size:', currentFontSize);
}

// 缩小字体
function decreaseFontSize() {
    if (!editor) return;
    currentFontSize = Math.max(12, currentFontSize - 2);
    applyEditorFontSize();
    console.log('Font size:', currentFontSize);
}

// 更新状态栏
function updateStatus() {
    if (!editor) return;
    var text = editor.getValue();
    document.getElementById('char-count').textContent = text.length + ' 字符';
    var cursor = editor.getCursor();
    document.getElementById('line-info').textContent = '行: ' + (cursor.line + 1) + ', 列: ' + (cursor.ch + 1);
}

// 切换语言
function switchLang(lang) {
    if (!editor) return;
    var mode = langModes[lang] || 'text/x-csrc';
    editor.setOption('mode', mode);
}

// 切换语言
function reloadtemplate(lang) {
    if (lang == undefined) return;
    document.cookie = "lastlang=" + lang;
    if (lang != _lastlang) {
        location.reload();
    }
}
</script>

<script>
// 刷新结果
function fresh_result(solution_id) {
    var tb = document.getElementById('result');
    if (solution_id == undefined) {
        tb.innerHTML = "Vcode Error!";
        if ($("#vcode").length) $("#vcode").click();
        return;
    }
    var sid = parseInt(solution_id);
    if (sid <= 0) {
        tb.innerHTML = <?php echo json_encode(str_replace("10", isset($OJ_SUBMIT_COOLDOWN_TIME)?$OJ_SUBMIT_COOLDOWN_TIME:'10', isset($MSG_BREAK_TIME)?$MSG_BREAK_TIME:'')); ?>;
        if ($("#vcode").length) $("#vcode").click();
        return;
    }
    $.get("status-ajax.php?solution_id=" + solution_id, function(r) {
        var ra = r.split(",");
        window.myVariable = ra[0];
        var loader = "<img width=18 src=image/loader.gif>";
        var tag = (ra[0] < 4) ? "span" : "a";
        if (ra[0] == 11 || ra[0] > 15)
            tb.innerHTML = "<" + tag + " href='ceinfo.php?sid=" + solution_id + "' target=_blank>" + judge_result[ra[0]] + "</" + tag + ">";
        else
            tb.innerHTML = "<" + tag + " href='reinfo.php?sid=" + solution_id + "' target=_blank>" + judge_result[ra[0]] + " AC:" + ra[4] + "</" + tag + ">";
        if (ra[0] < 4 || ra[0] > 15) tb.innerHTML += loader;
        tb.innerHTML += " Memory:" + ra[1] + " Time:" + ra[2];
        if (ra[0] < 4 || ra[0] > 15)
            setTimeout(function() { fresh_result(solution_id); }, 2000);
        else {
            // AC 音效和图片弹窗 (ra[0] == 4 表示 Accepted)
            if (ra[0] == 4) {
                var audio = new Audio('sound/ac.wav');
                audio.play().catch(function(e) { console.log('音效播放失败:', e); });
                showAcPopup();
            }
            setTimeout(function() { print_result(solution_id); }, 2000);
            count = 1;
        }
    });
}

function print_result(solution_id) {
    $.ajax({
        url: "status-ajax.php",
        type: "GET",
        data: { tr: 1, solution_id: solution_id },
        success: function(data) { $("#out").val(data); }
    });
}

// 提交
function do_submit() {
    if (editor) editor.save(); // 同步到 textarea
    $("#Submit").attr("disabled", "true");
    var mark = "<?php echo isset($id) ? 'problem_id' : 'cid'; ?>";
    var problem_id = document.getElementById(mark);
    problem_id.value = '<?php echo isset($id) ? $id : (isset($cid) ? $cid : ''); ?>';
    document.getElementById("frmSolution").target = "_self";
<?php if(isset($_GET['spa'])){ ?>
    <?php if($solution_name) { ?>document.getElementById("frmSolution").submit();<?php } ?>
    $.post("submit.php?ajax", $("#frmSolution").serialize(), function(data) { fresh_result(data); });
    $("#Submit").prop('disabled', true);
    $("#TestRun").prop('disabled', true);
    count = <?php echo isset($OJ_SUBMIT_COOLDOWN_TIME) ? $OJ_SUBMIT_COOLDOWN_TIME : 5; ?> * 2;
    handler_interval = setTimeout(resume, 1000);
<?php } else { ?>
    document.getElementById("frmSolution").submit();
<?php } ?>
}

// 测试运行
function do_test_run() {
    if (editor) editor.save(); // 同步到 textarea
    if (handler_interval) clearInterval(handler_interval);
    var tb = document.getElementById('result');
    var source = editor ? editor.getValue() : $("#source").val();
    if (source.length < 10) return alert("too short!");
    if (tb) tb.innerHTML = "<img width=18 src=image/loader.gif>";

    var mark = "<?php echo isset($id) ? 'problem_id' : 'cid'; ?>";
    var problem_id = document.getElementById(mark);
    problem_id.value = -problem_id.value;
    $.post("submit.php?ajax", $("#frmSolution").serialize(), function(data) { fresh_result(data); });
    $("#Submit").prop('disabled', true);
    $("#TestRun").prop('disabled', true);
    problem_id.value = -problem_id.value;
    count = <?php echo isset($OJ_SUBMIT_COOLDOWN_TIME) ? $OJ_SUBMIT_COOLDOWN_TIME : 5; ?> * 2;
    handler_interval = setTimeout(resume, 1000);
}

// 恢复按钮
function resume() {
    count--;
    if (count < 0) {
        $("#Submit").attr("disabled", false);
        $("#TestRun").attr("disabled", false);
        if (handler_interval) clearInterval(handler_interval);
        if ($("#vcode").length) $("#vcode").click();
    } else {
        $("#Submit").val("<?php echo isset($MSG_SUBMIT)?$MSG_SUBMIT:'Submit'; ?>(" + count + ")");
        $("#TestRun").val("<?php echo isset($MSG_TR)?$MSG_TR:'Test'; ?>(" + count + ")");
        setTimeout(resume, 1000);
    }
}

// 编码提交
function encoded_submit() {
    if (editor) editor.save();
    var mark = "<?php echo isset($id) ? 'problem_id' : 'cid'; ?>";
    var problem_id = document.getElementById(mark);
    problem_id.value = '<?php echo isset($id) ? $id : (isset($cid) ? $cid : ''); ?>';
    document.getElementById("frmSolution").target = "_self";
    document.getElementById("encoded_submit_mark").name = "encoded_submit";
    var source = editor ? editor.getValue() : $("#source").val();
    $("#source").val(encode64(utf16to8(source)));
    document.getElementById("frmSolution").submit();
}

// AI 生成
function ai_gen(filename) {
    $('#ai_bt').text('AI...').prop('disabled', true);
    $.ajax({
        url: '<?php echo isset($OJ_AI_API_URL) ? $OJ_AI_API_URL : ''; ?>',
        type: 'GET',
        data: { pid: '<?php echo isset($id) ? $id : ''; ?>', filename: filename },
        success: function(data) {
            var code = data.replace(/^```\w*\n?/, '').replace(/\n?```$/, '');
            if (editor) {
                editor.setValue(code);
            } else {
                $("#source").val(code);
            }
            updateStatus();
            $('#ai_bt').prop('disabled', false).text('AI');
        },
        error: function() {
            $('#ai_bt').text('失败').prop('disabled', false);
        }
    });
}

// 自动保存
function autoSave() {
    if (localStorage && editor) {
        var key = _userKey + "source:" + location.href;
        localStorage.setItem(key, editor.getValue());
    }
}

// 页面初始化
$(document).ready(function() {
    // 初始化 lucide 图标
    if (typeof lucide !== 'undefined') lucide.createIcons();

    var src = document.getElementById('source');
    if (src && typeof CodeMirror !== 'undefined') {
        // 初始化 CodeMirror
        editor = CodeMirror.fromTextArea(src, {
            lineNumbers: true,
            theme: 'dracula',
            mode: langModes[_lastlang] || 'text/x-csrc',
            matchBrackets: true,
            autoCloseBrackets: true,
            indentUnit: 4,
            tabSize: 4,
            indentWithTabs: true,
            lineWrapping: false,
            scrollbarStyle: 'native'
        });

        // 监听变化更新状态栏
        editor.on('cursorActivity', updateStatus);
        editor.on('change', updateStatus);
        updateStatus();
        applyEditorFontSize();

        // 加载保存的代码
        if (localStorage) {
            var key = _userKey + "source:" + location.href;
            var saved = localStorage.getItem(key);
            if (saved && saved.length > editor.getValue().length) {
                editor.setValue(saved);
            }
        }

        // 自动保存
        setInterval(autoSave, 5000);

        editor.refresh();
    }

    // 刷新验证码
    if ($("#vcode").length) $("#vcode").click();
});
</script>

</body>
</html>
