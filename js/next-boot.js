NexT.boot={},NexT.boot.registerEvents=function(){NexT.utils.registerScrollPercent(),NexT.utils.registerCanIUseTag(),document.querySelector(".site-nav-toggle .toggle").addEventListener("click",function(e){e.currentTarget.classList.toggle("toggle-close");var t=document.querySelector(".site-nav");if(t){var i=document.body.classList.contains("site-nav-on"),o=NexT.utils.getComputedStyle(t);t.style.height=i?o:0;var n=function(){return document.body.classList.toggle("site-nav-on")},a=function(){t.style.overflow="hidden"},r=function(){t.style.overflow="",t.style.height=""};window.anime(Object.assign({targets:t,duration:200,height:i?[o,0]:[0,o],easing:"linear"},i?{begin:a,complete:function(){r(),n()}}:{begin:function(){a(),n()},complete:r}))}});document.querySelectorAll(".sidebar-nav li").forEach(function(o,n){o.addEventListener("click",function(){if(!o.matches(".sidebar-toc-active .sidebar-nav-toc, .sidebar-overview-active .sidebar-nav-overview")){var e=document.querySelector(".sidebar-inner"),t=document.querySelectorAll(".sidebar-panel"),i=["sidebar-toc-active","sidebar-overview-active"];window.anime({duration:200,targets:t[1-n],easing:"linear",opacity:0,translateY:[0,-20],complete:function(){e.classList.replace(i[1-n],i[n]),window.anime({duration:200,targets:t[n],easing:"linear",opacity:[0,1],translateY:[-20,0]})}})}})}),window.addEventListener("resize",NexT.utils.initSidebarDimension),window.addEventListener("hashchange",function(){var e=location.hash;if(""!==e&&!e.match(/%\S{2}/)){var t=document.querySelector('.tabs ul.nav-tabs li a[href="'+e+'"]');t&&t.click()}})},NexT.boot.refresh=function(){CONFIG.prism&&window.Prism.highlightAll(),CONFIG.fancybox&&NexT.utils.wrapImageWithFancyBox(),CONFIG.mediumzoom&&window.mediumZoom(".post-body :not(a) > img, .post-body > img",{background:"var(--content-bg-color)"}),CONFIG.lazyload&&window.lozad(".post-body img").observe(),CONFIG.pangu&&window.pangu.spacingPage(),CONFIG.exturl&&NexT.utils.registerExtURL(),NexT.utils.registerCopyCode(),NexT.utils.registerTabsTag(),NexT.utils.registerActiveMenuItem(),NexT.utils.registerLangSelect(),NexT.utils.registerSidebarTOC(),NexT.utils.wrapTableWithBox(),NexT.utils.registerVideoIframe()},NexT.boot.motion=function(){CONFIG.motion.enable&&NexT.motion.integrator.add(NexT.motion.middleWares.header).add(NexT.motion.middleWares.postList).add(NexT.motion.middleWares.sidebar).add(NexT.motion.middleWares.footer).bootstrap(),NexT.utils.updateSidebarPosition()},document.addEventListener("DOMContentLoaded",function(){NexT.boot.registerEvents(),NexT.boot.refresh(),NexT.boot.motion()});