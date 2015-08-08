function User(uid) {
  this.uid = uid
}
User.prototype.foo = function(){
	return 'hello world';
}

module.exports = User;