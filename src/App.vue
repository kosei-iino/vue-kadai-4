<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
#app {
  margin-top: 10%;
  margin-left: 10%;
  width: 80%;
}
.modal-content {
  width: 200px;
  background: #fff;
  position: fixed;
  z-index: 2;
  text-align: center;
  margin-top: 10%;
  margin-left: 30%;
}
.fader {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: #000000;
  opacity: 0.5;
  z-index: 1;
}
.dialog-button {
  text-align: right;
  background-color: #797979;
  margin-bottom: 0;
}
.userInformation {
  display: flex;
  justify-content: space-between;
}
h1 {
  text-align: center;
}
table {
  width: 100%;
}
</style>
