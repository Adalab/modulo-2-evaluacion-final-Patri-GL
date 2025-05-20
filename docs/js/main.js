console.log(">> Ready :)");const c=document.querySelector(".js_movieList");document.querySelector(".js_searchBox");const a=document.querySelector(".js_searchInput"),m=document.querySelector(".js_searchBtn");document.querySelector(".js_favouriteMovies");document.querySelector(".js_resetBtn");let o=[];function u(e){var t,i,s,l;const n=`<li  class="listItem js_listitem" data-mal_id="${e.mal_id}">
         <figure> <img
            src="${((i=(t=e.images)==null?void 0:t.jpg)==null?void 0:i.image_url)===null?"https://placehold.co/210x300/ffffff/555555?text=TV":(l=(s=e.images)==null?void 0:s.jpg)==null?void 0:l.image_url}"
            alt="${e.title}"
          />
          <figcaption>${e.title}</figcaption> </figure>
        </li>`;return console.log("The conditional for images null works"),n}function r(){let e="";for(const t of o)e+=u(t);c.innerHTML=e;const n=document.querySelectorAll(".js_listitem");for(const t of n)t.addEventListener("click",f)}const d=e=>{e.preventDefault();const n=a.value.trim();c.innerHTML="<li>Loading...</li>",fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(n)}`).then(t=>t.json()).then(t=>{o=t.data,r()})};m.addEventListener("click",d);function f(e){const n=e.currentTarget;n.classList.toggle("favourite");const t=parseInt(n.dataset.mal_id);console.log("MAL ID:",t)}fetch("https://api.jikan.moe/v4/anime?q=naruto").then(e=>e.json()).then(e=>{o=e.data,r()});
//# sourceMappingURL=main.js.map
