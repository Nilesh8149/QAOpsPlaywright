// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';
import { worker, workers } from 'node:cluster';
import { trace } from 'node:console';
import { permission } from 'node:process';



/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  retries:1,
  workers:4,
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  reporter: 'html',

  projects: [
    {
      name: 'chrome',
      use: {

        browserName: 'chromium',
        headless: false,
        screenshot: 'on',
        video:'retain-on-failure',

        trace: 'on',// retain-on-failure,on,off
       //viewport:{width:720,height:720}

      },
    },

    {
      name: 'safari',
      use: {
        browserName: 'webkit',
        headless: false,
        screenshot: 'on',
        igonreHttpsErrors: true,
        permission:['gelocation'],
        trace: 'on',// retain-on-failure,on,off
        ...devices['iPhone 17 Pro Max landscape'],
      }
    }
  ]



});
module.exports = config
