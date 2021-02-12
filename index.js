const fs = require('fs');
const inquirer = require('inquirer');

async function main() {
    let output = '';
    // prompt user for mandatory inputs
    const header = await inquirer.prompt([
        {
            type: 'input',
            message: 'Please enter the name of the repo: ',
            name: 'title'
        },
        {
            type: 'input',
            message: 'Please enter what to include in the \'Description\' Section: ',
            name: 'desc'
        }
    ])
    if (header.title.length < 1 || header.desc.length < 1) {
        console.log('Title and description must not be empty. Exiting');
        return;
    }
    output += `\# ${header.title}\n`;
    output += `\n\#\# Description\n${header.desc}\n`;

    // build table of contents
    const tbContents = await inquirer.prompt([
        {
            type: 'checkbox',
            message: 'What sections should be included?',
            choices: ['Installation', 'Usage', 'License', 'Contributors', 'Tests', 'Questions'],
            name: 'arr'
        }
    ])
    if (tbContents.arr.length > 0) {
        output += '\n\#\# Table of Contents\n';
        for (let i = 0; i < tbContents.arr.length; i++) {
            output += `\* [${tbContents.arr[i]}](\#${tbContents.arr[i].toLowerCase()})\n`;
        }
    }
    // add installation section
    if (tbContents.arr.includes('Installation')) {
        output += '\n\#\# Installation\n';

        let response = await inquirer.prompt([{
            type: 'input',
            message: 'Please enter what to include in the \'Installation\' Section: ',
            name: 'in'
        }]);
        output += `${response.in}\n`;
    }
    // add usage section
    if (tbContents.arr.includes('Usage')) {
        output += '\n\#\# Usage\n';

        let response = await inquirer.prompt([
            {
                type: 'input',
                message: 'Please enter what instructions to include in the \'Usage\' Section \n(Leave blank to skip): ',
                name: 'msg'
            },
            {
                type: 'input',
                message: 'If you would like to include a screenshot, please enter the link \n(Leave blank to skip, or use \',\' to separate multiple files): ',
                name: 'img'
            }
        ]);
        if (response.msg.length > 0) output += `${response.msg}\n`;
        if (response.img.length > 0) {
            let imgArr = response.img.split(',');
            for (let i = 0; i < imgArr.length; i++) {
                imgArr[i] = imgArr[i].trim();
                output += `\n![Screenshot ${i+1}](${imgArr[i]})\n`;
            }
        }
    }
    // add licensing section
    if (tbContents.arr.includes('License')) {
        output += '\n\#\# License\n';

        let response = await inquirer.prompt([{
            type: 'list',
            message: 'Please choose a \'License\': ',
            choices: ['ISC', 'MIT', 'Apache 2.0', 'MPL 2.0', 'GNU GPLv3'],
            name: 'in'
        }]);
        switch (response.in) {
            case 'ISC':
                output = '[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)\n\n' + output;
                output += 'ISC License: Copyright (C) 2021 JingChang Xiao \n\nPermission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies. \n\nTHE SOFTWARE IS PROVIDED \"AS IS\" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.\n';
                break;
            case 'MIT':
                output = '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)\n\n' + output;
                output += 'MIT License: Copyright (C) 2021 JingChang Xiao \n\nPermission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to dealing the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions\: \n\nThe above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. \n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n';
                break;
            case 'Apache 2.0':
                output = '[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)\n\n' + output;
                output += 'Apache 2.0 License: Copyright (C) 2021 JingChang Xiao \n\nLicensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at [http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0) \n\nUnless required by applicable law or agreed to in writing, software distributed under the License is distributed on an \"AS IS\" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.\n';
                break;
            case 'MPL 2.0':
                output = '[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)\n\n' + output;
                output += 'MPL 2.0 License: Copyright (C) 2021 JingChang Xiao \n\nThis Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at [https://mozilla.org/MPL/2.0/](https://mozilla.org/MPL/2.0/).\n';
                break;
            case 'GNU GPLv3':
                output = '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)\n\n' + output;
                output += 'GNU GPLv3 License: Copyright (C) 2021 JingChang Xiao \n\nThis program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. \n\nThis program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the [GNU General Public License](https://www.gnu.org/licenses/) for more details.\n';
        }
    }
    // add contributors section
    if (tbContents.arr.includes('Contributors')) {
        output += '\n\#\# Contributors\n';

        let response = await inquirer.prompt([{
            type: 'input',
            message: 'Please enter contributor names, separated by \',\': ',
            name: 'in'
        }]);
        let names = response.in.split(',');
        names.forEach(name => { name = name.trim(); output += `\* ${name}\n`; });
    }
    // add tests section
    if (tbContents.arr.includes('Tests')) {
        output += '\n\#\# Tests\n';

        let response = await inquirer.prompt([{
            type: 'input',
            message: 'Please enter what message to include in the \'Tests\' Section: ',
            name: 'in'
        }]);
        output += `${response.in}\n`;
    }
    // add questions section
    if (tbContents.arr.includes('Questions')) {
        output += '\n\#\# Questions\nIf you have any questions, you can reach me at the following places: \n';

        let response = await inquirer.prompt([
            {
                type: 'input',
                message: 'Please enter your github username: ',
                name: 'github'
            },
            {
                type: 'input',
                message: 'Please enter your email address: ',
                name: 'email'
            },
            {
                type: 'input',
                message: 'Please any additional instructions regarding contact: ',
                name: 'info'
            }
        ]);
        output += `\* Github: [https://github.com/${response.github}](https://github.com/${response.github})\n\* Email: [${response.email}](${response.email})\n\n${response.info}\n`;
    }

    fs.writeFileSync('./README.md', output);
    console.log('new readme created');
}

main();