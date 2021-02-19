<template>
  <header>
    <router-link class="page-title" :to="{ path: '/' }">
      <img src="~/assets/img/jms-logo.svg" class="jms-logo" />
      <h1>jMS Users</h1>
    </router-link>
    <div class="header-nav">
      <div class="link back-to-main">
        <a
          href="https://jaoafa.com/"
          title="Back to Main Site"
          class="mdi mdi-home"
        ></a>
      </div>
      <div class="link github-link">
        <a
          href="https://github.com/jaoafa/jaoweb-users"
          title="Go to GitHub repository"
          class="mdi mdi-github"
        ></a>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@mixin pc {
  @media (max-width: 1024px) {
    @content;
  }
}

@mixin smartphone {
  @media (max-width: 480px) {
    @content;
  }
}
header {
  background-color: #222831;
  height: 72px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 3px solid #808080;

  .page-title {
    display: flex;
    white-space: nowrap;
    color: #eee;
    text-decoration: none;

    img {
      margin: 10px 8px;
      height: 60px;
    }

    h1 {
      font-weight: normal;
      margin: auto 0;
    }

    @include smartphone {
      h1 {
        font-size: 1.5em;
      }
    }
  }

  .header-nav {
    display: flex;
    white-space: nowrap;
    color: #eee;
  }

  .link:hover {
    transition: 0.5s;
    opacity: 0.5;
  }

  .back-to-main a {
    width: 50px;
    height: 50px;
    font-size: 45px;
    padding: 15px;
    text-decoration: none;
    color: #fff;
  }

  .github-link a {
    width: 50px;
    height: 50px;
    font-size: 45px;
    padding: 15px;
    text-decoration: none;
    color: #fff;
  }
}
</style>
