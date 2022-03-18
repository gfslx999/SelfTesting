const monthList = [
    { "enMonth": "January", "chMonth": "一月" },
    { "enMonth": "February", "chMonth": "二月" },
    { "enMonth": "March", "chMonth": "三月" },
    { "enMonth": "April", "chMonth": "四月" },
    { "enMonth": "May", "chMonth": "五月" },
    { "enMonth": "June", "chMonth": "六月" },
    { "enMonth": "July", "chMonth": "七月" },
    { "enMonth": "August", "chMonth": "八月" },
    { "enMonth": "September", "chMonth": "九月" },
    { "enMonth": "October", "chMonth": "十月" },
    { "enMonth": "November", "chMonth": "十一月" },
    { "enMonth": "December", "chMonth": "十二月" },
];
var currentMonth;

init();

//初始化
function init() {
    onRandomTopic();

    setTimeout("hideHintWidget()", "3000");
}

// 获取随机一个中文月份
function getRandomChMonth() {
    let index = Math.floor(Math.random() * monthList.length);
    //如果抽取的和之前的一致，则重新抽取
    if (typeof currentMonth != "undefined" && monthList[index].chMonth == currentMonth.chMonth) {
        return getRandomChMonth();
    }
    currentMonth = monthList[index];
    return currentMonth.chMonth;
}

// 抽取题目点击事件
function onRandomTopic() {
    document.getElementById("pTestMonth").innerHTML = "题目月份：" + getRandomChMonth();

    clearAnswerAndResult();
}

// 提交答案点击事件
function onSubmitAnswer() {
    var answer = document.getElementById("textAreaUserAnswer").value;
    if (typeof currentMonth == "undefined") {
        window.alert("请先抽取题目");
        return;
    }
    if (answer == "") {
        window.alert("答案不可为空");
        clearAnswerAndResult();
        return;
    }
    var resultWidget = document.getElementById("pResult");
    if (answer == currentMonth.enMonth) {
        resultWidget.style.color = "#00FF00";
        resultWidget.innerHTML = "结果：恭喜你，回答正确！";

        //成功后延迟一秒抽取新题
        setTimeout("onRandomTopic()", "1000");
    } else {
        resultWidget.style.color = "#FF0000";
        resultWidget.innerHTML = "结果：很遗憾，回答失败。";
    }
}

// 处理答案框回车事件
function handleEnterKeyEvent(keyCode) {
    if (keyCode == 13) {
        onSubmitAnswer();
        return false;
    }
    return true;
}

// 清空答题内容和结果
function clearAnswerAndResult() {
    document.getElementById("pResult").innerHTML = "";
    document.getElementById("textAreaUserAnswer").value = "";
}

function hideHintWidget() {
    document.getElementById("emHintAutoChange").style.display = "none";
    document.getElementById("emHintEnterSubmit").style.display = "none";
}