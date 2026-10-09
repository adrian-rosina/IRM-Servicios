/* IRM · Paso 14 · lee UTM/gclid/fbclid de la URL, los guarda 30 días en cookie de primera parte
   y rellena los campos ocultos de cualquier formulario de Elementor con esos nombres. */
(function(){
  var KEYS=['utm_source','utm_medium','utm_campaign','utm_content','utm_term','gclid','fbclid'];
  var q=new URLSearchParams(location.search), found=false, data={};
  KEYS.forEach(function(k){ var v=q.get(k); if(v){ data[k]=v; found=true; } });
  function getCookie(n){ var m=document.cookie.match('(?:^|; )'+n+'=([^;]*)'); return m?decodeURIComponent(m[1]):null; }
  if(found){
    data.landing_url=location.href.split('#')[0];
    document.cookie='irm_attr='+encodeURIComponent(JSON.stringify(data))+';max-age='+(30*24*3600)+';path=/;SameSite=Lax';
  } else {
    try{ data=JSON.parse(getCookie('irm_attr')||'{}'); }catch(e){ data={}; }
    if(!data.landing_url) data.landing_url=location.href.split('#')[0];
  }
  function fill(){
    KEYS.concat(['landing_url']).forEach(function(k){
      document.querySelectorAll('input[name="form_fields['+k+']"], input[name="'+k+'"]').forEach(function(el){ if(data[k]) el.value=data[k]; });
    });
  }
  document.addEventListener('DOMContentLoaded',fill); fill();
})();
