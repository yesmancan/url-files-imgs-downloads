(function () {
  const fs = require('fs');
  const url = require('url');
  let http = require('http');
  const DOWNLOAD_DIR = './downloads/';

  const download_file_httpget = function (file_url) {
    const parseUrl = url.parse(file_url);
    let portForProtocol = 80;

    if (parseUrl.protocol === 'https:') {
      http = require('https');
      portForProtocol = 443;
    }

    var options = {
      host: parseUrl.host,
      port: portForProtocol,
      path: parseUrl.pathname
    };
    var file_name = url.parse(file_url).pathname.split('/').pop();
    var file = fs.createWriteStream(DOWNLOAD_DIR + file_name);

    http.get(options, function (res) {
      res.on('data', function (data) {
        file.write(data);
      }).on('end', function () {
        file.end();
        console.log(file_name + ' downloaded to ' + DOWNLOAD_DIR);
      });
    });
  };

  /*
  
  Single Dowload

  */

  download_file_httpget('https://cdn.okul.com.tr/galleries/3/1/630x420/16-year-old-artist-dimitra-milan-1.jpg')


  /*
  
  Multi Downloads

  */

  
  // let data = [{
  //     "count": {
  //       "live": 15,
  //       "prematch": 850
  //     },
  //     "id": 5,
  //     "label": "football",
  //     "name": "Futbol",
  //     "parentId": 1
  //   },
  //   {
  //     "count": {
  //       "live": 0,
  //       "prematch": 139
  //     },
  //     "id": 2,
  //     "label": "ice-hockey",
  //     "name": "Buz Hokeyi",
  //     "parentId": 1
  //   },
  //   {
  //     "count": {
  //       "live": 3,
  //       "prematch": 162
  //     },
  //     "id": 10,
  //     "label": "tennis",
  //     "name": "Tenis",
  //     "parentId": 1
  //   },
  //   {
  //     "count": {
  //       "live": 0,
  //       "prematch": 8
  //     },
  //     "id": 71,
  //     "label": "volleyball",
  //     "name": "Voleybol",
  //     "parentId": 1
  //   },
  //   {
  //     "count": {
  //       "live": 0,
  //       "prematch": 22
  //     },
  //     "id": 18,
  //     "label": "handball",
  //     "name": "Hentbol",
  //     "parentId": 1
  //   }
  // ];
  // data = data.map(m => m.label = 'https://img/icons/sports/' + m.label + '.svg')
  // for (let i = 0; i < data.length; i++) {
  //   download_file_httpget(data[i])
  // }

})();
