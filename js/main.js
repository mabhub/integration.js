import qs from 'query-string';

const request = new XMLHttpRequest();

request.onreadystatechange = function() {
    if (this.readyState === 4) {
        if (this.status >= 200 && this.status < 400) {
            let $newDom = $(this.responseText).find('.content-wrapper');

            $('a', $newDom).each((index, link) => {
                let href = link.getAttribute('href');

                if (href[0] === '/') {
                    link.setAttribute('href', '?sip=' + href);
                }

            });
            $newDom.appendTo('#integration_infofficiel');
        } else {
            // Error :(
        }
    }
};

let queryString = qs.parse(window.location.search);
let source      = queryString.sip || '/sip/';

request.open('GET', 'https://nameless-depths-66550.herokuapp.com' + source, true);
request.send();
