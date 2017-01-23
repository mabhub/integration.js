import qs from 'query-string';

const uriBase = 'https://nameless-depths-66550.herokuapp.com';
const request = new XMLHttpRequest();

request.onreadystatechange = function() {
    if (this.readyState === 4) {
        if (this.status >= 200 && this.status < 400) {
            let $newDom = $(this.responseText).find('.content-wrapper');

            $('*[class]', $newDom).each((index, element) => {
                if (element.className.length) {
                    element.className = element.className.split(' ').map(cl => 'prefix-' + cl).join(' ');
                }
            });

            let currentQuery = qs.parse(window.location.search);
            $('a', $newDom).each((index, link) => {
                let href = link.getAttribute('href').split('/');
                if (href[1] === 'sip') {
                    currentQuery.sippub = href[2];
                    link.setAttribute('href', '?' + qs.stringify(currentQuery));
                }
            });
            $newDom.appendTo('#contenu_integre');
        } else {
            // Error :(
        }
    }
};

let queryString = qs.parse(window.location.search);
let source      = '/sip/';

if (queryString.sippub) {
    source = '/sip/' + queryString.sippub;
} else if (queryString.sip) {
    source = queryString.sip;
}

request.open('GET', uriBase + source, true);
request.send();
