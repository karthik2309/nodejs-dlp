/**
 * Copyright 2018, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const path = require('path');
const assert = require('assert');
const tools = require('@google-cloud/nodejs-repo-tools');

const cmd = 'node metadata.js';
const cwd = path.join(__dirname, '..');

before(tools.checkCredentials);

it('should list info types', async () => {
  const output = await tools.runAsync(`${cmd} infoTypes`, cwd);
  assert.strictEqual(
    new RegExp(/US_DRIVERS_LICENSE_NUMBER/).test(output),
    true
  );
});

it('should filter listed info types', async () => {
  const output = await tools.runAsync(
    `${cmd} infoTypes "supported_by=RISK_ANALYSIS"`,
    cwd
  );
  assert.strictEqual(
    new RegExp(/US_DRIVERS_LICENSE_NUMBER/).test(output),
    false
  );
});
