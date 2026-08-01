// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';
import { workers } from 'node:cluster';
import { trace } from 'node:console';

//Playwright with Moka framework

 

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config=({
  testDir: './tests', 
  retries:1,
  workers:9,
  timeout:30*1000,
  expect : {
    timeout:5000,
  },
  reporter : 'html',
  use: {
    
     browserName : 'chromium',
     headless : true,
     screenshot:'on',
    
     trace:'on',// retain-on-failure,on,off
     
   },

   
});
module.exports=config
