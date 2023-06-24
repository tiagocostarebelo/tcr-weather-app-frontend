
const successCallback = (position) => {
    console.log(position);
    let lat = position.coords.latitude;
    let long = position.coords.longitude; 
    console.log(lat, long); 
};

const errorCallback = (error) => {
    console.log(error);
};

navigator.geolocation.getCurrentPosition(successCallback, errorCallback);


