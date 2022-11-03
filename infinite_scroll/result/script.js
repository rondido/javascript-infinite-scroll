;(function () {
  'use strict'

  const get = function (target) {
    return document.querySelector(target)
  }

  let page = 1;
  const limit = 10;
  const $posts = get('.posts') ;
  const end = 100;
  //이떄까지 불러온 데이터의 갯수
  let total = 10
  const $loader = get('.loader');
  //fetch 사용하여 api 호출하기

  const getPost = async () =>{
    const API_URL = `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`;    
    const response = await fetch(API_URL)
    if(!response.ok){
      throw new Error("에러가 발생")
    }
    return  await response.json()
  }

  const showPosts = (posts)=>{    
    posts.forEach(post => {
      const $post = document.createElement("div");
      $post.classList.add("post");
      $post.innerHTML = `
        <div class="header">
        <div class="id">${post.id}</div>
        <div class="title">${post.title}</div>
        </div>
        <div class="body">
        ${post.body}
        </div>
      `
      $posts.appendChild($post)
    });
  }

  const showLoader = () =>{
      $loader.classList.add('show');
  }
  const hiderLoader = () =>{
    $loader.classList.remove("show");
  }
  const loadPost = async () => {
    showLoader()
    //로딩 엘리멘트를 보여줌
    try{
      const response =await getPost();
      showPosts(response);
    }catch(error){
      console.log(error);
    }finally{
      hiderLoader()
      //로딩 엘리멘트를 사라지게함
    }
  }
  const onScroll = () =>{
    const {scrollTop,scrollHeight,clientHeight} = document.documentElement
    if(total === end){
      window.removeEventListener("scroll", onScroll)
        return
    }
    if(scrollTop + clientHeight >= scrollHeight -5){
      page++
      total +=10;
      loadPost();
    }
  }

  window.addEventListener('DOMContentLoaded', () =>{
    loadPost();
    window.addEventListener("scroll", onScroll)
  })
})()