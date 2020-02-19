
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
     database: "codingacademy"
});
var bodyParser = require('body-parser');
var fs = require('fs');
var express = require('express'); 
var app = express(); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.set('view engine', 'ejs'); 
app.set("views","views");
 app.get('/',(req,res)=>{
     
      res.render('index',{name:"Coding Academy"}); 
 })
app.post('/', (req, res)=>{ 
console.log(req.body.sellist1);
    var obj={};

    con.connect(function(err) {
 
    
  var sql = "SELECT students.stu_id,students.stu_name as stu,course.course_name as course_name,course_start,course_end,teacher.teacher_name as teacher_name,s_degree FROM (((certificate INNER JOIN students ON certificate.s_id = students.stu_id) INNER JOIN course ON certificate.c_id = course.course_id) INNER JOIN teacher ON certificate.te_id = teacher.teacher_id);";
        
        
  con.query(sql, function (err, result) {
    if (err) 
      {
          
          throw err;
         
      }
       else{
              
           if(req.body.sellist1=='certificate'){
             obj={print:result};
            res.render('as',obj); 
          
         }
          }
 
  });
                        

});
     con.connect(function(err) {
 
    
 var sql2="SELECT stu_name,student_birthdate,gender,phone,stu_email FROM students WHERE stu_id = ANY (SELECT s_id FROM certificate WHERE c_id = any(SELECT course_id FROM course WHERE course_name = 'web'))";
        
  con.query(sql2, function (err, result) {
    if (err) 
      {
          
          throw err;
         
      }
       else{
              
           if(req.body.sellist1=='studentsName'){
             obj={print:result};
            res.render('webCourse',obj); 
          
         }
          }
 
  });
                        

}); 
    
}); 
var server = app.listen(2000, function(){ 
    console.log('listining to port 4000') 
}); 


//var exports=module.exports={};
//
// exports.certificate =function(){con.connect(function(err) {
// 
//      if (err) throw err;
//  var sql = "SELECT students.stu_id,students.stu_name,course.course_name,course_start,course_end,teacher.teacher_name,s_degree FROM (((certificate INNER JOIN students ON certificate.s_id = students.stu_id) INNER JOIN course ON certificate.c_id = course.course_id) INNER JOIN teacher ON certificate.te_id = teacher.teacher_id);";
//  con.query(sql, function (err, result) {
//    if (err) throw err;
//    console.log(result);
//  });
//                        
//
//});
// }

//  exports.avaliableCourse =function(){con.connect(function(err) {
// 
//      if (err) throw err;
//var sql3="select reg_date from certificate where reg_date>=now();";
//  con.query(sql3, function (err, result) {
//    if (err) throw err;
//    console.log(result);
//  });
//                        
//
//});
// }
//   exports.avaliableCourse =function(){con.connect(function(err) {
// 
//      if (err) throw err;
//var sql4="SELECT course.course_name,course_start,course_end,`reg_date`,teacher.teacher_name FROM ((certificate INNER JOIN course ON certificate.c_id = course.course_id and course.course_name = 'web') INNER JOIN teacher ON certificate.te_id = teacher.teacher_id)";
//  con.query(sql4, function (err, result) {
//    if (err) throw err;
//    console.log(result);
//  });
//                        
//
//});
// }

    
































