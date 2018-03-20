<template>
  <div v-if="loading">
    <div class="loading-background"></div>
    <div class="modal animated fadeIn">
      <div class="modal-dialog">
        <div id="loading">
          <div id="loading-center">
            <div id="loading-center-absolute">
              <div class="object" id="first_object"></div>
              <div class="object" id="second_object"></div>
              <div class="object" id="third_object"></div>
              <div class="object" id="forth_object"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    computed: {
      ...mapGetters({
        loading: 'loading'
      })
    }
  }
</script>

<style scoped>
  .loading-background {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 1040;
      background-color: #000;
      opacity: 0.5;
      transition: all 0.2s;
  }
  .modal {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 1050;
      overflow: hidden;
      outline: 0;
  }
  .modal-dialog {
      position: relative;
      border-radius: 6px;
      outline: 0;
      box-shadow: 0 3px 9px rgba(0,0,0,.5);
      background-color: #fff;
      width: 500px;
      margin: 0px auto;
      top: 150px;
      padding: 20px 50px;
  }
  #loading{
  	background-color: rgba(255,255,255,1);
  	height: 230px;
  	width: 100%;
  	z-index: 1;
  	margin-top: 0px;
  }
  #loading-center{
  	width: 100%;
  	height: 100%;
  	position: relative;
  	}
  #loading-center-absolute {
  	position: absolute;
  	left: 50%;
  	top: 50%;
  	height: 100px;
  	width: 100px;
  	margin-top: -50px;
  	margin-left: -50px;
  }
  .object{
  	width: 25px;
  	height: 25px;
  	background-color: rgba(255,255,255,0);
  	margin-right: auto;
  	margin-left: auto;
  	border: 4px solid #b3d4fc;
  	left: 37px;
  	top: 37px;
  	position: absolute;
  }
  #first_object{
  	animation: first_object 1s infinite;
    animation-delay: 0.5s;
  }
  #second_object{
  	animation: second_object 1s infinite;
  }
  #third_object{
  	animation: third_object 1s infinite;
    animation-delay: 0.5s;
  }
  #forth_object{
  	animation: forth_object 1s infinite;
  }
  @-webkit-keyframes first_object {
   0% {
      transform: translate(1,1) scale(1,1);
  	 }
   50% {
      transform: translate(150%,150%) scale(2,2);
  	 }
   100% {
      transform: translate(1,1) scale(1,1);
  	 }
  }
  @keyframes first_object {
   0% {
      transform: translate(1,1) scale(1,1);
  	 }
   50% {
      transform: translate(150%,150%) scale(2,2);
  	 }
   100% {
      transform: translate(1,1) scale(1,1);
  	 }
  }
  @-webkit-keyframes second_object {
   0% {
      transform: translate(1,1) scale(1,1);
  	 }
   50% {
      transform: translate(-150%,150%) scale(2,2);
  	}
   100% {
      transform: translate(1,1) scale(1,1);
  	 }
  }
  @keyframes second_object {
   0% {
      transform: translate(1,1) scale(1,1);
  	 }
   50% {
      transform: translate(-150%,150%) scale(2,2);
  	}
   100% {
      transform: translate(1,1) scale(1,1);
  	 }
  }
  @-webkit-keyframes third_object {
   0% {
      transform: translate(1,1) scale(1,1);
  	 }
   50% {
      transform: translate(-150%,-150%) scale(2,2);
  	}
   100% {
      transform: translate(1,1) scale(1,1);
  	 }
  }
  @keyframes third_object {
   0% {
      transform: translate(1,1) scale(1,1);
  	 }
   50% {
      transform: translate(-150%,-150%) scale(2,2);
  	}
   100% {
      transform: translate(1,1) scale(1,1);
  	 }
  }
  @-webkit-keyframes forth_object {
   0% {
      transform: translate(1,1) scale(1,1);
  	 }
   50% {
      transform: translate(150%,-150%) scale(2,2);
  	}
   100% {
      transform: translate(1,1) scale(1,1);
  	 }
  }
  @keyframes forth_object {
   0% {
      transform: translate(1,1) scale(1,1);
  	 }
   50% {
      transform: translate(150%,-150%) scale(2,2);
  	}
   100% {
      transform: translate(1,1) scale(1,1);
  	 }
  }
</style>
