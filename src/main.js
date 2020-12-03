import Vue from 'vue'
//import App from './App'
import 'bootstrap';
import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/alert';
import 'bootstrap/dist/css/bootstrap.min.css';

Vue.config.productionTip = false

/*new Vue({
  el: '#_application',
  //components: { App },
  template: '<App/>'
})*/
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
//var boot=require("bootstrap");
var $ = require("jquery");
var now_id = 0;
var getJSON = function () {
  return $.ajax({
    url: "https://vrteachingmaterial.github.io/JPcourse_JSON/JPcourse.json",
    type: "GET",
    dataType: "json",
    error: function () {
      alert("ERROR!!!");
    }
  })
};
var TOKEN_start = getJSON();
TOKEN_start.then(function (data) {
  console.log(data);
  $('#json_num').html(data.course_length);

  var all_course = "";
  for (let i = 0; i < data.course_length; i++) {
    if (now_id == i) {
      all_course +=
        "<li onclick=\"document.getElementById('courseID_" + i + "').scrollIntoView();\" class=\"list-group-item d-flex justify-content-between lh-condensed\"><div class=\"text-success\"><h6 class=\"my-0\">"
        + data.courses[i].name
        + "</h6><small>有"
        + data.courses[i].clips_len
        + "個問答</small></div><span class=\"text-success\">"
        + data.courses[i].clips[data.courses[i].clips_len - 1].time
        + "s</span></li>";
      $('#now_name').html(data.courses[i].name);//XXXXXXXXXXXX
      //form
      $('#form_name').html(data.courses[i].name);//XXXXXXXXXXXX
      $('#form_name').html(data.courses[i].name);
      $('#form_name').html(data.courses[i].name);
      $('#form_name').html(data.courses[i].name);
      $('#form_name').html(data.courses[i].name);
    } else {
      all_course +=
        "<li onclick=\"document.getElementById('courseID_" + i + "').scrollIntoView();\" class=\"list-group-item d-flex justify-content-between lh-condensed\"><div><h6 class=\"my-0\">"
        + data.courses[i].name
        + "</h6><small class=\"text-muted\">有"
        + data.courses[i].clips_len
        + "個問答</small></div><span class=\"text-muted\">"
        + data.courses[i].clips[data.courses[i].clips_len - 1].time
        + "s</span></li>";
    }
  }
  $('#json_all_course').html(all_course);

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const fs = require('fs');//node存取檔案的模組

  let vue_courses = new Vue({
    el: "#_application",    //和畫面上哪個物件聯繫
    data: {
      nowCourseID: 0,
      vue: data,

      courses: {
        name: "",
        youtube_id: "",
        clips_len: 0,
        clips: {
          time: 0,
          ques: "",
          start_nosound: 0,
          end_nosound: 0,
          ans_len: 0,
          ans: []
        }
      },
    },
    methods: {
      delete_course: function (course_id) {
        if (this.vue.courses.length == 1) alert("已經是最後一個課程了，不允許被刪掉。");
        else
          this.vue.courses.splice(course_id, 1);      //從索引 course_id 的位置開始，刪除 1 個元素
      },
      delete_clip: function (course_id, clip_id) {
        if (this.vue.courses[course_id].clips.length == 1) alert("已經是最後一個問題了，不允許被刪掉。");
        else
          this.vue.courses[course_id].clips.splice(clip_id, 1);
      },
      delete_ans: function (course_id, clip_id, ans_id) {
        if (this.vue.courses[course_id].clips[clip_id].ans.length == 1) alert("已經是最後一個問題了，不允許被刪掉。");
        else
          this.vue.courses[course_id].clips[clip_id].ans.splice(ans_id, 1);
      },
      //___________________________________________________________________________________________
      add_course: function (course_id) {             //從索引 course_id 的位置開始，刪除 0 個元素並插入 新物件
        this.vue.courses.splice(course_id + 1, 0, { "name": "", "youtube_id": "", "clips_len": 1, "clips": [{ "time": 0, "ques": "", "start_nosound": "0", "end_nosound": "0", "ans_len": 1, "ans": [""] }] });
      },
      add_clip: function (course_id, clip_id) {     //向下新增
        this.vue.courses[course_id].clips.splice(clip_id + 1, 0, { "time": 0, "ques": "", "start_nosound": "0", "end_nosound": "0", "ans_len": 1, "ans": [""] });
      },
      add_ans: function (course_id, clip_id) {
        this.vue.courses[course_id].clips[clip_id].ans.push("");
      },

      save_file: function () {
        this.vue.course_length = this.vue.courses.length;

        this.vue.courses.forEach(course_element => {
          course_element.clips_len = course_element.clips.length;
          course_element.clips.forEach(clip_element => {
            clip_element.ans_len = clip_element.ans.length;
          });
        });
        this.vue.course_length = this.vue.courses.length;
        fs.writeFileSync(__dirname+"Clips.json", JSON.stringify(this.vue));
      },
    }
  });
});




//<!-- Bootstrap core JavaScript================================================== -->
//<!-- Placed at the end of the document so the pages load faster 
(function () {
  'use strict';
  window.addEventListener('load', function () {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');

    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function (form) {
      form.addEventListener('submit', function (event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();
