<template>
  <div id="app">
    <div id="wrapper">
      <div id="nav">
        <img class="sitelogo" alt="Vue logo" src="@/assets/coronavirus_icon.png" width="80px" />
        <h1 class="siteheader">COVID-19 Global Stats</h1>
      </div>
      <router-view/>   
    </div>
    <div id="footer">
      <p>This app was written by Nathan Bitcheno. Code for this app is free to reuse. <a href=""><i class="fa fa-github-square"></i></a></p> 
      <p>Data on this site comes from the <a href="https://github.com/NovelCOVID">NovelCOVID API Project.</a></p>
    </div>
  </div>  
</template>

<style>
@import "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#wrapper {
  max-width: 1100px;
  margin: auto;
}

#nav {
  font-size: 1.1em;
  margin: 50px 0 80px 0;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.siteheader {
  margin-top: 80px;
}
.sitelogo {
  float: left;
  margin: -20px 20px 0 0;
}

#footer {
  margin-top: 100px;
  border-top: 1px solid #eee;
  text-align: center;
  padding: 20px;
  font-size: 0.8em;
}

@media 
only screen and (max-width: 760px),
(min-device-width: 768px) and (max-device-width: 1024px)  {
  #nav {
    text-align: center;
    margin: 20px;
  }
  .siteheader {
    margin-top: 20px;
    font-size: 1.2em;
  }
.sitelogo {
  float: none;
  margin: 0px;
}
}
</style>
