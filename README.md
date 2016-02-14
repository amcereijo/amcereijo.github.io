# username.github.io
The project contents in this repo will read all your repos in github and it'll show them in a list.

You can:
* filter by technology and/or search by project name
* click over one project and you will see the README.md file.

Each project item has information about its technology, its last commit date and has a link to the project.

You can fork this repo, rename with name *"yourgithubusername".github.io* and you could see your own repo list page under [http://yourgithubusername.github.io](http://<yourgithubusername>.github.io) 

In "js/mock.js" you can configure mock properties:
* useMock: true|false -> indicate if you want to use mock in local, "true" by default
* username: 'amcereijo' -> github username to use in local for github api calls
* getRepos: response json for api call 'https://api.github.com/users/{{githubUserName}}/repos'
* getReadme: resopnse json for api call 'https://api.github.com/repos/{{githubUserName}}/{{reponName}}/contents/README.md?ref=master'
* getUser: resopnse json for api call 'https://api.github.com/users/{{githubUserName}}'

## Polymer version
All needed files to replicate the same functionality using Polymer are under "polymer" folder.
Check the output in [http://amcereijo.github.io/polymer/index.html](http://amcereijo.github.io/polymer/index.html)


## React.js version ...In progress...
All needed files to replcate the same functionality using React.js are under "reactjs" folder.
Check the output in [http://amcereijo.github.io/reactjs/index.html](http://amcereijo.github.io/reactjs/index.html)
