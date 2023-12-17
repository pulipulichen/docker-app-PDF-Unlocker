const path = require('path')
const fs = require('fs')

function getDDHHmmSS() {
  // Get the current date and time
  const currentDate = new Date();

  // Get the day of the month (DD)
  const day = String(currentDate.getDate()).padStart(2, '0');

  // Get the hours, minutes, and seconds in HHmmSS format
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const seconds = String(currentDate.getSeconds()).padStart(2, '0');

  // Format as DDHHmmSS
  const formattedDateTime = `${day}${hours}${minutes}${seconds}`;

  return formattedDateTime
}

function ShowErrorMessage(file, errorMessage) {
  fs.writeFileSync(`/input/${file}-error-${getDDHHmmSS()}.txt`, errorMessage, 'utf8')
}

module.exports = ShowErrorMessage