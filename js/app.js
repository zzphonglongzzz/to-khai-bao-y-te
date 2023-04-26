function getData(url, callback) {
    var xhr = new XMLHttpRequest();

    //Initializes a new request
    xhr.open("GET", url, true);

    //Event handler when readyState attribute changes
    xhr.onreadystatechange = function () {
      //readyState = 4
      if (xhr.readyState == XMLHttpRequest.DONE) {
        //Successful responses
        if (xhr.status === 200) {
          callback(undefined, JSON.parse(xhr.responseText));
        } else {
          callback(new Error(xhr.statusText));
        }
      }
    };

    //Sends the request
    xhr.send();
}
  
function getDataPromise(url) {
    return new Promise((resolve, reject) => {
      getData(url, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
}

const PROVINCE = "https://6116e80430022f0017a05c83.mockapi.io/api/Province";
var District = (p_id) => {
  return PROVINCE + "/" + p_id + "/District";
}
var Ward = (p_id, d_id) => {
  return PROVINCE + "/" + p_id + "/District" + "/" + d_id + "/Ward";
}

var province = [];
var district = [];
var ward = [];

async function getProvince(order){
  let selectProvince = document.getElementById("province-"+order);
  document.getElementById("province-"+order).innerHTML = "<option>-Chọn-</option>";
  let province = await getDataPromise(PROVINCE);
  province.forEach((pro) => {
    document.getElementById("province-"+order).innerHTML += "<option value='"+ pro.id+"'>"+ pro.name+"</option>";
  })
}

async function getDistrict(order){
  document.getElementById("district-"+order).innerHTML = "<option>-Chọn-</option>";
  let proId = document.getElementById('province-'+order).value;
  let district = await getDataPromise(District(proId));
  district.forEach((dis) => {
    document.getElementById("district-"+order).innerHTML += "<option value='"+ dis.id+"'>"+ dis.name+"</option>";
  })
}

async function getWard(order){
  document.getElementById("ward-"+order).innerHTML = "<option>-Chọn-</option>";
  let proId = document.getElementById('province-'+order).value;
  let disId = document.getElementById('district-'+order).value;
  let ward = await getDataPromise(Ward(proId, disId));
  ward.forEach((wa) => {
    document.getElementById("ward-"+order).innerHTML += "<option value='"+ wa.id+"'>"+ wa.name+"</option>";
  })
}

window.onload = () => {
  getProvince(1);
  getProvince(2);
};