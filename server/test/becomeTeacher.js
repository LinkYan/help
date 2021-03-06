var request =require('supertest');
var server = request.agent('http://localhost:3000');
var com = require('./com');


describe.skip('注册一个新用户，成为导师，并更新状态',function(){
    var newUser=null;
    before(function(done){
      newUser={
        username:'test_user_'+Math.floor(Math.random()*999),
        password:'test_pwd',
      };
      done();
    })
    it('注册一个新用户',function(done){
        server.post('/user/v1/register').send(newUser)
        .expect(function(res){
          if (res.body.status.code!=101) {
            return '注册失败';
          }
          newUser=res.body.result;
        }).end(done);
    });
    it('登录该用户',function(done){
        com.testLoginUser(server,newUser,done);
    });
    it('成为导师',function(done){
      var postData={
        uid:newUser.id,
        title:'蘑菇街HR'
      };
      server.post('/teacher/v1/becomeTeacher').send(postData)
      .expect(function(res){
        if (res.body.status.code!=101) {
          throw new Error('code is not 101');
        }
        newUser.tid=res.body.result.tid;
      }).end(done);
    });
    it('更新一个状态',function(done){
      var updateData={
        tid:newUser.tid,
        title:'蘑菇街k',
        star:1,
        max_cpq:0,
        current_cpq:0,
        current_chat_type:0,
        online:0,
        fake_phone:'1388383'
      };
      server.post('/teacher/v1/update').send(updateData)
      .expect(function(res){
        if (res.body.status.code!=101) {
          throw new Error('code is not 101');
        }
      }).end(done);

    });
});
