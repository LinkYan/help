var moment = require('moment');

/**
`id` int(11) NOT NULL AUTO_INCREMENT,
`username` varchar(20) DEFAULT NULL COMMENT '用户名',
`password` char(32) DEFAULT NULL COMMENT '密码',
`phone` varchar(32) DEFAULT NULL COMMENT '电话号码',
`avatar` varchar(518) DEFAULT NULL COMMENT '头像',
`desc` varchar(518) DEFAULT NULL COMMENT '自我介绍',
`interest` varchar(32) DEFAULT NULL COMMENT '兴趣列表 json  ',
`tid` int(11) DEFAULT '0' COMMENT '导师信息关联ID',
`utype` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0:普通用户 1:导师',
`cfans` int(11) DEFAULT '0' COMMENT '粉丝数',
`cfollows` int(11) DEFAULT '0' COMMENT '关注数',
`cbuys` int(11) DEFAULT '0' COMMENT '购买数',
`csells` int(11) DEFAULT '0' COMMENT '出售数',
`cpost` int(11) DEFAULT '0' COMMENT '发表数',
`create_time` int(11) DEFAULT '0',
`update_time` int(11) DEFAULT '0',
**/
module.exports = function (orm, db) {
  var user = db.define('user', {
    // id        : { type: 'integer', required: true, }
    username     : { type: 'text'},
    password      : { type: 'text'},
    phone      : { type: 'text'},
    avatar      : { type: 'text'},
    desc      : { type: 'text'},
    interest      : { type: 'text'},
    teacher_id      : { type: 'integer'},
    // utype      : { type: 'integer'},
    cfans      : { type: 'integer'},
    cfollows      : { type: 'integer'},
    cbuys      : { type: 'integer'},
    csells      : { type: 'integer'},
    cpost      : { type: 'integer'},
    // create_time : { type: 'date',time: true },
    // update_time : { type: 'date',time: true }
  },
  {
    timestamp: true
  },
  {
    hooks: {
      beforeValidation: function () {
        // this.createdAt = new Date();
      }
    },
    validations: {
      // title: [
      //   orm.enforce.ranges.length(1, undefined, "must be atleast 1 letter long"),
      //   orm.enforce.ranges.length(undefined, 96, "cannot be longer than 96 letters")
      // ],
      // body: [
      //   orm.enforce.ranges.length(1, undefined, "must be atleast 1 letter long"),
      //   orm.enforce.ranges.length(undefined, 32768, "cannot be longer than 32768 letters")
      // ]
    },
    methods: {
      isTeacher:function(){
        return this.teacher_id==null||this.teacher_id==0;
      },
      serialize: function () {
        // var comments;
        // if (this.comments) {
        //   comments = this.comments.map(function (c) { return c.serialize(); });
        // } else {
        //   comments = [];
        // }
        if(isTeacher()){
            db.models.teacher.get(teacher_id,function(err,result){
                return {
                  id:this.id,
                  username:this.username,
                  teacher_id:teacher_id,
                  teacher:result
                };
            })
        } else {
          return {
            id        : this.id,
            username     : this.username
          };
        }
      }
    }
  });
};
