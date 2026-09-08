(function () {
  "use strict";

  function resetOne(q) {
    q.classList.remove("answered");
    var opts = q.querySelectorAll(".opt");
    opts.forEach(function (o) {
      o.disabled = false;
      o.classList.remove("selected", "is-correct");
    });
    var fb = q.querySelector(".fb-result");
    if (fb) {
      fb.textContent = "";
      fb.classList.remove("ok", "no");
    }
    var explain = q.querySelector(".explain");
    if (explain) { explain.hidden = true; }
    var answer = q.querySelector(".answer-box");
    if (answer) { answer.hidden = true; }
    var btn = q.querySelector(".reveal-btn");
    if (btn) { btn.textContent = "显示答案"; }
  }

  document.addEventListener("click", function (e) {
    var opt = e.target.closest ? e.target.closest(".opt") : null;
    if (opt) {
      var q = opt.closest(".quiz-q");
      if (!q || q.classList.contains("answered")) { return; }
      q.classList.add("answered");
      var picked = opt.getAttribute("data-key");
      var correct = q.getAttribute("data-correct");
      var opts = q.querySelectorAll(".opt");
      opts.forEach(function (o) {
        o.disabled = true;
        if (o.getAttribute("data-key") === correct) { o.classList.add("is-correct"); }
      });
      opt.classList.add("selected");
      var fb = q.querySelector(".fb-result");
      if (fb) {
        var right = picked === correct;
        fb.classList.add(right ? "ok" : "no");
        fb.textContent = right
          ? "✅ 回答正确。"
          : "❌ 回答错误，正确答案是 " + correct + "。";
      }
      var explain = q.querySelector(".explain");
      if (explain) { explain.hidden = false; }
      return;
    }

    var btn = e.target.closest ? e.target.closest(".reveal-btn") : null;
    if (btn) {
      var q2 = btn.closest(".quiz-q");
      if (!q2) { return; }
      var box = q2.querySelector(".answer-box");
      if (!box) { return; }
      box.hidden = !box.hidden;
      btn.textContent = box.hidden ? "显示答案" : "收起答案";
      return;
    }

    var reset = e.target.closest ? e.target.closest("#resetQuiz") : null;
    if (reset) {
      var all = document.querySelectorAll(".quiz-q");
      all.forEach(resetOne);
    }
  });
})();
