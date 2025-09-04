// ACCESSING ALL THE HTML COMPONENTS REQUIRED TO PERFORM ACTIONS ON.
let button = document.querySelector('.button')
let inputvalue = document.querySelector('.inputValue')
let nameVal = document.querySelector('.name');
let temp = document.querySelector('.temp');// nhiệt độ
let desc = document.querySelector('.desc');// mô tả thời tiết
let previousTemps = [];

// ADDING EVENT LISTENER TO SEARCH BUTTON  
button.addEventListener('click', fetchWeatherData);

  function fetchWeatherData() {
    const city = inputvalue.value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=108dd9a67c96f23039937fe6f3c91963`)
    .then(response => response.json())
    .then(
        displayData)
    .catch(err => alert('Không tìm thấy thành phố hoặc có lỗi xảy ra')); 
    setInterval(fetchWeatherData, 10 * 60 * 1000);  
    }


// Function to diplay weather on html document
const displayData=(weather)=>{
    temp.textContent=`${weather.main.temp}°C`;//hiển thị nhiệt độ hiện tại
    desc.innerText=`${weather.weather[0].main}`;// trả về trạng thái thời tiết

    previousTemps.push(weather.main.temp);//previousTemps được sử dụng để lưu trữ các giá trị nhiệt độ gần đây nhất. Để tính toán nhiệt độ trung bình, chúng ta cần tính tổng các giá trị nhiệt độ trong mảng này.

    // Calculate and display average temperature 

const averageTemp = previousTemps.reduce((sum, temp) => sum + temp, 0) / previousTemps.length;
// Thêm một phần tử HTML mới để hiển thị nhiệt độ trung bình (ví dụ: một đoạn văn bản với lớp "avg-temp")
const avgTempElement = document.querySelector('.avg-temp');
avgTempElement.innerText = `Nhiệt độ trung bình: ${averageTemp.toFixed(1)}°C`;
const tempValue = Number(weather.main.temp);//Giá trị nhiệt độ được trả về bởi API thời tiết của OpenWeatherMap là kiểu dữ liệu string. Để tính toán nhiệt độ trung bình, chúng ta cần chuyển đổi giá trị này sang kiểu dữ liệu số.
if (!isNaN(tempValue)) {//kiểm tra xem có phải số ko nếu là số thì chạy xuống teapValue
  previousTemps.push(tempValue);
  let message = '';
  if (tempValue < 0) {
    message = 'Trời rét';}
    else if (tempValue < 10) {
      message = 'Trời lạnh';
  } else if (tempValue >= 10 && tempValue <= 20) {
      message = 'Trời mát';
  } else if (tempValue > 20) {
    message = 'Trời ấm';
  } else if (tempValue > 30) {
    message = 'Trời nóng';
  } else {
    // Optional: Add a message for temperatures between 10°C and 20°C, e.g., "Trời mát mẻ"
  }
  // Display the message
  const tempMessageElement = document.querySelector('.temp-message');
  tempMessageElement.innerText = message;
} else {
  console.warn("Invalid temperature data received from API");
}

};
