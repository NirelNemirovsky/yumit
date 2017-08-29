import axios from 'axios';

let Express = {};
Express.sendForm = function(){
  var params = new URLSearchParams();
  params.append('countries', 'Iran, Iraq');
  params.append('distance', '100');
  params.append('phoneNumber', '+972542246624');

  axios.post('172.13.2.91', params);
}

export default Express;
