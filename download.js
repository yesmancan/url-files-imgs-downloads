(function () {
  const fs = require('fs');
  const url = require('url');
  const http = require('http');

  const DOWNLOAD_DIR = './downloads/';

  const download_file_httpget = function (file_url) {
    var options = {
      host: url.parse(file_url).host,
      port: 80,
      path: url.parse(file_url).pathname
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
  // var data = [{
  //     "count": {
  //       "live": 43,
  //       "prematch": 1038
  //     },
  //     "id": 5,
  //     "label": "football",
  //     "name": "Futbol",
  //     "parentId": 1
  //   },
  //   {
  //     "count": {
  //       "live": 4,
  //       "prematch": 80
  //     },
  //     "id": 23,
  //     "label": "basketball",
  //     "name": "Basketbol",
  //     "parentId": 1
  //   }
  // ];
  // data = data.map(m => m.label = 'https://m-sports.lvbet.com/img/icons/sports/' + m.label + '.svg')
  // for (let i = 0; i < data.length; i++) {
  //   download_file_httpget(data[i])
  // }

})();