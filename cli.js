#!/usr/bin/env node

//rucli --mahoa -i ./a.js -o ./a.js
const fs = require('fs');
const path = require('path');

// Kiểm tra xem commander đã được cài đặt chưa
let commander;
try {
    commander = require('commander');
} catch (error) {
    console.log('Commander chưa được cài đặt. Đang cài đặt...');
    const execSync = require('child_process').execSync;
    execSync('npm install commander', { stdio: 'inherit' });
    console.log('Vui lòng chạy lại rucli ...');
    process.exit(1);
}

const program = new commander.Command();;
program.version('1.0.0');
// Định nghĩa lệnh cho rucli với một đối số
/**
 * .command : định nghĩa lệnh
 * .option : định nghĩa đối số
 * Chú ý <argument>, <inputPath>, <outputPath> sẽ được dùng để truyền vào action
 * Và file CLI sẽ được tự tạo trong .bin của node_modules
 * lệnh test : node cli.js rucli enjs -i ./a.js -o ./a.js
 * lệnh cho user nếu không cài global thì phải chạy 
 * npx rucli enjs -i ./a.js -o ./a.js
*/

program
  //.command('rucli') - do đãi khai báo trong package->bin nên bỏ cái này đi chứ ko sẽ phải nhập là npx rucli rucli enjs
  .description('Làm trò mèo cho nó màu mè á mà, chứ thực ra là chạy file nodejs chứ có gì đâu')
  .argument('<argument>', 'Giả dụ chạy mã hóa file Js')
  .option('-i, --input <inputPath>', 'File dữ liệu đầu vào')
  .option('-o, --output <outputPath>', 'File dữ liệu đầu ra')
  .action((argument, options) => {       
    const { input, output } = options;
    if (!input || !output) {
      console.error('[+] Thiếu đối số rồi bạn ơi. \n[+] Ko thêm đối số là tao chạy default là thí mẹ nha con');
      process.exit(1);
    }
    processFunction(argument, input, output);
  });
program.parse(process.argv);  
/**
 * Danh sách hàm thực thi hoặc các hàm thực thi với đối số argument
*/
function processFunction(argument, inputPath, outputPath) {
    switch (argument) {
        case 'enjs':
            enjs(inputPath, outputPath)
            break;    
        default:
            console.error('[+] Chán chẳng buồn làm.');
            break;
    }
}
// Hàm mã hóa file js
function enjs(inputPath, outputPath) {
    console.log(`[-] inputPath là : ${inputPath}`);
    console.log(`[-] outputPath là : ${outputPath}`);
}

