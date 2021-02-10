const fs = require('fs');
const inquirer = require('inquirer');
const { mainModule } = require('process');

/* README.md is generated with the title of my project and sections entitled 
Description, Table of Contents, Installation, 
Usage, License, Contributing, Tests, and Questions */

main();

async function main() {

    let output = '';
    let optionalArr = [];
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
    output += `\# ${header.title}\n`;
    output += `\n\#\# Description\n${header.desc}\n`;

    // build table of contents
    const tbContents = await inquirer.prompt([
        {
            type: 'checkbox',
            message: 'What sections should be included?',
            choices: ['Installation', 'Usage', 'License', 'Contributing', 'Tests', 'Questions'],
            name: 'contentArr'
        }
    ])
    optionalArr = tbContents.contentArr;
    if (optionalArr.length > 0) {
        output += '\n\#\# Table of Contents\n';
        for (let i = 0; i < optionalArr.length; i++) {
            output += `\* ${optionalArr[i]}\n`;
        }
    }

    // add installation section
    if (optionalArr.includes('Installation')) {
        output += '\n\# Installation\n';

        let inst = await inquirer.prompt([{
            type: 'input',
            message: 'Please enter what to include in the \'Installation\' Section: ',
            name: 'in'
        }]);
        output += `${inst.in}\n`;
    }

    // add usage section
    if (optionalArr.includes('Usage')) {
        output += '\n\# Usage\n';

        let use = await inquirer.prompt([{
            type: 'input',
            message: 'Please enter what message to include in the \'Usage\' Section: ',
            name: 'in'
        }]);
        output += `${use.in}\n`;
    }

    // add licensing section
    if (optionalArr.includes('License')) {
        output += '\n\# License\n';

        let use = await inquirer.prompt([{
            type: 'list',
            message: 'Please choose a \'License\': ',
            choices: ['ISC', 'MIT', 'Apache 2.0', 'MPL 2.0', 'GNU GPLv3'],
            name: 'in'
        }]);
        switch (use.in) {
            case 'ISC':
                output += 'ISC License: Copyright (C) 2021 JingChang Xiao \n\nPermission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies. \n\nTHE SOFTWARE IS PROVIDED \"AS IS\" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.\n';
                break;
            case 'MIT':
                output += 'MIT License: Copyright (C) 2021 JingChang Xiao \n\nPermission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to dealing the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions\: \n\nThe above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. \n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n';
                break;
            case 'Apache 2.0':
                output += 'Apache 2.0 License: Copyright (C) 2021 JingChang Xiao \n\nLicensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at [http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0) \n\nUnless required by applicable law or agreed to in writing, software distributed under the License is distributed on an \"AS IS\" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.\n';
                break;
            case 'MPL 2.0':
                output += 'MPL 2.0 License: Copyright (C) 2021 JingChang Xiao \n\nThis Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at [https://mozilla.org/MPL/2.0/](https://mozilla.org/MPL/2.0/).\n';
                break;
            case 'GNU GPLv3':
                output += 'GNU GPLv3 License: Copyright (C) 2021 JingChang Xiao \n\nThis program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. \n\nThis program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the [GNU General Public License](https://www.gnu.org/licenses/) for more details.\n';
        }
    }

    /*{
        type: 'input',
        message: 'Please enter what to include in the \'Contributing\' Section: ',
        name: 'contribute'
    },
    /*{
        type: 'input',
        message: 'Please enter what to include in the \'Tests\' Section: ',
        name: 'tests'
    },
    /*{
        type: 'input',
        message: 'Please enter what to include in the \'Questions\' Section: ',
        name: 'questions'
    } */
    fs.writeFileSync('./output.md', output);
    console.log('new readme created');
}
