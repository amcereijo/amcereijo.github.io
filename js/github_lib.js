app.github = (function() {
  var username;
	var getUsername = function() {
		//http://username.github.io/
		if(!username) {
      if(app.util.isLocal()) {
        username = app.mock.username?app.mock.username:'amcereijo';
      } else {
        username = app.util.getHost().replace(/.github.io/, '');
      }
    }
		return username;
	},
	getReposUrl =  function() {
		return 'https://api.github.com/users/' + getUsername() +
			'/repos';
	},
	getReadMeUrl =  function(repoName) {
		return 'https://api.github.com/repos/' + getUsername() + 
			'/' + repoName + '/contents/README.md?ref=master';
	},
  getUserUrl = function() {
    return 'https://api.github.com/users/' + getUsername();
  },
  doCall = function(url, eventName, mockProp) {
    if(app.mock && app.mock.useMock && app.mock[mockProp]) {
      $.publish(eventName, {data: app.mock[mockProp]});  
    } else {
      $.ajax({
        url: url,
        contentType: 'application/json'
      }).done(function(data) {
        $.publish(eventName, {data: data});
      });
    }
  },
	getRepos = function() {
    doCall(getReposUrl(), 'github/repo/data', 'getRepos');
	},
	getReadme = function(repoName) {
		doCall(getReadMeUrl(repoName), 'github/readme/data', 'getReadme');
	},
  getUser = function() {
    doCall(getUserUrl(), 'github/user', 'getUser');
  };

	return {
		getRepos: getRepos,
		getReadme: getReadme,
    getUser: getUser
	};
})();