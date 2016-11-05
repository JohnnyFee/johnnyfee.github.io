layout: post
title: "NodeJS"
category: Node
---

## Tutorial

- [Building a Node OAuth2 server](http://blog.papersapp.com/oauth-server-in-node-js/)
- [Passport | Overview](http://passportjs.org/guide/)
	- [User Authentication with Passport.js - Michael Herman](http://mherman.org/blog/2013/11/11/user-authentication-with-passport-dot-js/#.U2uJwtySzv4)
- [Building a Login System in Node.js and MongoDB | The choreography of color and code](http://www.quietless.com/kitchen/building-a-login-system-in-node-js-and-mongodb/)

## Passport

### 登陆错误处理

在 `app.js` 中：

	var flash = require('connect-flash');

	// ...
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(flash());

`routers` 中：

	app.post('/login', passport.authenticate('local', {
	        successRedirect: '/',
	        failureRedirect: '/login',
	        failureFlash: true}));

    app.get('/login', function (req, res) {
        var error = req.flash('error').join("\n");
        res.render('register', { user: req.user, error: error });
    });

### 使用不同的验证方法

Account.statics.findByUsername = function (username, cb) {
    var query = this.find({ $or: [ { username: username }, { phoneNumber: username } ] }).findOne();
    if (cb) {
        query.exec(cb);
    } else {
        return query;
    }
};
