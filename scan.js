const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'core');

const maliciousPatterns = [
  /child_process/, // Check for shell executions
  /eval\(/, // Check for eval statements
  /exec\(/, // Check for exec statements
  /https?:\/\//, // Check for external requests
  /require\(['"]net['"]\)/, // Check for networking modules
];

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  }
  
  files.forEach(file => {
    const filePath = path.join(directoryPath, file);
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return console.log('Unable to read file: ' + err);
      }
      
      maliciousPatterns.forEach(pattern => {
        if (pattern.test(data)) {
          console.log(`Potentially malicious pattern found in ${file}: ${pattern}`);
        }
      });
    });
  });
});
