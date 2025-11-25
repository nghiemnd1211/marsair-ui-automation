const BOOKING_JOURNEY = [
    './tests/ui/searchAndBookingFlow.ts'
];

const BOOKING_DATE_VALIDATION = [
    './tests/ui/bookingDateValidation.ts'
];

const PROMO_CODE_VALIDATION = [
    './tests/ui/promoCodeValidation.ts'
];

const HOME_NAVIGATION = [
    './tests/ui/homeNavigation.ts'
];

export const config = {
    runner: 'local',
    specs: [
        // './src/tests/**/*.ts',
        ...BOOKING_JOURNEY,
        // ...BOOKING_DATE_VALIDATION,
        // ...PROMO_CODE_VALIDATION,
        // ...HOME_NAVIGATION
    ],
    maxInstances: 1,
    capabilities: [{
        maxInstances: 1,
        browserName: 'chrome',
        'goog:chromeOptions': {
        args: [
            // '--headless=new', 
            '--disable-gpu', 
            '--window-size=1920,1080']
    }
    }],
    logLevel: 'error',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    framework: 'mocha',
    reporters: ['spec'],

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },

    // Commenting out devtools service to prevent Chrome opening with DevTools by default
    // services: ['devtools'],
    services: [],

    autoCompileOpts: {
        autoCompile: true,
        tsNodeOpts: {
            transpileOnly: true,
            project: './tsconfig.json'
        }
    }
};

export default config;
