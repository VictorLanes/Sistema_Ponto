document.addEventListener('DOMContentLoaded', function () {
    const clockElement = document.getElementById('clock');
    const startWorkBtn = document.getElementById('startWorkBtn');
    const startLunchBtn = document.getElementById('startLunchBtn');
    const endLunchBtn = document.getElementById('endLunchBtn');
    const endWorkBtn = document.getElementById('endWorkBtn');
    const clearLogBtn = document.getElementById('clearLogBtn');
    const logElement = document.getElementById('log');
    let startTime = null;
    let lunchStart = null;
    let lunchEnd = null;
  
    function updateClock() {
      const now = new Date();
      clockElement.textContent = now.toLocaleTimeString();
    }
  
    setInterval(updateClock, 1000);
  
    startWorkBtn.addEventListener('click', function () {
      startTime = new Date();
      logElement.innerHTML += `<li>Início do trabalho: ${startTime.toLocaleTimeString()}</li>`;
    });
  
    startLunchBtn.addEventListener('click', function () {
      if (startTime && !lunchStart) {
        lunchStart = new Date();
        logElement.innerHTML += `<li>Início do almoço: ${lunchStart.toLocaleTimeString()}</li>`;
      }
    });
  
    endLunchBtn.addEventListener('click', function () {
      if (startTime && lunchStart && !lunchEnd) {
        lunchEnd = new Date();
        logElement.innerHTML += `<li>Volta do almoço: ${lunchEnd.toLocaleTimeString()}</li>`;
      }
    });
  
    endWorkBtn.addEventListener('click', function () {
      if (startTime && lunchStart && lunchEnd) {
        const endTime = new Date();
        const workTime = (endTime - startTime) / (1000 * 60);
        const lunchTime = (lunchEnd - lunchStart) / (1000 * 60);
        const totalWorkTime = workTime - lunchTime;
        const hoursWorked = Math.floor(totalWorkTime / 60);
        const minutesWorked = Math.round(totalWorkTime % 60);
        const missingTime = 480 - totalWorkTime;
        const missingHours = Math.floor(missingTime / 60);
        const missingMinutes = Math.round(missingTime % 60);
        logElement.innerHTML += `<li>Fim do trabalho: ${endTime.toLocaleTimeString()}</li>`;
        logElement.innerHTML += `<li>Horas trabalhadas: ${hoursWorked} horas e ${minutesWorked} minutos</li>`;
        if (totalWorkTime < 480) {
          logElement.innerHTML += `<li>Faltaram ${missingHours} horas e ${missingMinutes} minutos</li>`;
        } else if (totalWorkTime > 480) {
          const extraHours = Math.floor((totalWorkTime - 480) / 60);
          const extraMinutes = Math.round((totalWorkTime - 480) % 60);
          logElement.innerHTML += `<li>Horas extras: ${extraHours} horas e ${extraMinutes} minutos</li>`;
        }
        startTime = null;
        lunchStart = null;
        lunchEnd = null;
      }
    });
  
    clearLogBtn.addEventListener('click', function () {
      logElement.innerHTML = '';
    });
  });
  