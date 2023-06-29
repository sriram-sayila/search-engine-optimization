window.onload=function(){
    var currentLocation = window.location;
    var str
    var val = document.getElementById('value')
    if (val != null) {
        str = val.value;
    }
    else {
        str = null;
    }
    var gcse = document.createElement('script'); gcse.type = 'text/javascript'; gcse.async = true;
    gcse.src = 'https://cse.google.com/cse.js?cx=11816602b0cab4f57';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(gcse, s);
    let url = new URL(currentLocation.href);
    let params = new URLSearchParams(url.search);
    params.append('gsc.q', str);
    uri = url.toString()
    let page = uri.split('?')
    window.location.assign(page[0] + '?#gsc.tab=0' + params);

var renderSearchElement = function() {
    google.search.cse.element.render(
      {
        div: "default",
        tag: 'search'
      });
    google.search.cse.element.render(
      {
        div: "test",
        attributes: {
          disableWebSearch: true,
          enableHistory: true},
        tag: 'search'
      });
  };
  var myCallback = function() {
    if (document.readyState == 'complete') {
      renderSearchElement();
    } else {
      google.setOnLoadCallback(renderSearchElement, true);
    }
  };

  const myResultsReadyCallback = function(name, q, promos, results, resultsDiv) {
    const makePromoElt = (promo) => {
      const anchor = document.createElement('a');
      anchor.href = promo['url'];
      anchor.target = '_blank';
      anchor.classList.add('gs-title');
      const img = document.createElement('img');
      img.src = promo['thumbnailImage']['url'];
      anchor.appendChild(img);
      const span = document.createElement('span');
      span.innerHTML = 'Promo: ' + promo['title'];
      anchor.appendChild(span);
     
      return anchor;
    };
    const makeResultParts = (result) => {
      const anchor = document.createElement('a');
      anchor.href = result['url'];
      anchor.target = '_blank';
      anchor.classList.add('gs_title');
      anchor.classList.add('popup1');
      anchor.appendChild(document.createTextNode(result['visibleUrl']));
      const img = document.createElement('img');
        img.src = result['thumbnailImage']['url'];
        const views = document.createElement('span');
        if(result['richSnippet']['videoobject']){
            let count = result['richSnippet']['videoobject']['interactioncount']
            let m = 0
            if(count > 1000000) {
                m = Math.round(count/1000000)
                m = m + 'm'
            }
            else {
                m = Math.round(count/1000)
                m = m + 'k'
            }
            views.innerHTML = ' ' + m + ' views';
        }
        // result['richSnippet']['videoobject']['interactioncount']
        
        const spanAdmin = document.createElement('span');
        if(result['richSnippet']['person']){
            spanAdmin.innerHTML = ' ' + result['richSnippet']['person']['name'];
        }
        
      const span = document.createElement('span');
      span.innerHTML = ' ' + result['title'];
      return [ anchor,img,spanAdmin,views, span];
    };

    const table = document.createElement('table');
    table.classList.add('data-table');
    if (promos) {
      for (const promo of promos) {
        const row = table.insertRow(-1);
        const cell = row.insertCell(-1);
        cell.appendChild(makePromoElt(promo));
      }
      resultsDiv.appendChild(table);
      resultsDiv.appendChild(document.createElement('br'));
    }
    if (results) {
      const table = document.createElement('table');
      table.classList.add('data-table');
      for (const result of results) {
        const row = table.insertRow(-1);
        const cell = row.insertCell(-1);
        const [anchor,img,spanAdmin,views, span] = makeResultParts(result);
        const cell2 = row.insertCell(-1);
        cell.appendChild(img)
        cell2.appendChild(span);
        cell2.appendChild(document.createElement('br'));
        cell2.appendChild(spanAdmin);
        cell2.appendChild(document.createElement('br'));
        cell2.appendChild(anchor);
        cell2.appendChild(views);
        row.addEventListener('click', function() {
          const anchor = document.createElement('a');
          anchor.href = result['url'];
          anchor.target = '_blank';
          anchor.classList.add('gs_title');
          anchor.classList.add('popup1');
          anchor.appendChild(document.createTextNode(result['visibleUrl']));
          const img = document.createElement('img');
            img.src = result['thumbnailImage']['url'];
            const views = document.createElement('span');
            views.classList.add('views-align')
            if(result['richSnippet']['videoobject']){
                let count = result['richSnippet']['videoobject']['interactioncount']
                let m = 0
                if(count > 1000000) {
                    m = Math.round(count/1000000)
                    m = m + 'm'
                }
                else {
                    m = Math.round(count/1000)
                    m = m + 'k'
                }
                views.innerHTML = ' ' + m + ' views';
            }
            const spanAdmin = document.createElement('span');
            if(result['richSnippet']['person']){
                spanAdmin.innerHTML = ' ' + result['richSnippet']['person']['name'];
            }
          const span = document.createElement('span');
          span.innerHTML = ' ' + result['title'];
          const div  = document.createElement('div');
          div.appendChild(img)
          div.appendChild(document.createElement('br'));
          div.appendChild(span)
          div.appendChild(document.createElement('br'));
          const flexdiv  = document.createElement('div');
          flexdiv.classList.add('name-views')
          flexdiv.appendChild(spanAdmin)
          flexdiv.appendChild(views)
          div.appendChild(flexdiv)
          div.appendChild(document.createElement('br'));
          const flexbutt  = document.createElement('div');
          flexbutt.classList.add('butt-views')
          const button1 = document.createElement('button')
          button1.classList.add('visit')
          button1.innerHTML = '<span id="visit">Visit</span>';
          // button1.classList.add('visit')
          // button1.classList.add('close')
          const button2 = document.createElement('button')
          button2.innerHTML = '<span id="close">Close</span>';
          button2.classList.add('close')
          flexbutt.appendChild(button1)
          flexbutt.appendChild(button2)
          div.appendChild(flexbutt)
    //       <button class="visit">Visit</button>
    // <button id="close">Close</button>
          document.getElementById('insideDiv').append(div) 
          document.getElementById('popup').style.display ='block';
          document.getElementById('close').addEventListener('click',function(){
          document.getElementById('popup').style.display ='none';
          document.getElementById('insideDiv').innerHTML = ''
          })
          document.getElementById('visit').addEventListener('click',function(){
            window.open(result['url'],'_blank')
            document.getElementById('popup').style.display ='none';
            document.getElementById('insideDiv').innerHTML = ''
            })
      }
        )
    }
      resultsDiv.appendChild(table);
    }
    return true;
  };
  window.__gcse = {
    parsetags: 'explicit',
    callback: myCallback
  };
  window.__gcse.searchCallbacks = {
    web: {
      ready: myResultsReadyCallback,
    },
    
  };
  $ = function(id) {
    return document.getElementsByClassName(id);
  }

 function hide(id) {
    document.getElementsByClassName('popup').style.display ='none';
  }
}
