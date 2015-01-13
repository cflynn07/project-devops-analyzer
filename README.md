Project Devops Analyzer
=======================

Utilities for initial project setup at runnable.io

Purpose
-------
To infer which service dependencies and environmental variables are required to execute a repository code base

Usage
-----
```js
var Analyzer = require('project-devops-analyzer');
var analyzer = new Analyzer({
  throw: true
});

// Infer via GitHub API
var GitHubApi = require('github');
var github = new GitHubApi({
  version: '3.0.0'
});
github.authenticate({
  type: 'oauth',
  token: '...'
});
github.repos.getContent({
  user: 'cflynn07',
  repo: 'demo_ruby_ror',
  path: ''
}, function (err, res) {
  if (!err) {
    try {
      analyzer.inferLanguageFramework(res);
    } catch (e) {
      throw e;
    }
    console.log(analyzer.language);       // "ruby"
    console.log(analyzer.dependencyFile); // "Gemfile"
  }
});

// Infer via local file system (Node.js only)
var fs = require('fs');
fs.readdir('./', function (err, res) {
  if (!err) {
    try {
      analyzer.inferLanguageFramework(res);
    } catch (e) {
      throw e;
    }
    console.log(analyzer.language);       // "ruby"
    console.log(analyzer.dependencyFile); // "Gemfile"
  }
});

```

Contributors
------------
<img src="http://www.gravatar.com/avatar/fd3c806f94926cbe683f3ddc878ae4d3?s=64">&nbsp;
[Casey Flynn (cflynn07)](https://github.com/cflynn07)
San Francisco, CA, USA  
